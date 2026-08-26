/**
 * 캐러셀 콘텐츠 큐 — 매일 오전 8시에 위에서부터 하나씩 나간다.
 *
 * 원장님이 직접 고치는 파일이다. 코드는 볼 필요 없고 따옴표 안의 글만 바꾸면 된다.
 *
 * 규칙 세 가지:
 *  1. 슬라이드는 최대 10장 (인스타 제한). 표지 1 + 본문 5~7 + 마무리 1이 읽기 좋다.
 *  2. `en`은 영문 병기다. 해외 계정이 봤을 때 무슨 내용인지 알아야 팔로우가 붙는다.
 *     비워두면 한글만 나온다.
 *  3. 순서를 바꾸면 나가는 날짜가 바뀐다. 이미 나간 글은 건드리지 말 것.
 */

/** 표지 — 스크롤을 멈추게 하는 한 문장 */
export interface CoverSlide {
  kind: "cover";
  /** 큰 제목. 12자 안쪽이 가장 강하다 */
  title: string;
  /** 제목 아래 한 줄 */
  subtitle?: string;
  en?: string;
}

/** 본문 — 번호가 붙는 핵심 하나 */
export interface PointSlide {
  kind: "point";
  title: string;
  body: string;
  en?: string;
}

/** 마무리 — 다음 행동을 만든다 */
export interface CloseSlide {
  kind: "close";
  title: string;
  body: string;
  en?: string;
}

export type Slide = CoverSlide | PointSlide | CloseSlide;

export interface Post {
  /** 파일 이름처럼 쓰는 고유값. 한 번 정하면 바꾸지 않는다 */
  id: string;
  /** 인스타 본문에 들어갈 글 */
  caption: string;
  /** 해시태그. 한국어와 영어를 섞어야 해외에도 걸린다 */
  hashtags: string[];
  slides: Slide[];
}

