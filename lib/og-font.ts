/**
 * 브랜드 폰트 로더 — Freesentation.
 *
 * 위닛 아이디자인 브랜드 가이드가 지정한 서체다. Noto Sans(한글)와 Heebo(영문)를
 * 다시 다듬어 만든 것이라 한글이 안정적이고, SIL OFL이라 상업 사용에 문제가 없다.
 *
 * 예전에는 Google Fonts에서 필요한 글자만 서브셋으로 받아 썼다. Freesentation은
 * 거기 없어서 파일을 저장소에 넣고 직접 읽는다. 한 벌이 2.5MB쯤이라 매번 내려받으면
 * 슬라이드를 그릴 때마다 느려진다. 그래서 한 번 읽어 메모리에 들고 있는다.
 *
 * 브랜드 가이드의 국문 사용 규칙:
 *   헤드라인 ExtraBold · 서브타이틀 SemiBold · 바디 Medium · 캡션 Light (행간 150%)
 * 여기서는 굵기 두 벌만 쓴다. 슬라이드가 제목과 본문으로만 나뉘기 때문이다.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
}

const FILES: { file: string; weight: 400 | 700 }[] = [
  { file: "Freesentation-5Medium.ttf", weight: 400 },
  { file: "Freesentation-8ExtraBold.ttf", weight: 700 },
];

let cached: OgFont[] | null = null;

/**
 * 브랜드 폰트를 돌려준다.
 *
 * 인자를 받지 않는다. 예전 서브셋 방식은 그릴 글자를 알아야 했지만
 * 이제는 한 벌을 통째로 쓰므로 필요 없다. 호출부 호환을 위해 인자는 무시한다.
 */
export async function loadKoreanFonts(_texts?: string[]): Promise<OgFont[]> {
  if (cached) return cached;
  try {
    const dir = path.join(process.cwd(), "assets", "fonts");
    const fonts = await Promise.all(
      FILES.map(async ({ file, weight }): Promise<OgFont> => {
        const buf = await readFile(path.join(dir, file));
        return {
          name: "Freesentation",
          // Buffer의 일부일 수 있어 실제 구간만 잘라 넘긴다
          data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer,
          weight,
          style: "normal",
        };
      }),
    );
    cached = fonts;
    return fonts;
  } catch {
    // 폰트를 못 읽어도 슬라이드는 그려야 한다. 라틴 기본 글꼴로 떨어진다.
    return [];
  }
}
