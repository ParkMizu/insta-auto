/**
 * 원장님이 주신 사진 20장 — 무엇이 찍혔고 어디에 쓸지.
 *
 * 슬라이드에서 사진을 고를 때 이 파일만 보면 되게 정리했다.
 * 실제 파일은 public/photos/NN.jpg 이고, 캐러셀 판(4:5)에 맞춰 잘린다.
 *
 * `use`는 이 사진이 어떤 이야기에 어울리는지다. 억지로 붙이지 말 것 —
 * 사진과 글이 안 맞으면 안 넣느니만 못하다.
 */

export type PhotoUse =
  /** 교육하는 사람이라는 증거 */
  | "teaching"
  /** 손끝의 기술 */
  | "craft"
  /** 결과물 */
  | "result"
  /** 공간과 브랜드 */
  | "space"
  /** 크루와 사람들 */
  | "crew"
  /** 외부가 인정한 것 */
  | "press"
  /** 사람 냄새 */
  | "life";

export interface Photo {
  /** public/photos/NN.jpg */
  id: string;
  what: string;
  use: PhotoUse;
  /**
   * 실제 픽셀이 가로로 긴 사진인지.
   *
   * 4:5 세로 판에 가로 사진을 꽉 채우면 양옆이 크게 잘린다. 눈이나 시술 클로즈업은
   * 잘려도 되지만 단체 사진이나 공간 사진은 사람과 맥락이 함께 잘려나간다.
   * 그래서 이 값이 true이고 클로즈업이 아니면 사진을 위쪽에 통째로 앉히고
   * 아래를 글자 자리로 쓴다.
   */
  landscape?: boolean;
}

export const PHOTOS: Photo[] = [
  { id: "01", what: "세미나 강의 중 — 스크린에 Shrink Wrap, 수강생들이 앉아 보고 있다", use: "teaching"  },
  { id: "02", what: "시술 중 옆모습 — 램프 아래에서 집중하는 손과 표정", use: "craft"  },
  { id: "03", what: "시술 끝난 눈 정면 클로즈업 — 마스크 쓴 고객", use: "result"  },
  { id: "04", what: "노트북과 손글씨 노트 — 강의 준비하는 책상", use: "teaching"  },
  { id: "05", what: "세미나실 전경 — 베드가 늘어선 빈 강의실, 스크린에 Shrink Wrap", use: "space"  },
  { id: "06", what: "시술 중 눈 클로즈업 — 아이패치와 테이프", use: "craft"  },
  { id: "07", what: "핀셋으로 가모를 붙이는 손 클로즈업", use: "craft"  },
  { id: "08", what: "받은 사인 — DEAR 미주님", use: "life"  },
  { id: "09", what: "인물 둘이 함께 찍은 사진", use: "life" },
  { id: "10", what: "강의실을 가득 채운 수강생 단체 사진 — 손을 흔들고 있다", use: "teaching"  , landscape: true },
  { id: "11", what: "강의실 단체 사진 — 박수 치는 수강생들", use: "teaching"  , landscape: true },
  { id: "12", what: "언론 기사 — 'K뷰티 사업 확장' 헤드라인과 프로필 사진", use: "press" },
  { id: "13", what: "기사 본문 — LED 경화 원리 이해를 바탕으로 전문가를 교육한다는 내용", use: "press" },
  { id: "14", what: "기사 본문 — 일본과 상하이를 시작으로 동남아까지 K뷰티 모델 확대 계획", use: "press" },
  { id: "15", what: "살롱 내부 — WENEED BLACK 사인, 소파와 제품 진열", use: "space"  },
  { id: "16", what: "살롱 복도 — 포스터와 식물이 있는 입구", use: "space"  },
  { id: "17", what: "시술 결과 눈매 클로즈업 — 결이 살아있는 자연스러운 컬", use: "result"  , landscape: true },
  { id: "18", what: "LED 램프를 눈 위에 대고 있는 시술 장면", use: "craft"  },
  { id: "19", what: "사람들과 둘러앉은 식사 자리", use: "life"  , landscape: true },
  { id: "20", what: "크루 단체 사진 — 검은 옷을 맞춰 입은 다섯 명", use: "crew" },
];

export function photo(id: string): Photo {
  const found = PHOTOS.find((p) => p.id === id);
  if (!found) throw new Error(`없는 사진입니다: ${id}`);
  return found;
}
