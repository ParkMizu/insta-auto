/**
 * OG 이미지에 한글을 그리기 위한 폰트 로더.
 *
 * next/og(satori)는 woff2를 못 읽고, Noto Sans KR 전체 TTF는 웨이트당 5MB가 넘는다.
 * 그래서 Google Fonts에 "이 글자들만" 요청해서 몇 KB짜리 서브셋 TTF를 받는다.
 * 서브셋을 그릴 문자로 만들기 때문에, 나중에 타입 이름을 바꿔도 두부(□)가 뜨지 않는다.
 *
 * 브라우저 UA로 요청하면 woff/woff2가 오므로, 일부러 브라우저가 아닌 UA를 보낸다.
 */

const CSS_ENDPOINT = "https://fonts.googleapis.com/css2";
/** 브라우저가 아닌 UA여야 Google이 TTF를 준다 */
const NON_BROWSER_UA = "insta-auto-og/1.0";

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
}

/** 같은 문자 조합은 다시 받지 않는다. 서버 인스턴스가 살아있는 동안만 유지된다. */
const cache = new Map<string, OgFont[]>();

/** css2 응답에서 @font-face 블록별 (weight, url)을 뽑는다 */
function parseFaces(css: string): { weight: number; url: string }[] {
  return css
    .split("@font-face")
    .slice(1)
    .flatMap((block) => {
      const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
      const url = block.match(/src:\s*url\(([^)]+)\)/)?.[1];
      return weight && url ? [{ weight: Number(weight), url }] : [];
    });
}

/**
 * 주어진 문자열들에 나오는 글자만 담은 400/700 서브셋을 받는다.
 * 네트워크가 막히면 빈 배열 — 호출하는 쪽에서 라틴 폴백으로 그린다.
 */
export async function loadKoreanFonts(texts: string[]): Promise<OgFont[]> {
  // 중복 글자를 지워야 요청 URL이 짧아지고 캐시 적중률이 올라간다
  const chars = [...new Set(texts.join(""))].sort().join("");
  if (!chars) return [];

  const cached = cache.get(chars);
  if (cached) return cached;

  try {
    const cssUrl = `${CSS_ENDPOINT}?family=Noto+Sans+KR:wght@400;700&text=${encodeURIComponent(chars)}`;
    const cssRes = await fetch(cssUrl, {
      headers: { "User-Agent": NON_BROWSER_UA },
    });
    if (!cssRes.ok) return [];

    const faces = parseFaces(await cssRes.text());
    const fonts = await Promise.all(
      faces
        .filter((f) => f.weight === 400 || f.weight === 700)
        .map(async (face): Promise<OgFont> => {
          const res = await fetch(face.url);
          if (!res.ok) throw new Error(`폰트 내려받기 실패: ${res.status}`);
          return {
            name: "Noto Sans KR",
            data: await res.arrayBuffer(),
            weight: face.weight as 400 | 700,
            style: "normal",
          };
        }),
    );

    cache.set(chars, fonts);
    return fonts;
  } catch {
    // OG 이미지 때문에 페이지가 죽으면 안 된다. 폰트 없이 그리게 둔다.
    return [];
  }
}
