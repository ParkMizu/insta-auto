/**
 * 브랜드 토큰 — 위닛 아이디자인 브랜드 가이드를 따른다.
 *
 * 색과 서체는 원장님이 주신 가이드에서 그대로 가져왔다. 임의로 바꾸지 말 것.
 *
 *   #C9452E  포인트·강조
 *   #C8CAC7  여백 배경
 *   #D6D2C3  포인트·제품
 *   #2D2C2A  텍스트 및 정보
 *   White
 *
 * 서체는 Freesentation (헤드라인 ExtraBold · 바디 Medium · 행간 150%).
 *
 * 브랜드 감도(가이드 6쪽)는 일곱 축으로 정해져 있다.
 *   여성적 · 자연적 · 따뜻함 · 미니멀한 · 정적인 · 동질적 · **일본적**
 *
 * 가이드 원문: "많은 여백 속 아주 작지만 사소한 화려함을 주는 미니멀,
 * 살랑살랑 움직이는 작은 동적인 이미지와 함께 전달하는 정적,
 * 한국적인 느낌이면서도 일본 정서에도 맞는."
 *
 * 그래서 두 가지를 지킨다.
 *  - 여백을 넉넉히 둔다. 글자를 키워 판을 채우지 않는다.
 *  - 강조색은 "아주 작지만 사소한" 정도로만. 선 하나, 번호 하나에 얹는다.
 */

export const BRAND = {
  handle: "@amiju____",
  nameEn: "Eye Designer · Lash Educator · Seoul",
  eyebrow: "LASH EDUCATION",

  colors: {
    /** 텍스트 및 정보 — 짙은 판의 배경으로도 쓴다 */
    deep: "#2D2C2A",
    /** 여백 배경 — 본문 판 */
    nude: "#C8CAC7",
    /** 포인트·제품 — 밝은 표지 판 */
    sand: "#D6D2C3",
    /** 짙은 배경 위 글자 */
    onDeep: "#FFFFFF",
    /** 밝은 배경 위 글자 */
    onNude: "#2D2C2A",
    /** 포인트·강조 — 선과 짧은 문구에만 */
    accent: "#C9452E",
    /** 밝은 배경 위 보조 설명 */
    muted: "#6B6A66",
    /** 짙은 배경 위 보조 설명 */
    mutedOnDeep: "#B4B2AD",
  },

  /** 4:5는 피드에서 세로로 가장 크게 잡히고 글도 많이 들어간다 */
  size: { width: 1080, height: 1350 },

  type: {
    hero: 80,
    heroEn: 34,
    title: 58,
    body: 38,
    sub: 29,
    caption: 25,
  },

  padding: 104,
} as const;

export type Brand = typeof BRAND;