export const POSTS: Post[] = [
  {
    id: "retention-3weeks",
    caption: `속눈썹이 3주 만에 빠진다면, 글루가 아니라 순서를 의심하세요.

리터치 주기가 짧아지는 원장님들께 가장 먼저 보여드리는 내용입니다.
저장해두고 다음 시술 때 하나씩 확인해보세요.

If your extensions drop in three weeks, it is rarely the glue.
Save this and check your sequence on the next set.`,
    hashtags: [
      "#속눈썹연장", "#속눈썹교육", "#래쉬아티스트", "#뷰티창업", "#원장님공부",
      "#lashartist", "#lashtraining", "#koreanlash", "#eyelashextensions", "#lashtech",
    ],
    slides: [
      {
        kind: "cover",
        title: "3주 만에\n빠지는 이유",
        subtitle: "글루를 바꾸기 전에 확인할 것",
        en: "Why lashes fall in 3 weeks",
      },
      {
        kind: "point",
        title: "전처리가 반이다",
        body: "유분이 남은 자리에 붙인 가모는 아무리 좋은 글루를 써도 3주를 못 갑니다. 시술 전 세정과 완전 건조까지가 접착의 시작입니다.",
        en: "Cleansing and full drying is where adhesion begins.",
      },
      {
        kind: "point",
        title: "습도를 읽으세요",
        body: "같은 글루도 습도 40%와 70%에서 굳는 속도가 다릅니다. 계절이 바뀌면 글루가 아니라 환경이 바뀐 것입니다.",
        en: "The same glue cures differently at 40% and 70% humidity.",
      },
      {
        kind: "point",
        title: "접착면 1.5mm",
        body: "가모가 자모를 감싸는 길이가 1.5mm 아래로 떨어지면 버티지 못합니다. 뿌리에서 0.5mm 띄우고, 닿는 면을 충분히 확보하세요.",
        en: "Keep at least 1.5mm of contact along the natural lash.",
      },
      {
        kind: "point",
        title: "무게를 계산하세요",
        body: "자모 굵기에 비해 가모가 무거우면 붙어 있어도 자모가 먼저 빠집니다. 고객의 자모 상태가 곧 디자인의 상한선입니다.",
        en: "The client's natural lash sets the ceiling for your design.",
      },
      {
        kind: "point",
        title: "홈케어까지가 시술",
        body: "가장 많이 빠지는 구간은 시술 후 24시간입니다. 무엇을 하지 말아야 하는지 말로만 하지 말고 카드로 쥐여 보내세요.",
        en: "The first 24 hours decide retention. Send them home with a card.",
      },
      {
        kind: "close",
        title: "리텐션은 재능이 아닙니다",
        body: "순서와 기준을 잡으면 누구나 4주를 만듭니다. 더 깊은 내용은 프로필 링크의 수업에서 다룹니다.",
        en: "Retention is a system, not a talent.",
      },
    ],
  },
  {
    id: "consult-3min",
    caption: `시술보다 상담이 먼저 끝나야 합니다.

재방문율이 높은 원장님들은 앉히자마자 3분을 씁니다.
그 3분에 무엇을 묻는지 정리했습니다.

The best lash artists spend three minutes before they touch a single lash.`,
    hashtags: [
      "#속눈썹연장", "#속눈썹교육", "#뷰티창업", "#고객관리", "#래쉬아티스트",
      "#lashartist", "#lashconsultation", "#koreanlash", "#beautybusiness", "#lashtraining",
    ],
    slides: [
      {
        kind: "cover",
        title: "상담 3분이\n재방문을 만든다",
        subtitle: "앉히자마자 물어야 할 것",
        en: "Three minutes that bring them back",
      },
      {
        kind: "point",
        title: "직업을 묻습니다",
        body: "매일 마스카라를 지워야 하는 사람과 아닌 사람은 같은 디자인을 쓸 수 없습니다. 생활을 알아야 유지 기간이 예측됩니다.",
        en: "Their daily routine decides what design will survive.",
      },
      {
        kind: "point",
        title: "불편했던 기억을 묻습니다",
        body: "'예쁘게 해주세요'는 정보가 아닙니다. 지난번에 무엇이 불편했는지 물으면 이 사람이 진짜 원하는 기준이 나옵니다.",
        en: "Ask what bothered them last time, not what they want.",
      },
      {
        kind: "point",
        title: "안 되는 것을 먼저 말합니다",
        body: "자모가 얇으면 원하는 볼륨이 안 나온다고 시술 전에 말해야 합니다. 끝나고 말하면 변명이 되고, 먼저 말하면 전문성이 됩니다.",
        en: "Say what is impossible before you start, not after.",
      },
      {
        kind: "point",
        title: "다음 날짜를 잡습니다",
        body: "리터치 시점을 고객이 판단하게 두면 늦게 옵니다. 늦게 오면 결과가 나빠지고, 나빠지면 원장 탓이 됩니다.",
        en: "Book the next visit before they leave the chair.",
      },
      {
        kind: "close",
        title: "기술은 두 번째입니다",
        body: "손이 아무리 좋아도 기준이 없으면 단골이 쌓이지 않습니다. 상담 스크립트는 수업에서 통째로 드립니다.",
        en: "Skill is second. Standards come first.",
      },
    ],
  },
  {
    id: "korean-lash-why",
    caption: `한국 속눈썹이 왜 다른가요?

해외 원장님들께 가장 많이 받는 질문입니다.
기법이 아니라 기준이 다릅니다.

The most common question I get from artists abroad.
It is not the technique. It is the standard.`,
    hashtags: [
      "#koreanlash", "#lashartist", "#lashtraining", "#kbeauty", "#eyelashextensions",
      "#속눈썹연장", "#속눈썹교육", "#래쉬아티스트", "#케이뷰티", "#글로벌교육",
    ],
    slides: [
      {
        kind: "cover",
        title: "한국 속눈썹은\n무엇이 다른가",
        subtitle: "해외에서 가장 많이 묻는 질문",
        en: "What makes Korean lash different",
      },
      {
        kind: "point",
        title: "자모를 먼저 봅니다",
        body: "디자인을 정하고 자모를 맞추는 것이 아니라, 자모를 보고 가능한 디자인을 정합니다. 순서가 반대입니다.",
        en: "We read the natural lash first, then decide the design.",
      },
      {
        kind: "point",
        title: "티가 나지 않게",
        body: "한국 고객은 '했는데 안 한 것 같은' 결과를 원합니다. 그래서 두께보다 방향과 결을 맞추는 데 시간을 씁니다.",
        en: "The goal is direction and flow, not thickness.",
      },
      {
        kind: "point",
        title: "유지 기간이 기준",
        body: "끝난 직후의 사진이 아니라 3주 뒤의 모습으로 실력을 판단합니다. 그래서 리텐션 교육이 기본 과정에 들어갑니다.",
        en: "We judge the work at week three, not on day one.",
      },
      {
        kind: "close",
        title: "배우러 오시는 분들께",
        body: "한국식 기준을 처음부터 정리해서 가르칩니다. 영어 통역이 필요한 분은 DM으로 문의 주세요.",
        en: "Training available for international artists. DM for details.",
      },
    ],
  },
];

/** 큐에서 n번째 글. 범위를 넘으면 null */
export function postAt(index: number): Post | null {
  return POSTS[index] ?? null;
}
