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
  { id: "01", what: "세미나 강의 — 스크린 앞에서 설명, 수강생들이 앉아 있다", use: "teaching" },
  { id: "02", what: "시술 중 옆모습 — 램프 아래에서 집중하는 손과 표정", use: "craft" },
  { id: "03", what: "시술 끝난 눈 — 아이패치를 붙인 채 위에서 본 정면", use: "result" },
  { id: "04", what: "노트북과 손글씨 노트 — 강의를 준비하는 책상", use: "teaching" },
  { id: "05", what: "세미나실 전경 — 베드가 늘어선 빈 강의실", use: "space" },
  { id: "06", what: "시술 중인 눈 — 아이패치와 고정 테이프", use: "craft" },
  { id: "07", what: "핀셋으로 가모를 붙이는 손 클로즈업", use: "craft" },
  { id: "08", what: "받은 사인 — DEAR 미주님", use: "life" },
  { id: "09", what: "둘이 함께 찍은 사진", use: "life" },
  { id: "10", what: "강의실을 가득 채운 수강생 단체 사진", use: "teaching", landscape: true },
  { id: "11", what: "강의실 단체 사진 — 박수 치는 수강생들", use: "teaching", landscape: true },
  { id: "12", what: "매일경제 기사 — 'K뷰티 사업 확장' 헤드라인과 프로필", use: "press" },
  { id: "13", what: "기사 본문 — LED 경화 원리를 바탕으로 전문가를 교육한다는 내용", use: "press" },
  { id: "14", what: "기사 본문 — 일본과 상하이를 시작으로 동남아까지 넓힌다는 계획", use: "press" },
  { id: "15", what: "살롱 내부 — WENEED BLACK 사인, 소파와 제품", use: "space" },
  { id: "16", what: "살롱 복도 — 포스터와 식물이 있는 입구", use: "space" },
  { id: "17", what: "시술 결과 — 결이 살아있는 눈매", use: "result", landscape: true },
  { id: "18", what: "헤드스파 — 샴푸볼에 누워 눈가리개를 한 고객", use: "craft" },
  { id: "19", what: "둘러앉은 식사 자리", use: "life", landscape: true },
  { id: "20", what: "크루 단체 사진 — 검은 옷을 맞춰 입은 다섯 명", use: "crew" },
  { id: "29", what: "종이컵에 그린 속눈썹 도해 — 손글씨 설명", use: "teaching" },
  { id: "31", what: "본인 셀카 — 속눈썹 견본을 눈 옆에 대고", use: "life" },
  { id: "32", what: "본인 셀카 — 견본을 든 다른 각도", use: "life" },
  { id: "33", what: "속눈썹을 그린 액자 — 살롱에 걸린 그림", use: "space" },
  { id: "34", what: "화이트보드에 그린 눈 도해 여러 개 — 손글씨 메모", use: "teaching" },
  { id: "38", what: "강의 중 — 프로젝터 자료를 보는 수강생들", use: "teaching" },
  { id: "39", what: "강의 중 — 스크린 앞에서 짚어가며 설명", use: "teaching" },
  { id: "40", what: "수료 단체 사진 — 수료증을 들고 나란히 선 모습", use: "crew" },
  { id: "41", what: "강의와 실습이 함께 도는 교육장", use: "teaching" },
  { id: "43", what: "실습 지도 — 옆에서 손을 봐주는 장면", use: "teaching" },
  { id: "44", what: "시술실 — 링라이트와 베드", use: "space" },
  { id: "46", what: "LED 램프를 들고 시술하는 장면", use: "craft" },
  { id: "47", what: "수료증을 든 단체 사진", use: "crew", landscape: true },
  { id: "48", what: "시술실 — 창밖이 초록인 밝은 방", use: "space" },
  { id: "49", what: "시술실 — 베드와 창, 정돈된 공간", use: "space" },
  { id: "57", what: "엘리베이터 거울 셀카 — 전신", use: "life" },
  { id: "70", what: "시술 결과 — 옆에서 본 눈매", use: "result" },
  { id: "71", what: "시술 결과 — 얼굴과 함께 본 눈매", use: "result" },
  { id: "72", what: "시술 결과 — 결이 고른 자모", use: "result" },
  { id: "73", what: "시술 결과 — 컬이 살아있는 눈매", use: "result" },
  { id: "74", what: "시술 결과 — 뿌리와 간격이 보이는 클로즈업", use: "result" },
  { id: "75", what: "아이패드에 띄운 강의 자료와 인쇄물", use: "teaching" },
  { id: "76", what: "실습 중 서로 봐주는 장면", use: "teaching" },
  { id: "77", what: "실습 지도 — 여럿이 둘러서서 보는 장면", use: "teaching" },
  { id: "80", what: "시술 결과 — 뿌리까지 선명한 클로즈업", use: "result" },
  { id: "82", what: "17번에서 한쪽 눈만 잘라낸 것 — 컬이 보이는 눈매", use: "result" },
  { id: "81", what: "80번에서 속눈썹만 잘라낸 것 — 결과 클로즈업 (scripts-crop.mjs로 만듦)", use: "result" },
];

export function photo(id: string): Photo {
  const found = PHOTOS.find((p) => p.id === id);
  if (!found) throw new Error(`없는 사진입니다: ${id}`);
  return found;
}
