/**
 * 원장님 이력 — 콘텐츠를 쓸 때 여기서만 사실을 가져온다.
 *
 * 캐러셀 문구를 지어낼 때 이 파일에 없는 경력·수상·직함을 만들어 쓰지 말 것.
 * 인스타는 업계 사람들이 보는 곳이라 한 번 틀리면 신뢰가 통째로 깎인다.
 *
 * 원장님이 정리해 주신 소개글(2026-08-26)을 그대로 옮긴 것이다.
 */

export const PROFILE = {
  nameKo: "박미주",
  nameEn: "MIJU PARK",
  /** 직함 세 개. 순서에 의미가 있다 — 디자이너가 먼저다 */
  roles: ["Eye Designer", "Lash Educator", "Technique Developer"],
  /** 총 경력 17년 (아미주 샵 13년 포함) */
  yearsInIndustry: 17,
  shopYears: 13,
  currentBase: "청담 WE NEED EYE DESIGN",
  crew: "WENEED CREW",
} as const;

/**
 * 네 개의 전문 영역. 콘텐츠 시리즈도 이 넷으로 나눈다.
 * 하나에 몰리지 않게 큐를 짤 때 참고할 것.
 */
export const PILLARS = {
  led: {
    key: "led",
    ko: "LED 속눈썹 연장",
    en: "LED Lash Extension",
    /** 가장 강한 한 줄 */
    claim: "국내 LED 속눈썹 연장 1세대 교육자",
    claimEn: "First-generation LED lash educator in Korea",
    /** 교육에서 실제로 다루는 것들 — 캐러셀 소재가 여기서 나온다 */
    topics: [
      "LED 전용 글루의 특성",
      "광경화 원리",
      "조사 거리와 조사 시간",
      "글루량 조절",
      "부착 위치",
      "뿌리 컨트롤",
      "모질과 시술 환경에 따른 접착 조건",
      "유지력",
      "자모 손상 관리",
    ],
    /** 직접 개발해 출시한 것 */
    built: ["LED 전용 글루", "LED 램프"],
  },
  hybrid: {
    key: "hybrid",
    ko: "하이브리드 래쉬 디자인",
    en: "Hybrid Lash Design",
    claim: "한국에서 연장 후 펌 복합 시술을 최초로 개발하고 교육",
    claimEn: "Created the extension-then-lift hybrid method in Korea",
    topics: [
      "연장 → 펌, 펌 → 연장 순서 선택 기준",
      "자모의 컬과 방향 조절",
      "길이·밀도·디자인 완성",
      "LED와 결합한 LED Hybrid Lash Design",
      "접착 안정성과 컬의 방향성",
    ],
    /** 여기서 말하는 Hybrid는 Classic+Volume이 아니라 Lift+Extension이다 */
    note: "일반적인 Classic + Volume 조합이 아니라 Lash Lift + Lash Extension 결합",
  },
  reframe: {
    key: "reframe",
    ko: "리프레임 아이디자인",
    en: "REFRAME Eye Design",
    claim: "골격진단을 한국식 아이디자인에 도입한 자체 메뉴 시스템",
    claimEn: "An eye design system built on facial structure diagnosis",
    /** 진단이 보는 여섯 가지 */
    axes: [
      "얼굴 골격과 비율",
      "눈의 위치와 형태",
      "눈썹과 눈의 관계",
      "자모의 방향·길이·밀도",
      "고객이 현재 가지고 있는 이미지",
      "고객이 원하는 인상",
    ],
    /** 상담부터 시술까지의 순서 */
    system: [
      "Facial Structure Analysis",
      "Eye & Facial Balance Diagnosis",
      "Image Counseling",
      "Design Planning",
      "Technique Selection",
      "Personalized Eye Design",
    ],
    oneLine:
      "속눈썹을 디자인하는 것을 넘어, 눈을 중심으로 고객의 인상을 다시 설계한다",
  },
  lift: {
    key: "lift",
    ko: "한국식 노글루 래쉬리프트",
    en: "Korean No-Glue Lash Lift",
    claim: "2018년부터 전국 투어로 한국식 노글루 래쉬리프트를 교육",
    claimEn: "Teaching the Korean no-glue lift method since 2018",
    topics: [
      "컬 형성",
      "속눈썹 방향 컨트롤",
      "모질별 시술 방법",
      "손상 관리",
      "디자인 완성도",
    ],
    built: ["한국인 모질에 맞춘 속눈썹 펌제 공동 개발"],
  },
} as const;

/**
 * 권위의 근거. 자랑이 아니라 "왜 이 사람에게 배우는가"의 답이다.
 * 교육 콘텐츠 사이에 이걸 섞어야 수강으로 이어진다.
 */
export const CREDENTIALS = {
  judging: [
    { ko: "싱가포르 국제 속눈썹 대회 심사위원", en: "Judge, Singapore International Lash Competition" },
    { ko: "일본 NEEC 심사위원", en: "Judge, NEEC Japan" },
    { ko: "한국 월드래쉬컵 LED 속눈썹 연장 분과장", en: "LED Division Head, Korea World Lash Cup" },
    { ko: "부산 월드뷰티페스티벌 WLC LED 수석분과장", en: "Chief LED Division Head, Busan World Beauty Festival" },
  ],
  firsts: [
    { ko: "국내 최초 Lash Lift × Lash Extension 하이브리드 부문 개설", en: "Opened Korea's first Hybrid Lash competition division" },
    { ko: "국내 LED 속눈썹 연장 1세대 교육자", en: "First-generation LED lash educator in Korea" },
    { ko: "국내 연장 후 펌 기술 최초 개발", en: "Created the extension-then-lift method in Korea" },
  ],
  training: [
    { ko: "대회 출전 선수 전문 트레이닝", en: "Competition artist training" },
    { ko: "지도 선수 다수 1위 수상", en: "Multiple first-place wins by trained artists" },
  ],
  global: [
    { ko: "USA 오렌지카운티 LED·하이브리드 교육", en: "LED & Hybrid training, Orange County USA" },
    { ko: "일본 래쉬 아티스트와 기술 교류", en: "Technique exchange with Japanese lash artists" },
    { ko: "2026년 연세대학교 강사 과정 LED 파트 강의 예정", en: "Yonsei University instructor course, LED module (2026)" },
  ],
  products: [
    { ko: "LED 전용 글루 개발·출시", en: "Developed and released LED-specific adhesive" },
    { ko: "LED 램프 개발·출시", en: "Developed and released LED lamp" },
    { ko: "속눈썹 펌제 공동 개발", en: "Co-developed lash lift solution" },
  ],
} as const;

/**
 * 기술 하나를 어디까지 끌고 가는지. 원장님 활동의 뼈대다.
 * "왜 이 사람이 업계 기준을 만드는 사람인가"를 설명할 때 쓴다.
 */
export const EXPANSION_CHAIN = [
  "Technique",
  "Education",
  "Product",
  "Competition",
  "Contents",
  "Branding",
] as const;
