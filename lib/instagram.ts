/**
 * 인스타그램 게시 — Meta Graph API.
 *
 * 캐러셀은 한 번에 못 올린다. 세 단계다.
 *   1) 슬라이드마다 "컨테이너"를 만든다 (is_carousel_item=true)
 *   2) 그 컨테이너들을 묶어 캐러셀 부모 컨테이너를 만든다
 *   3) 부모를 게시한다
 *
 * 중요한 제약:
 *  - 이미지는 우리가 올리는 게 아니라 인스타가 "가지러 온다". 그래서 반드시
 *    로그인 없이 열리는 https 주소여야 한다. localhost로는 절대 안 된다.
 *  - 슬라이드는 최대 10장.
 *  - 컨테이너는 만들자마자 준비되는 게 아니라서 상태가 FINISHED가 될 때까지 기다려야 한다.
 */

const GRAPH = "https://graph.facebook.com/v21.0";

export interface IgConfig {
  /** 인스타 프로페셔널 계정의 숫자 ID (페이스북 페이지에 연결된 것) */
  userId: string;
  /** 장기 액세스 토큰 */
  accessToken: string;
}

/** 설정이 없으면 null — 토큰을 넣기 전에도 앱이 죽지 않게 한다 */
export function readIgConfig(): IgConfig | null {
  const userId = process.env.IG_USER_ID;
  const accessToken = process.env.IG_ACCESS_TOKEN;
  if (!userId || !accessToken) return null;
  return { userId, accessToken };
}

async function graph(
  path: string,
  config: IgConfig,
  body: Record<string, string>,
): Promise<Record<string, unknown>> {
  const res = await fetch(`${GRAPH}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ ...body, access_token: config.accessToken }),
  });
  const payload = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    // Meta 오류는 error.message에 사람이 읽을 이유가 들어있다
    const err = payload.error as { message?: string } | undefined;
    throw new Error(err?.message ?? `Graph API ${res.status}`);
  }
  return payload;
}

/** 슬라이드 한 장을 담을 컨테이너 */
async function createItem(config: IgConfig, imageUrl: string): Promise<string> {
  const out = await graph(`${config.userId}/media`, config, {
    image_url: imageUrl,
    is_carousel_item: "true",
  });
  return String(out.id);
}

/** 컨테이너가 준비될 때까지 기다린다. 이미지가 크면 몇 초 걸린다 */
async function waitReady(config: IgConfig, containerId: string): Promise<void> {
  for (let attempt = 0; attempt < 20; attempt++) {
    const res = await fetch(
      `${GRAPH}/${containerId}?fields=status_code&access_token=${config.accessToken}`,
    );
    const payload = (await res.json()) as { status_code?: string };
    if (payload.status_code === "FINISHED") return;
    if (payload.status_code === "ERROR") {
      throw new Error(`컨테이너 처리 실패: ${containerId}`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`컨테이너가 60초 안에 준비되지 않았습니다: ${containerId}`);
}

export interface PublishResult {
  mediaId: string;
  slideCount: number;
}

/**
 * 캐러셀을 게시한다.
 * imageUrls는 슬라이드 순서 그대로, 전부 공개된 https 주소여야 한다.
 */
export async function publishCarousel(
  config: IgConfig,
  imageUrls: string[],
  caption: string,
  /**
   * 공동 작업자로 초대할 계정. 초대를 수락하면 **그 계정 피드에도 같은 글이
   * 뜬다.** 좋아요와 댓글도 함께 쌓인다.
   *
   * 캐러셀은 **부모에만** 넣는다. 슬라이드마다 넣으면 거절당한다.
   * 초대일 뿐이라 상대가 수락해야 뜨고, 수락 전에는 원장님 계정에만 보인다.
   */
  collaborators: string[] = [],
): Promise<PublishResult> {
  if (imageUrls.length < 2) {
    throw new Error("캐러셀은 2장 이상이어야 합니다");
  }
  if (imageUrls.length > 10) {
    throw new Error("캐러셀은 10장을 넘을 수 없습니다");
  }

  // 1) 슬라이드별 컨테이너 — 순서가 곧 넘기는 순서라 병렬로 만들지 않는다
  const childIds: string[] = [];
  for (const url of imageUrls) {
    const id = await createItem(config, url);
    await waitReady(config, id);
    childIds.push(id);
  }

  // 2) 캐러셀 부모
  const parent = await graph(`${config.userId}/media`, config, {
    media_type: "CAROUSEL",
    children: childIds.join(","),
    caption,
    ...(collaborators.length ? { collaborators: JSON.stringify(collaborators) } : {}),
  });
  const parentId = String(parent.id);
  await waitReady(config, parentId);

  // 3) 게시
  const published = await graph(`${config.userId}/media_publish`, config, {
    creation_id: parentId,
  });

  return { mediaId: String(published.id), slideCount: imageUrls.length };
}
