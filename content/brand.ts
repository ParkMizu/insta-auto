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
 * 브랜드 감도는 여성적·자연적·따뜻함·미니멀·정적·동질적 쪽에 있다.
 * 그래서 강조색을 넓게 깔지 않고 선과 짧은 문구에만 쓴다.
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
    hero: 88,
    heroEn: 34,
    title: 62,
    body: 38,
    sub: 29,
    caption: 25,
  },

  padding: 88,
} as const;

export type Brand = typeof BRAND;
