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
    id: "who-is-miju",
    caption: `속눈썹을 17년 했습니다.

그중 13년은 제 샵을 운영했고, 지금은 청담 위닛 아이디자인에서
시술과 교육, 기술 개발을 함께 하고 있습니다.

기술 하나를 배우고 끝내지 않았습니다.
연구해서 가르치고, 제품으로 만들고, 대회 기준까지 만들었습니다.

17 years in this industry. 13 of them running my own studio.
I don't stop at learning a technique — I teach it, build the product,
and help set the standard it's judged by.`,
    hashtags: [
      "#속눈썹연장", "#속눈썹교육", "#LED속눈썹연장", "#래쉬아티스트", "#아이디자인",
      "#lashartist", "#lasheducator", "#koreanlash", "#eyedesign", "#lashtraining",
    ],
    slides: [
      {
        kind: "cover",
        title: "17년,\n그리고 지금",
        subtitle: "박미주 · 아이디자이너 · 래쉬 교육자",
        en: "MIJU PARK — Eye Designer, Lash Educator",
      },
      {
        kind: "point",
        title: "현장에서 시작했습니다",
        body: "주노헤어 매장 관리와 메이크업으로 시작해, 아미주라는 이름으로 13년간 제 샵을 운영했습니다. 지금 가르치는 모든 기준은 책이 아니라 그 의자에서 나왔습니다.",
        en: "Every standard I teach came from 13 years in my own chair.",
      },
      {
        kind: "point",
        title: "국내 LED 1세대입니다",
        body: "LED 속눈썹 연장이 한국에 막 들어오던 때부터 연구하고 가르쳤습니다. 램프 쓰는 법이 아니라 광경화 원리, 조사 거리, 글루량까지 기준을 세우는 교육을 합니다.",
        en: "First-generation LED lash educator in Korea.",
      },
      {
        kind: "point",
        title: "없던 기술을 만들었습니다",
        body: "연장 후 펌을 결합한 복합 시술을 국내에서 처음 개발해 가르쳤고, 이것을 하이브리드 래쉬 디자인이라는 분야로 발전시켰습니다.",
        en: "Created the extension-then-lift hybrid method in Korea.",
      },
      {
        kind: "point",
        title: "제품까지 만들었습니다",
        body: "교육하면서 쌓인 데이터로 LED 전용 글루와 램프를 직접 개발해 출시했고, 한국인 모질에 맞춘 펌제 공동 개발에도 참여했습니다.",
        en: "Developed LED adhesive, LED lamp, and co-developed a lift solution.",
      },
      {
        kind: "point",
        title: "기준을 만드는 자리에 있습니다",
        body: "싱가포르와 일본 NEEC 국제 대회 심사위원, 한국 월드래쉬컵 LED 분과장을 맡았습니다. 국내 최초로 하이브리드 래쉬 부문을 개설해 평가 기준을 세웠습니다.",
        en: "International judge in Singapore and Japan. Opened Korea's first Hybrid Lash division.",
      },
      {
        kind: "close",
        title: "그래서 가르칩니다",
        body: "기술이 저 하나로 끝나면 아무것도 아닙니다. 위닛 크루에서 원장님들과 함께 기준을 퍼뜨리고 있습니다.",
        en: "A technique that stops with me is worth nothing.",
      },
    ],
  },
  {
    id: "reframe-intro",
    caption: `눈만 보면 디자인이 안 나옵니다.

같은 눈매인데 어울리는 디자인이 다른 이유는 얼굴이 다르기 때문입니다.
그래서 골격진단을 아이디자인에 가져왔습니다.

리프레임(REFRAME)은 속눈썹의 컬·길이·밀도를 고르는 메뉴가 아니라,
눈을 중심으로 인상을 다시 설계하는 시스템입니다.

REFRAME — an eye design system built on facial structure diagnosis.`,
    hashtags: [
      "#리프레임", "#아이디자인", "#골격진단", "#눈매교정", "#속눈썹디자인",
      "#reframe", "#eyedesign", "#koreanlash", "#facialbalance", "#lashdesign",
    ],
    slides: [
      {
        kind: "cover",
        title: "눈만 보면\n디자인이 안 나옵니다",
        subtitle: "REFRAME — 골격에서 시작하는 아이디자인",
        en: "REFRAME — Eye design starts with the face",
      },
      {
        kind: "point",
        title: "왜 얼굴까지 보는가",
        body: "같은 눈매에 같은 디자인을 해도 어울리는 사람과 아닌 사람이 갈립니다. 눈은 얼굴 안에 있고, 인상은 눈 하나가 아니라 비율이 만들기 때문입니다.",
        en: "The eye sits inside a face. Impression comes from proportion.",
      },
      {
        kind: "point",
        title: "여섯 가지를 봅니다",
        body: "얼굴 골격과 비율, 눈의 위치와 형태, 눈썹과 눈의 관계, 자모의 방향·길이·밀도, 지금 가지고 있는 이미지, 그리고 원하는 인상.",
        en: "Six inputs: bone structure, eye position, brow relation, lash condition, current image, desired impression.",
      },
      {
        kind: "point",
        title: "순서가 정해져 있습니다",
        body: "골격 분석 → 눈과 얼굴 밸런스 진단 → 이미지 상담 → 디자인 설계 → 기술 선택 → 시술. 감각이 아니라 순서를 따릅니다.",
        en: "Analysis → Diagnosis → Counseling → Planning → Technique → Design.",
      },
      {
        kind: "point",
        title: "기술은 마지막에 고릅니다",
        body: "LED 연장, 래쉬 리프트, 하이브리드 중 무엇을 쓸지는 진단이 끝난 뒤에 정합니다. 기술을 먼저 정하고 얼굴을 맞추면 순서가 거꾸로입니다.",
        en: "The technique is chosen after the diagnosis, never before.",
      },
      {
        kind: "close",
        title: "감각을 시스템으로",
        body: "잘하는 사람의 감을 배울 수는 없지만, 순서는 배울 수 있습니다. 리프레임은 그 순서를 글로 만든 것입니다.",
        en: "You cannot copy instinct. You can copy a system.",
      },
    ],
  },
  {
    id: "hybrid-order",
    caption: `연장 먼저일까요, 펌 먼저일까요?

연장 후 펌을 국내에서 처음 개발해 가르치면서
가장 많이 받는 질문입니다.

답은 "고객의 자모가 정한다"입니다.

The question I get most about hybrid lash: which comes first?
The client's natural lash decides.`,
    hashtags: [
      "#연장후펌", "#하이브리드래쉬", "#속눈썹펌", "#속눈썹연장", "#속눈썹교육",
      "#hybridlash", "#lashlift", "#lashextensions", "#koreanlash", "#lashtraining",
    ],
    slides: [
      {
        kind: "cover",
        title: "연장 먼저?\n펌 먼저?",
        subtitle: "하이브리드 래쉬의 순서 판단",
        en: "Which comes first in hybrid lash",
      },
      {
        kind: "point",
        title: "하이브리드의 정의부터",
        body: "여기서 말하는 하이브리드는 클래식과 볼륨을 섞는 것이 아닙니다. 래쉬 리프트와 래쉬 익스텐션을 하나의 디자인으로 결합하는 기술입니다.",
        en: "Not Classic + Volume. Lash Lift + Lash Extension.",
      },
      {
        kind: "point",
        title: "펌 먼저 가는 경우",
        body: "자모가 아래로 처져 있거나 방향이 제각각일 때입니다. 먼저 컬과 방향을 잡아두지 않으면 아무리 잘 붙여도 디자인이 흐트러집니다.",
        en: "Lift first when the natural lash points down or grows uneven.",
      },
      {
        kind: "point",
        title: "연장 먼저 가는 경우",
        body: "자모 방향은 괜찮은데 길이와 밀도가 부족할 때입니다. 이때는 연장으로 뼈대를 만들고 마지막에 컬을 정리합니다.",
        en: "Extension first when direction is fine but length and density are not.",
      },
      {
        kind: "point",
        title: "둘 다 안 되는 경우도 있습니다",
        body: "자모가 이미 손상돼 있으면 순서 문제가 아닙니다. 이번엔 하나만 하고 다음을 기약하는 게 결과적으로 고객을 지키는 선택입니다.",
        en: "If the lash is already damaged, the answer is neither. Not yet.",
      },
      {
        kind: "close",
        title: "순서는 취향이 아닙니다",
        body: "원장님 손이 편한 쪽이 아니라 자모가 정합니다. 판단 기준을 잡는 것이 하이브리드 교육의 절반입니다.",
        en: "The order is not a preference. The lash decides.",
      },
    ],
  },
  {
    id: "led-distance",
    caption: `LED 글루가 안 굳는다고 램프를 바꾸기 전에.

거리를 재보셨나요?

조사 거리 몇 센티가 유지력을 바꿉니다.
LED 교육에서 가장 먼저 잡는 기준입니다.

Before you blame the lamp — did you measure the distance?`,
    hashtags: [
      "#LED속눈썹연장", "#LED래쉬", "#속눈썹연장", "#속눈썹교육", "#유지력",
      "#ledlash", "#lashextensions", "#lashtraining", "#koreanlash", "#lashtech",
    ],
    slides: [
      {
        kind: "cover",
        title: "램프를 바꾸기 전에\n거리를 재세요",
        subtitle: "LED 경화의 첫 번째 기준",
        en: "Measure the distance before blaming the lamp",
      },
      {
        kind: "point",
        title: "빛은 거리에 약합니다",
        body: "조사 거리가 멀어지면 도달하는 광량이 급격히 떨어집니다. 같은 램프, 같은 시간인데 결과가 다른 이유가 대부분 여기 있습니다.",
        en: "Light intensity drops sharply with distance.",
      },
      {
        kind: "point",
        title: "시간으로 못 메웁니다",
        body: "거리가 멀어서 덜 굳은 것을 오래 쬐어서 해결하려 하면, 겉만 굳고 속은 덜 굳은 상태가 됩니다. 그 접착은 3주를 못 넘깁니다.",
        en: "Longer exposure does not fix wrong distance.",
      },
      {
        kind: "point",
        title: "글루량이 변수를 키웁니다",
        body: "글루가 많으면 속까지 빛이 못 들어갑니다. 거리를 맞춰도 양이 과하면 같은 문제가 반복됩니다. 거리와 양은 같이 봐야 합니다.",
        en: "Too much adhesive blocks the light from reaching the core.",
      },
      {
        kind: "point",
        title: "환경이 바뀌면 기준도 바뀝니다",
        body: "계절이 바뀌어 온습도가 달라지면 같은 거리에서도 결과가 달라집니다. 숫자를 외우는 게 아니라 조건을 읽는 법을 배워야 합니다.",
        en: "Learn to read conditions, not memorize numbers.",
      },
      {
        kind: "close",
        title: "LED는 감이 아닙니다",
        body: "광경화 원리를 알면 문제가 생겼을 때 어디를 볼지 알게 됩니다. 위닛 크루 LED 교육에서 이 기준부터 잡습니다.",
        en: "Understand the curing, and you know where to look.",
      },
    ],
  },
  {
    id: "judge-view",
    caption: `심사위원석에서는 다르게 보입니다.

싱가포르와 일본 NEEC에서 심사를 하고,
한국 월드래쉬컵에서 LED 분과를 맡으면서 알게 된 것.

점수는 화려함이 아니라 일관성에서 갈립니다.

What I learned from the judge's seat: consistency wins, not flash.`,
    hashtags: [
      "#속눈썹대회", "#월드래쉬컵", "#래쉬아티스트", "#속눈썹교육", "#심사위원",
      "#lashcompetition", "#lashjudge", "#lashartist", "#koreanlash", "#lashtraining",
    ],
    slides: [
      {
        kind: "cover",
        title: "심사위원석에서는\n다르게 보입니다",
        subtitle: "대회가 알려주는 실력의 기준",
        en: "What the judge's seat teaches you",
      },
      {
        kind: "point",
        title: "화려함은 오래 못 갑니다",
        body: "첫눈에 눈길을 끄는 작품이 점수에서 밀리는 일이 자주 있습니다. 심사는 가까이서 오래 봅니다. 그때 남는 건 균일함입니다.",
        en: "Judges look closely, for a long time. Evenness is what survives.",
      },
      {
        kind: "point",
        title: "간격이 실력입니다",
        body: "가모 사이의 간격, 뿌리에서 띄운 거리, 방향의 일관성. 이 셋이 흔들리면 아무리 예쁜 디자인도 완성도에서 감점됩니다.",
        en: "Spacing, root distance, direction. Three things that never lie.",
      },
      {
        kind: "point",
        title: "디자인은 얼굴과 맞아야 합니다",
        body: "모델 얼굴에 맞지 않는 디자인은 기술이 좋아도 설득이 안 됩니다. 대회에서도 결국 아이디자인이 평가됩니다.",
        en: "A design that ignores the face cannot win, however clean.",
      },
      {
        kind: "close",
        title: "그래서 선수를 지도합니다",
        body: "심사 기준을 아는 사람이 가르치면 결과가 달라집니다. 지도한 선수들이 여러 대회에서 1위를 했습니다.",
        en: "Artists I've trained have taken first place, repeatedly.",
      },
    ],
  },
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
