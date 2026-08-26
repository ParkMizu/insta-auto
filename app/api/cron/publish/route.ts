/**
 * 매일 한 번 깨어나 오늘 나갈 캐러셀을 인스타그램에 올린다.
 *
 * Vercel Cron이 이 주소를 호출한다. 아무나 부르면 안 되므로 헤더를 확인한다.
 * (Vercel은 자기 cron 요청에 CRON_SECRET을 Authorization 헤더로 붙여 보낸다.)
 */
import { NextResponse } from "next/server";
import { publishCarousel, readIgConfig } from "@/lib/instagram";
import { postForDate, remaining } from "@/lib/queue";

/** 슬라이드가 많으면 컨테이너 대기가 길어진다 */
export const maxDuration = 300;

function siteOrigin(): string {
  // 배포되면 Vercel이 도메인을 넣어준다. 직접 지정하고 싶으면 SITE_URL을 쓴다.
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  // 시크릿을 안 걸어두면 검사하지 않는다 (로컬에서 눌러볼 수 있게)
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "권한 없음" }, { status: 401 });
  }

  const now = new Date();
  const scheduled = postForDate(now);
  if (!scheduled) {
    // 시작 전이거나 큐가 비었다. 오류가 아니라 정상 상태다.
    return NextResponse.json({ published: false, reason: "오늘 나갈 글이 없습니다" });
  }

  const config = readIgConfig();
  if (!config) {
    return NextResponse.json(
      {
        published: false,
        reason: "인스타 연결 전입니다 (IG_USER_ID / IG_ACCESS_TOKEN 미설정)",
        wouldPublish: scheduled.post.id,
      },
      { status: 200 },
    );
  }

  const origin = siteOrigin();
  const { post } = scheduled;
  const imageUrls = post.slides.map(
    (_, i) => `${origin}/api/slide/${post.id}/${i}`,
  );
  const caption = `${post.caption}\n\n${post.hashtags.join(" ")}`;

  try {
    const result = await publishCarousel(config, imageUrls, caption);
    return NextResponse.json({
      published: true,
      postId: post.id,
      date: scheduled.date,
      mediaId: result.mediaId,
      slides: result.slideCount,
      remaining: remaining(now) - 1,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[cron] 게시 실패:", post.id, message);
    return NextResponse.json(
      { published: false, postId: post.id, error: message },
      { status: 500 },
    );
  }
}
