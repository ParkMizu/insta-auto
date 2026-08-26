/**
 * 하이라이트 커버 — 프로필 첫 화면의 인상을 만드는 아홉 칸.
 *
 * 인스타는 이 이미지를 원형으로 잘라 쓴다. 그래서 글자를 가운데 좁은 영역에만 둔다.
 * 스토리로 올린 뒤 하이라이트 커버로 지정하는 흐름이라 1080×1920으로 뽑는다.
 *
 * 순서가 곧 프로필에 보이는 순서다. 앞의 넷이 "무엇을 가르치는가",
 * 다음 둘이 "어디까지 갔는가", 마지막 셋이 "지금 무엇을 하는가"로 읽히게 짰다.
 */

export interface Highlight {
  /** 주소에 쓰는 값 */
  key: string;
  /** 커버에 크게 들어갈 글자. 짧을수록 원 안에서 산다 */
  label: string;
  /** 그 아래 작게. 없으면 생략 */
  sub?: string;
  /** 하이라이트 제목으로 쓸 이름 (인스타에 직접 입력하는 값) */
  title: string;
}

export const HIGHLIGHTS: Highlight[] = [
  { key: "led", label: "LED", sub: "EXTENSION", title: "LED · Education" },
  { key: "hybrid", label: "HYBRID", sub: "LIFT × EXTENSION", title: "Hybrid Lash" },
  { key: "reframe", label: "REFRAME", sub: "EYE DESIGN", title: "REFRAME" },
  { key: "lift", label: "LIFT", sub: "NO-GLUE", title: "No-Glue Lift" },
  { key: "judge", label: "JUDGE", sub: "SG · JP", title: "🇸🇬🇯🇵 Judge" },
  { key: "product", label: "GLUE", sub: "& LAMP", title: "Glue & Lamp" },
  { key: "crew", label: "CREW", sub: "WE NEED", title: "WENEED CREW" },
  { key: "class", label: "CLASS", sub: "OPEN", title: "Class" },
  { key: "review", label: "REVIEW", title: "Review" },
];
