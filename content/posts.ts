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
  /**
   * 배경에 깔 사진 (public/photos의 id). 넣으면 글자가 사진 위에 앉는다.
   * 글이 묻히지 않게 어두운 막을 자동으로 덮는다.
   */
  photo?: string;
  /**
   * 4:5로 자를 때 남길 부분. 얼굴이나 눈이 잘리면 조정한다.
   * "center" 같은 말 대신 "45% 50%"처럼 좌표로 줄 수도 있다 — 확대할 때 필요하다.
   */
  photoPosition?: string;
  /**
   * 확대는 여기서 못 한다. 배율을 주면 캐러셀 엔진이 사진을 타일처럼 반복한다.
   * 더 당겨 보고 싶으면 scripts-crop.mjs로 사진을 잘라 새 번호로 만들어 쓸 것.
   */
  /**
   * 글자를 판의 위쪽에 앉힌다.
   *
   * 표지는 보통 아래쪽에 글을 두지만, 사진에서 보여줘야 할 것이 아래에 있으면
   * 글자가 그걸 덮는다. 눈이 아래쪽에 걸린 사진이 그렇다. 이때만 켠다.
   */
  textTop?: boolean;
}

/**
 * 사진 한 장이 판을 채우는 슬라이드.
 *
 * 지금은 쓰지 않는다. 사진은 표지에만 두고 본문은 글로만 간다 — 섞으면 캐러셀 안이
 * 어수선하고 피드에서도 통일감이 떨어진다는 판단이다. 타입은 남겨둔다.
 */
export interface PhotoSlide {
  kind: "photo";
  /** public/photos의 id */
  photo: string;
  /**
   * 4:5로 자를 때 사진의 어디를 남길지. 기본은 가운데.
   * 기사 캡처처럼 위쪽에 중요한 게 있으면 "top"으로 둔다.
   */
  position?: "top" | "center" | "bottom";
  /** 사진 아래에 얹을 짧은 글. 길면 사진을 가린다 */
  title?: string;
  body?: string;
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

export type Slide = CoverSlide | PointSlide | PhotoSlide | CloseSlide;

export interface Post {
  /** 파일 이름처럼 쓰는 고유값. 한 번 정하면 바꾸지 않는다 */
  id: string;
  /**
   * 표지와 마무리의 배경.
   *  light(기본) — 누드. 실무 교육 글에 쓴다. 피드가 밝고 읽기 편하다.
   *  deep        — 짙은 모카. 브랜드·권위 이야기에만 쓴다.
   *
   * 전부 deep으로 두면 피드가 어두운 벽이 된다. 참고한 계정들도 밝은 톤이 주였다.
   * 셋 중 하나 정도만 deep으로 찍어야 그 글이 눈에 걸린다.
   */
  tone?: "deep" | "light";
  /** 인스타 본문에 들어갈 글 */
  caption: string;
  /**
   * 해시태그 — **정확히 다섯 개**. 원장님 계정 기준이다.
   * 한글 셋(계정 정체성 + 글 주제)과 영문 둘(해외 노출)로 나눠 쓴다.
   * #koreanlash는 해외에서 들어오는 축이라 웬만하면 남긴다.
   */
  hashtags: string[];
  slides: Slide[];
}

export const POSTS: Post[] = [
  {
    id: "stuck-alone",
    caption: `혼자 하다 보면 막히는 지점이 옵니다.

기술이 부족해서가 아니라
내가 무엇을 잘못하는지 볼 사람이 없어서입니다.

Working alone, you cannot see your own habits.`,
    hashtags: ["#속눈썹교육", "#래쉬아티스트", "#원장님공부", "#lashtraining", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "43", textTop: true, title: "혼자 하다\n막히는 지점", subtitle: "내 손은 내가 못 봅니다", en: "You cannot watch your own hands" },
      { kind: "point", title: "습관은 안 보입니다", body: "매번 같은 각도로 잡고 있어도 스스로는 모릅니다. 결과가 조금씩 기울어도 그게 원래 내 그림이라고 생각하게 됩니다.", en: "Your own tilt looks like your style." },
      { kind: "point", title: "물어볼 데가 없습니다", body: "이게 맞는 건지 확인할 사람이 없으면 잘 나온 날과 안 나온 날의 차이를 운으로 넘기게 됩니다.", en: "With no one to ask, good days feel like luck." },
      { kind: "point", title: "손님은 말해주지 않습니다", body: "불편해도 대부분 그냥 안 오십니다. 그래서 무엇을 고쳐야 하는지 모른 채 손님만 줄어듭니다.", en: "They rarely tell you. They just stop coming." },
      { kind: "point", title: "옆에서 한 번 보면", body: "몇 년 걸릴 것이 하루에 잡히는 일이 있습니다. 배우는 게 빠른 게 아니라, 보이는 게 빠릅니다.", en: "One session beside you can settle what years did not." },
      { kind: "close", title: "그래서 크루입니다", body: "가르치고 끝내는 게 아니라 계속 물어볼 수 있는 자리를 만들려고 합니다.", en: "Not a course that ends. A place you can keep asking." },
    ],
  },
  {
    id: "led-distance",
    caption: `LED 글루가 안 굳는다고 램프를 바꾸기 전에.

거리를 재보셨나요?

램프를 몇 센티 떨어뜨리느냐가 유지력을 바꿉니다.
LED 교육에서 가장 먼저 잡는 기준입니다.

Before you blame the lamp — did you measure the distance?`,
    hashtags: ["#LED속눈썹연장", "#속눈썹교육", "#유지력", "#ledlash", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "46",
        title: "램프를 바꾸기 전에\n거리를 재세요",
        subtitle: "빛으로 굳히는 일의 첫 번째 기준",
        en: "Measure the distance before blaming the lamp",
      },
      {
        kind: "point",
        title: "빛은 거리에 약합니다",
        body: "램프가 눈에서 멀어지면 닿는 빛의 양이 뚝 떨어집니다. 같은 램프로 같은 시간을 쬐었는데 결과가 다른 이유가 대부분 여기 있습니다.",
        en: "Light intensity drops sharply with distance.",
      },
      {
        kind: "point",
        title: "시간으로 못 메웁니다",
        body: "멀어서 덜 굳은 것을 오래 쬐어 메우려 하면 겉만 굳고 속은 덜 굳습니다. 그렇게 붙은 것은 3주를 못 넘깁니다.",
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
        title: "알면 찾아갈 수 있습니다",
        body: "감으로도 잘하는 분들이 많습니다. 다만 결과가 흔들렸을 때 어디를 봐야 할지는 원리를 알아야 찾아집니다. 교육에서 이 기준부터 잡는 이유입니다.",
        en: "Instinct works. But when it slips, principle tells you where to look.",
      },
    ],
  },
  {
    id: "first-visit",
    caption: `처음 오신 손님께는 조금 천천히 갑니다.

이 분이 무엇을 기대하고 오셨는지 모르는 채로 시작하면
끝나고 나서 서로 다른 이야기를 하게 됩니다.

With a first-time client, I slow down before I start.`,
    hashtags: ["#속눈썹연장", "#고객관리", "#청담속눈썹", "#lashartist", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "16", textTop: true, title: "처음 오신\n손님께는", subtitle: "시작 전에 천천히 가는 이유", en: "Before the first set" },
      { kind: "point", title: "어디서 보고 오셨는지", body: "사진을 보고 오신 분과 소개로 오신 분은 기대가 다릅니다. 무엇을 보고 오셨는지 알면 어디를 맞춰야 할지 보입니다.", en: "What they saw before coming tells you what they expect." },
      { kind: "point", title: "지난번 경험을 묻습니다", body: "처음이 아닌 경우가 많습니다. 어디가 불편했는지 들으면 이번에 피해야 할 것이 정해집니다.", en: "Ask what went wrong last time." },
      { kind: "point", title: "안 되는 것을 먼저", body: "원하시는 만큼 안 나올 수 있다면 시작 전에 말씀드립니다. 끝나고 말하면 변명이 됩니다.", en: "Say what is not possible before you start." },
      { kind: "point", title: "다음 약속까지", body: "언제쯤 오시면 좋은지 나가시기 전에 정합니다. 늦게 오시면 결과가 나빠지고, 그건 서로 손해입니다.", en: "Set the next visit before they leave." },
      { kind: "close", title: "3분이 3주를 정합니다", body: "시작 전 대화가 시술만큼 결과를 정합니다. 손이 아니라 여기서 갈리는 경우가 많습니다.", en: "The three minutes before decide the three weeks after." },
    ],
  },
  {
    id: "hybrid-order",
    caption: `연장 먼저냐 펌 먼저냐, 정답이 하나는 아닙니다.

펌을 먼저 가는 방식에도 분명한 장점이 있습니다.
다만 시술 뒤 관리 과정에서 컬이 돌아오는 일이 생기고,
펌 약이 손님 속눈썹에 무엇을 남기는지 모른 채 하면 유지력이 먼저 떨어집니다.

제가 순서를 나눠 쓰는 건 기술이 좋아서가 아니라,
같은 손님을 3주 뒤에 다시 보면서 알게 된 것들 때문입니다.

Neither order is wrong. What changes is what happens after.`,
    hashtags: ["#연장후펌", "#하이브리드래쉬", "#속눈썹교육", "#hybridlash", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "06",
        title: "연장 먼저?\n펌 먼저?",
        subtitle: "어느 쪽도 틀리지 않습니다",
        en: "Neither order is wrong",
      },
      {
        kind: "point",
        title: "둘 다 됩니다",
        body: "펌을 먼저 하든 연장을 먼저 하든 결과는 나옵니다. 갈리는 건 끝난 직후가 아니라 2주에서 3주 사이입니다. 그때 무엇이 달라지는지를 알고 고르면 됩니다.",
        en: "Both work. The difference shows up in week two or three.",
      },
      {
        kind: "point",
        title: "펌을 먼저 가면",
        body: "컬과 방향을 먼저 잡아두니 완성 그림이 예측됩니다. 손님 속눈썹이 아래로 처져 있거나 방향이 제각각인 눈에는 이쪽이 편합니다.",
        en: "Lift first gives you a predictable shape to build on.",
      },
      {
        kind: "point",
        title: "대신 컬이 돌아옵니다",
        body: "펌 직후에는 예뻤는데 지내다 보면 컬이 서서히 원래 방향으로 돌아오는 일이 있습니다. 그 위에 붙여둔 속눈썹이 같이 방향을 잃으면서 처음 모양과 달라집니다.",
        en: "The curl can relax back, and the extensions drift with it.",
      },
      {
        kind: "point",
        title: "약제가 무엇을 남기는지",
        body: "펌은 속눈썹 안쪽 결합을 한 번 끊었다가 다시 붙이는 과정입니다. 그래서 펌 직후의 속눈썹 표면은 평소와 다릅니다. 이걸 모르고 바로 붙이면 붙는 힘이 약해져서, 손보다 유지력이 먼저 무너집니다.",
        en: "The lash surface right after a lift is not the surface you usually bond to.",
      },
      {
        kind: "point",
        title: "연장을 먼저 가면",
        body: "손님 속눈썹 방향은 괜찮은데 길이와 숱이 부족한 경우입니다. 먼저 뼈대를 세우고 마지막에 컬을 정리하면 돌아옴이 덜합니다. 대신 처음 설계가 더 정확해야 합니다.",
        en: "Extension first drifts less, but the plan has to be right from the start.",
      },
      {
        kind: "point",
        title: "손님은 3주 뒤로 판단합니다",
        body: "저를 다시 찾아주시는 이유를 물어보면 대부분 \"오래 간다\"입니다. 시술이 예뻤다는 말보다 이 말이 먼저 나옵니다. 그래서 저는 순서를 끝난 직후가 아니라 3주 뒤 상태로 정합니다.",
        en: "When I ask why they come back, they say it lasts. Not that it looked good.",
      },
      {
        kind: "close",
        title: "고를 수 있으면 됩니다",
        body: "어느 쪽이 옳다는 이야기가 아닙니다. 손님의 속눈썹 상태와 생활을 보고 둘 중에 고를 수 있으면 됩니다. 그 기준을 만드는 게 교육에서 하는 일입니다.",
        en: "The goal is not one right order. It is being able to choose.",
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
    hashtags: ["#속눈썹연장", "#속눈썹교육", "#래쉬아티스트", "#lashtraining", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "07",
        title: "3주 만에\n빠지는 이유",
        subtitle: "글루를 바꾸기 전에 확인할 것",
        en: "Why lashes fall in 3 weeks",
      },
      {
        kind: "point",
        title: "전처리가 반이다",
        body: "기름기가 남은 자리에 붙이면 아무리 좋은 글루를 써도 3주를 못 갑니다. 시술 전에 닦고 완전히 말리는 것까지가 붙이는 일의 시작입니다.",
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
        title: "닿는 면 1.5mm",
        body: "붙이는 속눈썹이 손님 속눈썹에 닿아 있는 길이가 1.5mm 아래로 떨어지면 버티지 못합니다. 뿌리에서 0.5mm 띄우되 닿는 면은 넉넉히 잡습니다.",
        en: "Keep at least 1.5mm of contact along the natural lash.",
      },
      {
        kind: "point",
        title: "무게를 계산하세요",
        body: "손님 속눈썹 굵기에 비해 붙이는 속눈썹이 무거우면, 잘 붙어 있어도 원래 속눈썹이 먼저 빠집니다. 손님 속눈썹 상태가 곧 디자인의 한계선입니다.",
        en: "The client's natural lash sets the ceiling for your design.",
      },
      {
        kind: "point",
        title: "집에 가서가 진짜 시작",
        body: "가장 많이 빠지는 구간은 시술 후 24시간입니다. 무엇을 하지 말아야 하는지 말로만 하지 말고 카드로 쥐여 보내세요.",
        en: "The first 24 hours decide retention. Send them home with a card.",
      },
      {
        kind: "close",
        title: "오래 가는 건 타고나는 게 아닙니다",
        body: "타고난 손이 아니라 순서에서 갈립니다. 기준을 하나씩 잡으면 유지 기간이 눈에 띄게 달라집니다.",
        en: "Retention comes from sequence, not from gifted hands.",
      },
    ],
  },
  {
    id: "liftensions",
    caption: `연장 후 펌, 왜 한국에서 자리를 잡았을까요.

한국 손님 속눈썹은 굵고 곧게 자라는 경우가 많습니다.
그래서 길이만 더하면 무거워 보이고, 컬만 넣으면 허전합니다.

둘을 하나의 디자인으로 묶으면
"했는데 안 한 것 같은" 결과가 나옵니다.
요즘은 해외에서도 이 결과를 먼저 물어보십니다.

Why lift and extension became one design in Korea.`,
    hashtags: ["#연장후펌", "#리프텐션", "#하이브리드래쉬", "#liftensions", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "82",
        title: "연장 후 펌이\n한국에서 나온 이유",
        subtitle: "LIFTENSIONS — 둘을 하나로 묶는 설계",
        en: "LIFTENSIONS — why it started here",
      },
      {
        kind: "point",
        title: "속눈썹부터 다릅니다",
        body: "한국 손님 속눈썹은 굵고 곧게 자라는 경우가 많습니다. 아래를 향해 자라기도 합니다. 눈 위에서 보면 길이가 있어도 잘 보이지 않습니다.",
        en: "Straighter, thicker lashes that often grow downward.",
      },
      {
        kind: "point",
        title: "길이만 더하면",
        body: "곧은 속눈썹에 길이를 더하면 무게가 앞으로 쏠립니다. 정면에서는 길어 보이는데 눈매는 오히려 처져 보이는 일이 생깁니다.",
        en: "Add length to a straight lash and the weight pulls it down.",
      },
      {
        kind: "point",
        title: "컬만 넣으면",
        body: "펌으로 방향은 살아나지만 원래 있던 만큼만 보입니다. 숱이 적은 분은 시술을 했는데도 허전하다고 느끼십니다.",
        en: "A lift lifts what is there. If it is sparse, it stays sparse.",
      },
      {
        kind: "point",
        title: "그래서 둘을 묶습니다",
        body: "펌으로 방향과 각도를 정리하고, 연장으로 길이와 숱을 채웁니다. 하나의 디자인 안에서 역할을 나누면 무겁지도 허전하지도 않습니다.",
        en: "The lift sets direction. The extension fills it in.",
      },
      {
        kind: "point",
        title: "해외에서 묻는 이유",
        body: "티 나는 결과보다 자연스러운 결과를 찾는 손님이 늘고 있습니다. 밖에서 오신 원장님들이 가장 먼저 물어보시는 것도 이 부분입니다.",
        en: "Artists abroad ask about this first — the natural finish.",
      },
      {
        kind: "close",
        title: "기술이 아니라 설계입니다",
        body: "두 가지를 다 할 줄 아는 것과, 한 사람 눈에 맞게 나눠 쓰는 것은 다릅니다. 그 나누는 기준을 가르칩니다.",
        en: "Knowing both is one thing. Dividing the work is another.",
      },
    ],
  },
  {
    id: "why-build-glue",
    caption: `글루를 직접 만들게 된 이유.

교육을 하다 보니 같은 내용을 가르쳐도 결과가 갈렸습니다.
원인을 따라가 보니 제품이었습니다.

I started teaching. Then I had to build the product.`,
    hashtags: ["#LED속눈썹연장", "#속눈썹글루", "#속눈썹교육", "#ledlash", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "04",
        title: "글루를 직접\n만든 이유",
        subtitle: "교육이 먼저였고, 제품은 그다음이었습니다",
        en: "Teaching came first. The product followed.",
      },
      {
        kind: "point",
        title: "결과가 갈렸습니다",
        body: "같은 기준을 가르쳤는데 어떤 원장님은 4주를 만들고 어떤 원장님은 2주에 무너졌습니다. 손의 문제가 아니었습니다.",
        en: "Same lesson, different results. It was not the hands.",
      },
      {
        kind: "point",
        title: "제품이 기준을 못 따라왔습니다",
        body: "제품마다 잘 맞는 조건이 달랐습니다. 어떤 글루는 이 습도에서, 어떤 글루는 저 거리에서 제 실력을 냅니다. 그런데 제가 가르치는 기준은 하나여야 했습니다.",
        en: "Each adhesive has its own sweet spot. My lesson needed one.",
      },
      {
        kind: "point",
        title: "그래서 만들었습니다",
        body: "그래서 제가 가르치는 조건에 맞는 글루와 램프를 만들었습니다. 다른 제품이 나빠서가 아니라, 교육에서 변수를 하나 줄이고 싶어서였습니다.",
        en: "Not because others were bad. I wanted one less variable in the lesson.",
      },
      {
        kind: "close",
        title: "재현되지 않으면 교육이 아닙니다",
        body: "배운 사람이 자기 샵에서 같은 결과를 낼 수 있어야 교육입니다. 그때까지 책임지는 게 맞다고 생각합니다.",
        en: "If it cannot be reproduced, it was not training.",
      },
    ],
  },
  {
    id: "led-hybrid",
    caption: `연장 후 펌에 LED를 더하면 달라지는 것.

펌 직후의 속눈썹은 평소와 표면이 다릅니다.
그 위에 붙일 때 원하는 순간에 굳게 만들 수 있으면
붙는 힘과 컬 방향을 같이 잡을 수 있습니다.

Adding LED to the lift-and-extension design.`,
    hashtags: ["#LED속눈썹연장", "#연장후펌", "#하이브리드래쉬", "#hybridlash", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "02",
        title: "LED를 더하면\n무엇이 달라지나",
        subtitle: "연장 후 펌과 LED가 만나는 자리",
        en: "What LED changes in a hybrid design",
      },
      {
        kind: "point",
        title: "펌 직후가 관건입니다",
        body: "펌을 하고 나면 속눈썹 표면 상태가 평소와 다릅니다. 이 상태에서 붙일 때 굳는 속도를 내가 정할 수 있으면 손이 급해지지 않습니다.",
        en: "Right after a lift, the surface is different. Control the cure and you stop rushing.",
      },
      {
        kind: "point",
        title: "원하는 순간에 굳힙니다",
        body: "빛을 비추기 전까지는 자리를 다시 잡을 수 있습니다. 방향을 확인하고 굳히면 컬이 서로 다른 쪽을 보는 일이 줄어듭니다.",
        en: "Until the light comes, you can still adjust.",
      },
      {
        kind: "point",
        title: "붙는 힘과 방향을 같이",
        body: "펌으로 잡아둔 각도를 유지한 채로 붙일 수 있으니, 유지력과 디자인을 따로 계산하지 않아도 됩니다.",
        en: "Hold the angle you set with the lift, and bond at the same time.",
      },
      {
        kind: "point",
        title: "대신 기준이 하나 늘어납니다",
        body: "램프와의 거리, 시간, 글루의 양이 서로 물려 있습니다. 셋 중 하나만 바뀌어도 결과가 달라지니 조건을 함께 봐야 합니다.",
        en: "Distance, time, and adhesive amount move together.",
      },
      {
        kind: "close",
        title: "어렵지는 않습니다",
        body: "원리를 한 번 잡아두면 손이 기억합니다. 저는 이 순서를 정리하는 데 몇 해가 걸렸는데, 배우시는 분들은 훨씬 빨리 가십니다.",
        en: "It took me years to order this. It takes my students far less.",
      },
    ],
  },
  {
    id: "teaching-room",
    caption: `가르치는 일이 제일 어렵습니다.

내 손으로 하는 건 제가 책임지면 되는데,
가르친 기술은 원장님들 손에서 매일 반복됩니다.

Teaching is the hardest part. What I teach gets repeated every day, by others.`,
    hashtags: ["#속눈썹교육", "#LED속눈썹연장", "#위닛크루", "#lasheducation", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "39",
        textTop: true,
        title: "가르치는 일이\n제일 어렵습니다",
        subtitle: "매일 반복될 기술을 넘기는 일",
        en: "Why teaching is the hardest part",
      },
      {
        kind: "point",
        title: "설명할 수 있어야 기술입니다",
        body: "손으로는 되는데 말로 안 되는 건 아직 기술이 아니라 습관입니다. 가르치려면 순서를 글로 만들어야 합니다.",
        en: "If you cannot explain it, it is a habit, not a technique.",
      },
      {
        kind: "point",
        title: "매번 새로 씁니다",
        body: "같은 과정이어도 오는 분들이 다릅니다. 어디서 막히는지가 다르니 그때마다 자료를 고칩니다.",
        en: "Same course, different people. The material changes every time.",
      },
      {
        kind: "point",
        title: "재현될 때까지가 교육입니다",
        body: "강의실에서 한 번 성공하는 건 쉽습니다. 각자 샵에서 각자 고객에게 같은 결과가 나와야 끝난 것입니다.",
        en: "It ends when it works in their own studio, not mine.",
      },
      {
        kind: "point",
        title: "그래서 계속합니다",
        body: "잘 나왔다고 사진 보내주시는 분들이 있습니다. 그 순간이 제일 좋습니다.",
        en: "They send me photos when it works. That is the best part.",
      },
      {
        kind: "close",
        title: "혼자보다 크루로",
        body: "기준을 나눠 가진 사람이 많아질수록 기술이 오래갑니다. 위닛 크루가 그 방식입니다.",
        en: "A standard shared by many outlives the one who made it.",
      },
    ],
  },
  {
    id: "coaching-competitors",
    caption: `대회에 나가야 실력이 증명됩니다.

지도한 선수들이 여러 대회에서 1위를 했습니다.
심사 기준을 아는 사람이 가르치면 결과가 달라집니다.

Artists I've trained have taken first place, repeatedly.`,
    hashtags: ["#속눈썹대회", "#월드래쉬컵", "#속눈썹교육", "#lashcompetition", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "40",
        textTop: true,
        title: "대회에 나가야\n증명됩니다",
        subtitle: "선수 지도에서 실제로 하는 일",
        en: "Why competition proves what training cannot",
      },
      {
        kind: "point",
        title: "기준을 먼저 분석합니다",
        body: "종목마다 보는 것이 다릅니다. 무엇으로 점수가 갈리는지 모르고 연습하면 시간만 씁니다. 심사 경험이 여기서 쓰입니다.",
        en: "Know what is scored before you practice.",
      },
      {
        kind: "point",
        title: "선수마다 전략이 다릅니다",
        body: "손이 빠른 선수와 정교한 선수는 다른 작품을 준비해야 합니다. 잘하는 것을 밀어주는 편이 약점을 메우는 것보다 빠릅니다.",
        en: "Play to what the artist already does well.",
      },
      {
        kind: "point",
        title: "디자인 밸런스를 봅니다",
        body: "기술이 아무리 깨끗해도 모델 얼굴에 맞지 않으면 설득이 안 됩니다. 대회에서도 결국 아이디자인이 평가됩니다.",
        en: "Clean work still loses if the design ignores the face.",
      },
      {
        kind: "close",
        title: "결과로 증명되게",
        body: "가르치는 것에서 끝내지 않고, 객관적인 무대에서 자기 기술을 증명할 수 있게 하는 것이 목표입니다.",
        en: "Training should end on a stage, not in a classroom.",
      },
    ],
  },
  {
    id: "consult-3min",
    caption: `시술보다 상담이 먼저 끝나야 합니다.

재방문율이 높은 원장님들은 앉히자마자 3분을 씁니다.
그 3분에 무엇을 묻는지 정리했습니다.

The best lash artists spend three minutes before they touch a single lash.`,
    hashtags: ["#속눈썹연장", "#속눈썹교육", "#고객관리", "#lashartist", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "49",
        textTop: true,
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
        body: "예쁘게 해달라는 말에는 각자 다른 그림이 들어 있습니다. 지난번에 무엇이 불편했는지 물으면 그 그림이 구체적으로 나옵니다.",
        en: "Everyone means something different by pretty. Ask what bothered them last time.",
      },
      {
        kind: "point",
        title: "안 되는 것을 먼저 말합니다",
        body: "손님 속눈썹이 얇으면 원하는 만큼 풍성해지기 어렵다는 걸 시술 전에 말씀드립니다. 끝나고 말하면 변명이 되고, 먼저 말하면 설명이 됩니다.",
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
        title: "손보다 먼저 하는 일",
        body: "손이 좋은 분들은 많습니다. 다시 오시게 만드는 건 그 앞의 3분에서 갈리더라는 게 제 경험입니다.",
        en: "Plenty of good hands. The three minutes before decide who comes back.",
      },
    ],
  },
  {
    id: "why-led",
    caption: `LED 속눈썹, 무엇이 다른가요.

해외에서 오신 원장님들께 가장 많이 받는 질문입니다.
빨리 끝나서가 아니라, 굳는 순간을 제가 정할 수 있어서입니다.

The question I get most from artists abroad — what LED actually changes.`,
    hashtags: ["#LED속눈썹연장", "#속눈썹교육", "#케이뷰티", "#ledlash", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "81",
        title: "LED 속눈썹은\n무엇이 다른가",
        subtitle: "해외에서 가장 많이 묻는 것",
        en: "What LED actually changes",
      },
      {
        kind: "point",
        title: "기다리지 않습니다",
        body: "일반 글루는 공기 중 수분으로 굳습니다. 그래서 그날 습도가 시술 속도를 정합니다. LED는 빛을 비출 때 굳으니 그 조건에서 자유롭습니다.",
        en: "Regular adhesive cures with moisture in the air. LED cures when the light says so.",
      },
      {
        kind: "point",
        title: "굳는 순간을 정합니다",
        body: "붙이고 나서 방향을 한 번 더 볼 수 있습니다. 확인하고 굳히니 서로 다른 쪽을 보는 속눈썹이 줄어듭니다.",
        en: "You can check the direction once more before it sets.",
      },
      {
        kind: "point",
        title: "손님이 느끼는 차이",
        body: "굳히는 동안 기다리는 시간이 줄어듭니다. 다만 빨리 끝나는 것 자체가 목적은 아닙니다. 급하게 붙이면 LED라도 결과는 같이 나빠집니다.",
        en: "Less waiting. But speed was never the point.",
      },
      {
        kind: "point",
        title: "대신 기준이 필요합니다",
        body: "램프와의 거리, 비추는 시간, 글루의 양이 서로 물려 있습니다. 이 셋을 각자 감으로 하면 같은 램프를 써도 결과가 갈립니다.",
        en: "Distance, time, and adhesive amount all move together.",
      },
      {
        kind: "close",
        title: "배우러 오시는 분들께",
        body: "기계가 아니라 조건을 배우는 과정입니다. 영어 통역이 필요하시면 디엠으로 문의 주세요.",
        en: "You are learning conditions, not a device. DM for international training.",
      },
    ],
  },
  {
    id: "one-technique-far",
    tone: "deep",
    caption: `기술 하나를 어디까지 끌고 갈 수 있을까요.

시술 메뉴에서 끝내면 유행이 지나면 사라집니다.
교육하고, 제품으로 만들고, 대회 기준까지 세우면 분야가 됩니다.

Technique → Education → Product → Competition → Contents → Branding`,
    hashtags: ["#속눈썹교육", "#뷰티창업", "#래쉬아티스트", "#lasheducator", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "01",
        textTop: true,
        title: "기술 하나를\n어디까지",
        subtitle: "메뉴에서 끝내지 않는 방법",
        en: "How far can one technique go",
      },
      {
        kind: "point",
        title: "시술로 끝내면 사라집니다",
        body: "새 기술을 배워 메뉴에 올리면 그때는 손님이 옵니다. 하지만 남들도 다 하게 되면 가격만 남습니다.",
        en: "A menu item becomes a price war once everyone has it.",
      },
      {
        kind: "point",
        title: "가르치면 기준이 생깁니다",
        body: "남에게 설명하려면 순서를 글로 만들어야 합니다. 그 과정에서 감으로 하던 것이 기준이 됩니다.",
        en: "Teaching forces instinct to become a written standard.",
      },
      {
        kind: "point",
        title: "제품이 기준을 지킵니다",
        body: "기준을 세워도 재료가 흔들리면 재현이 안 됩니다. 필요하면 직접 만들어야 교육이 완성됩니다.",
        en: "The material has to hold the standard you teach.",
      },
      {
        kind: "point",
        title: "대회가 기준을 공인합니다",
        body: "내 기준이 맞다고 혼자 말하는 것과, 심사 기준이 되어 평가되는 것은 다릅니다. 국내 최초로 하이브리드 부문을 개설한 이유입니다.",
        en: "A standard becomes real when it is used to judge.",
      },
      {
        kind: "close",
        title: "그래야 분야가 됩니다",
        body: "기술 → 교육 → 제품 → 대회 → 콘텐츠 → 브랜딩. 이 순서를 한 바퀴 돌면 메뉴가 아니라 분야가 남습니다.",
        en: "Go around once, and you have a field, not a menu.",
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
    hashtags: ["#리프레임", "#아이디자인", "#눈매교정", "#reframe", "#eyedesign"],
    slides: [
      {
        kind: "cover",
        photo: "73",
        textTop: true,
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
        body: "얼굴 골격과 비율, 눈의 위치와 모양, 눈썹과 눈 사이, 속눈썹의 방향과 길이와 숱, 지금 주는 인상, 그리고 원하는 인상.",
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
    id: "glue-storage",
    caption: `글루가 어제랑 다르게 굳는다면.

기술보다 보관을 먼저 봅니다.
같은 병인데 며칠 사이에 달라지는 일이 실제로 있습니다.

If the adhesive behaves differently today, check storage first.`,
    hashtags: ["#LED속눈썹연장", "#속눈썹글루", "#속눈썹교육", "#ledlash", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "29", title: "글루가 어제랑\n다르다면", subtitle: "기술보다 먼저 볼 것", en: "Check storage before technique" },
      { kind: "point", title: "온도부터 봅니다", body: "따뜻한 곳에 두면 병 안에서 서서히 변합니다. 여름에 시술대 위에 올려둔 채로 하루를 보내면 다음 날 다르게 굳습니다.", en: "Left warm on the table, it changes by the next day." },
      { kind: "point", title: "뚜껑을 여는 횟수", body: "열 때마다 공기가 들어갑니다. 필요한 만큼만 덜어 쓰고 병은 오래 열어두지 않는 게 좋습니다.", en: "Every opening lets air in." },
      { kind: "point", title: "개봉하면 시계가 돕니다", body: "미개봉 기간과 개봉 후 기간은 다릅니다. 언제 열었는지 적어두면 결과가 흔들릴 때 원인을 찾기 쉽습니다.", en: "Write the date you opened it." },
      { kind: "point", title: "흔드는 것도 습관입니다", body: "쓰기 전에 충분히 섞였는지 확인합니다. 굳는 속도만이 아니라 붙는 힘도 여기서 갈립니다.", en: "Mix it properly before every set." },
      { kind: "close", title: "재료가 흔들리면", body: "손이 아무리 같아도 결과가 갈립니다. 보관을 정해두면 변수가 하나 줄어듭니다.", en: "Fix the storage, remove one variable." },
    ],
  },
  {
    id: "who-teaches",
    caption: `위닛 크루는 누가 가르치나요.

크루 강사도 바로 강단에 서지 않습니다.
충분히 연습하고, 같은 기준으로 피드백하는 연습까지 거칩니다.

어느 강사에게 배우셔도 같은 교육과 같은 피드백을 받으시는 것.
그게 저희가 만들어가는 원칙입니다.

Every crew instructor trains before they teach.`,
    hashtags: ["#위닛크루", "#속눈썹교육", "#래쉬아티스트", "#lasheducation", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "77",
        textTop: true,
        title: "누가\n가르치는가",
        subtitle: "크루 강사가 되기까지",
        en: "Who teaches at WENEED CREW",
      },
      {
        kind: "point",
        title: "바로 가르치지 않습니다",
        body: "시술을 잘하신다고 다음 날부터 강사가 되지 않습니다. 크루 강사도 충분히 연습하는 기간을 거친 뒤에 강단에 섭니다.",
        en: "Being good with your hands does not make you an instructor the next day.",
      },
      {
        kind: "point",
        title: "잘하는 것과 가르치는 것",
        body: "손으로는 되는데 말로 안 되는 구간이 누구에게나 있습니다. 그 구간을 글로 만들어보는 것이 강사 준비의 절반입니다.",
        en: "Everyone has a part their hands know but their words do not.",
      },
      {
        kind: "point",
        title: "같은 기준으로 봅니다",
        body: "같은 작품을 보고 서로 다른 지적을 하면 배우시는 분이 혼란스럽습니다. 무엇을 먼저 보고 어떻게 말할지를 맞춥니다.",
        en: "If two instructors flag different things, the student is the one who suffers.",
      },
      {
        kind: "point",
        title: "피드백도 연습입니다",
        body: "틀렸다고 말하는 건 쉽습니다. 어디를 어떻게 고치면 되는지, 왜 그런지까지 전하는 것은 따로 연습해야 합니다.",
        en: "Saying it is wrong is easy. Saying how and why takes practice.",
      },
      {
        kind: "close",
        title: "만들어가는 중입니다",
        body: "아직 완성된 시스템이라고 말씀드리지는 못합니다. 다만 어느 자리에서 배우셔도 같은 교육을 받으시게 하는 것, 그 원칙만은 지키고 있습니다.",
        en: "Not finished yet. But the principle holds — same training, whoever teaches it.",
      },
    ],
  },
  {
    id: "led-mistakes",
    caption: `LED 배우고 나서 가장 많이 하시는 실수.

기계를 믿고 손이 급해지는 것입니다.
빛은 굳히는 것이지 잘못 붙인 것을 고쳐주지 않습니다.

The most common mistake after learning LED — rushing.`,
    hashtags: ["#LED속눈썹연장", "#속눈썹교육", "#래쉬아티스트", "#ledlash", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "76", title: "LED 배우고\n가장 많이 하는 실수", subtitle: "빛이 대신해주지 않는 것", en: "What the light will not fix" },
      { kind: "point", title: "손이 급해집니다", body: "굳는 걸 내가 정할 수 있으니 여유가 생깁니다. 그런데 그 여유를 속도로 쓰면 원래보다 결과가 나빠집니다.", en: "The margin LED gives you is not meant to be spent on speed." },
      { kind: "point", title: "붙이는 자리가 먼저입니다", body: "빛은 자리를 옮겨주지 않습니다. 뿌리에서 띄운 거리, 닿는 면, 방향은 비추기 전에 정해집니다.", en: "Position is decided before the light." },
      { kind: "point", title: "글루가 많으면 속이 안 굳습니다", body: "양이 많을수록 빛이 속까지 못 갑니다. 겉만 굳은 채로 끝나면 겉보기에는 멀쩡합니다.", en: "Too much adhesive and the light never reaches the core." },
      { kind: "point", title: "한 번에 몰아서 비추기", body: "여러 개를 붙여두고 한꺼번에 굳히면 먼저 붙인 것과 나중 것의 조건이 달라집니다.", en: "Bonding many at once means different conditions for each." },
      { kind: "close", title: "기계가 아니라 조건", body: "LED를 배운다는 건 기계 쓰는 법이 아니라 조건을 읽는 법을 배우는 일입니다.", en: "You are learning conditions, not a device." },
    ],
  },
  {
    id: "humidity",
    caption: `계절이 바뀌면 글루가 바뀝니다.

정확히는 글루가 아니라 방이 바뀐 것입니다.
같은 제품인데 여름과 겨울에 다르게 굳습니다.

The glue did not change. The room did.`,
    hashtags: ["#속눈썹연장", "#속눈썹교육", "#유지력", "#lashtraining", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "48", title: "계절이 바뀌면\n글루가 바뀝니다", subtitle: "정확히는 방이 바뀐 것입니다", en: "The room changed, not the glue" },
      { kind: "point", title: "일반 글루는 수분으로 굳습니다", body: "공기 중 습기가 굳는 속도를 정합니다. 그래서 장마철과 건조한 겨울에 같은 병이 다르게 움직입니다.", en: "Regular adhesive cures with moisture in the air." },
      { kind: "point", title: "빠르다고 좋은 게 아닙니다", body: "습할 때는 너무 빨리 굳어서 자리를 잡기 전에 굳어버립니다. 붙긴 붙었는데 방향이 어긋납니다.", en: "Curing too fast sets it before you place it." },
      { kind: "point", title: "느릴 때는 흐릅니다", body: "건조할 때는 덜 굳은 상태로 머물러 옆으로 번집니다. 붙지 말아야 할 것끼리 붙기도 합니다.", en: "Too slow and it spreads where it should not." },
      { kind: "point", title: "방을 먼저 재세요", body: "온습도계 하나면 됩니다. 오늘 방이 어떤지 알면 굳는 속도가 예상되고, 손이 그에 맞춰집니다.", en: "One thermo-hygrometer tells you what today will be like." },
      { kind: "close", title: "LED가 편한 이유", body: "빛으로 굳히면 이 변수에서 자유로워집니다. 다만 거리와 시간이라는 새 기준이 생깁니다.", en: "LED frees you from this. It adds its own rules." },
    ],
  },
  {
    id: "after-perm-timing",
    caption: `펌하고 바로 붙여도 될까요.

가장 많이 받는 질문입니다.
답은 손님 속눈썹 상태에 따라 다릅니다.

Can I bond right after a lift? It depends on the lash.`,
    hashtags: ["#연장후펌", "#하이브리드래쉬", "#속눈썹펌", "#hybridlash", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "70", title: "펌하고 바로\n붙여도 될까요", subtitle: "가장 많이 받는 질문", en: "Bonding right after a lift" },
      { kind: "point", title: "표면이 아직 다릅니다", body: "펌은 속눈썹 안쪽 결합을 끊었다가 다시 붙이는 과정입니다. 그 직후의 표면은 평소 붙이던 상태와 같지 않습니다.", en: "The surface right after a lift is not the usual one." },
      { kind: "point", title: "잔여물이 남아 있으면", body: "약이 남아 있는 채로 붙이면 붙는 힘이 약해집니다. 헹구고 말리는 과정을 서두르면 여기서 갈립니다.", en: "Residue left behind weakens the bond." },
      { kind: "point", title: "손님마다 다릅니다", body: "속눈썹이 튼튼한 분은 같은 날 진행해도 괜찮은 경우가 있고, 얇은 분은 나눠서 가는 편이 낫습니다.", en: "Strong lashes can take it. Fine ones often cannot." },
      { kind: "point", title: "나눠 가면 손해일까", body: "한 번에 끝내는 게 손님께는 편하지만, 3주 뒤에 무너지면 결국 다시 오셔야 합니다. 어느 쪽이 손해인지는 그때 갈립니다.", en: "One visit is convenient. Until week three." },
      { kind: "close", title: "정답 대신 기준", body: "무조건 바로 또는 무조건 나중이 아니라, 무엇을 보고 정하는지가 기준입니다.", en: "Not always now, not always later. Know what you are looking at." },
    ],
  },
  {
    id: "curl-comes-back",
    caption: `컬이 돌아왔다는 연락을 받으면.

손님 잘못도 원장님 잘못도 아닌 경우가 많습니다.
어디서 돌아오는지 알면 다음 시술이 달라집니다.

When the curl relaxes, it is usually neither side's fault.`,
    hashtags: ["#연장후펌", "#속눈썹펌", "#고객관리", "#lashlift", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "71", title: "컬이 돌아왔다는\n연락을 받으면", subtitle: "어디서 돌아오는지부터", en: "When the curl relaxes" },
      { kind: "point", title: "원래 방향으로 돌아갑니다", body: "속눈썹은 자기가 자라던 방향을 기억합니다. 펌으로 바꿔둔 각도가 시간이 지나며 조금씩 원래대로 갑니다.", en: "The lash remembers how it used to grow." },
      { kind: "point", title: "위에 붙인 것이 같이 움직입니다", body: "돌아오는 힘이 붙여둔 속눈썹까지 끌고 갑니다. 그래서 처음 모양과 달라 보이는 것이지, 떨어진 게 아닙니다.", en: "The extensions drift with it. They did not fall." },
      { kind: "point", title: "첫 며칠이 큽니다", body: "시술 직후 며칠 동안 어떻게 지냈는지가 남는 각도를 정합니다. 엎드려 자는 습관 하나로도 한쪽만 달라집니다.", en: "The first few days decide the angle that stays." },
      { kind: "point", title: "설명이 관리입니다", body: "무엇을 하지 말라고만 하면 잊으십니다. 왜 그런지 한 줄만 붙여드리면 기억하십니다.", en: "Tell them why, not just what not to do." },
      { kind: "close", title: "다음 설계에 넣습니다", body: "이 손님은 얼마나 돌아오는지를 알면 다음에는 그만큼 감안해서 잡습니다. 기록이 남으면 두 번째부터 쉬워집니다.", en: "Note how much it relaxed. The second visit gets easier." },
    ],
  },
  {
    id: "lash-flow",
    caption: `디자인이 안 나온다면 결을 보실 때입니다.

속눈썹 연장은 그냥 붙이는 일이 아닙니다.
손님 속눈썹이 흐르는 방향과, 붙이는 속눈썹 자체의 결.
이 둘이 맞아야 디자인이 됩니다.

왕홍 스타일을 어려워하시는 분들이 많은데,
대부분 이 결을 읽는 데서 막힙니다.

Design is not placement. It is reading two flows at once.`,
    hashtags: ["#속눈썹연장", "#눈매디자인", "#속눈썹교육", "#lashdesign", "#koreanlash"],
    slides: [
      {
        kind: "cover",
        photo: "74",
        title: "결을 읽어야\n디자인이 나옵니다",
        subtitle: "붙이는 일과 설계하는 일의 차이",
        en: "Reading the flow, not just placing",
      },
      {
        kind: "point",
        title: "그냥 붙이는 게 아닙니다",
        body: "하나씩 정확히 붙였는데도 전체가 어수선해 보일 때가 있습니다. 각각은 맞는데 흐름이 안 맞아서입니다.",
        en: "Each one placed right, and the whole set still looks messy.",
      },
      {
        kind: "point",
        title: "손님 속눈썹에 흐름이 있습니다",
        body: "눈 앞머리부터 뒤까지 자라는 방향이 조금씩 바뀝니다. 이 흐름을 무시하고 같은 각도로 붙이면 중간이 뻗칩니다.",
        en: "The growth direction shifts from inner to outer corner.",
      },
      {
        kind: "point",
        title: "붙이는 속눈썹에도 결이 있습니다",
        body: "가모도 휘는 면과 방향이 정해져 있습니다. 어느 쪽을 대고 붙이느냐에 따라 같은 제품도 다르게 앉습니다.",
        en: "The extension itself has a face and a direction.",
      },
      {
        kind: "point",
        title: "두 결이 어긋나면",
        body: "붙는 힘은 멀쩡한데 결과가 지저분해 보입니다. 손님은 이유를 모른 채 뭔가 어색하다고 느끼십니다.",
        en: "The bond holds, but the eye reads it as wrong.",
      },
      {
        kind: "point",
        title: "왕홍 스타일이 어려운 이유",
        body: "결을 정교하게 맞춰야 나오는 디자인입니다. 기술이 부족해서가 아니라 흐름을 읽는 눈이 아직 안 잡혀서 어려운 경우가 대부분입니다.",
        en: "It demands flow control. Not more skill — a different eye.",
      },
      {
        kind: "close",
        title: "붙이기 전에 봅니다",
        body: "핀셋을 들기 전에 흐름부터 읽습니다. 이 순서가 잡히면 디자인이 눈에 띄게 정리됩니다.",
        en: "Read the flow before you pick up the tweezers.",
      },
    ],
  },
  {
    id: "damaged-lash",
    caption: `속눈썹이 상한 것 같다고 하시면.

시술을 쉬어야 하는 때가 있습니다.
그 말씀을 드리는 것도 기술이라고 생각합니다.

Sometimes the answer is to stop for a while.`,
    hashtags: ["#속눈썹연장", "#고객관리", "#속눈썹교육", "#lashartist", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "72", title: "속눈썹이\n상한 것 같다면", subtitle: "쉬어가야 할 때를 아는 것", en: "Knowing when to pause" },
      { kind: "point", title: "무게가 원인인 경우", body: "손님 속눈썹 굵기에 비해 붙인 것이 무거우면, 잘 붙어 있어도 원래 속눈썹이 먼저 빠집니다.", en: "Too heavy, and the natural lash gives out first." },
      { kind: "point", title: "떼는 과정도 봅니다", body: "제거를 서두르면 붙어 있던 것보다 더 많이 상합니다. 시간을 들이는 게 결국 빠릅니다.", en: "Rushing removal costs more than it saves." },
      { kind: "point", title: "쉬자고 말씀드리기", body: "이번에는 가볍게 가거나 한 텀 쉬자고 하면 매출은 줄어듭니다. 대신 그 손님은 오래 오십니다.", en: "Suggesting a break costs today. It keeps the client." },
      { kind: "point", title: "돌아오는 시간이 있습니다", body: "속눈썹도 자라는 주기가 있습니다. 한 바퀴 돌 시간을 주면 다시 붙일 수 있는 상태가 됩니다.", en: "Give it one growth cycle." },
      { kind: "close", title: "말리는 것도 일입니다", body: "해드리는 것만 서비스가 아닙니다. 지금은 안 된다고 말씀드릴 수 있어야 다음이 있습니다.", en: "Saying not now is part of the work." },
    ],
  },
  {
    id: "retouch-cycle",
    caption: `언제 오시면 되나요.

정해진 날짜보다 상태로 말씀드리는 편입니다.
사람마다 자라는 속도가 달라서입니다.

When should I come back? It depends on how yours grow.`,
    hashtags: ["#속눈썹연장", "#고객관리", "#유지력", "#lashartist", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "80", title: "언제 오시면\n되나요", subtitle: "날짜보다 상태로", en: "When to come back" },
      { kind: "point", title: "자라면 벌어집니다", body: "붙일 때 뿌리에서 띄운 간격이, 속눈썹이 자라면서 점점 커집니다. 이 간격이 눈에 띄면 그때가 시점입니다.", en: "The gap you left at the root grows with the lash." },
      { kind: "point", title: "사람마다 다릅니다", body: "같은 날 같은 디자인을 해도 어떤 분은 3주, 어떤 분은 4주 넘게 가십니다. 자라는 속도와 생활이 다르기 때문입니다.", en: "Same set, different timing. Growth and lifestyle differ." },
      { kind: "point", title: "너무 늦게 오시면", body: "남아 있는 것이 적으면 리터치가 아니라 새로 하는 일이 됩니다. 시간도 비용도 더 듭니다.", en: "Come too late and it is not a retouch anymore." },
      { kind: "point", title: "너무 자주 오셔도", body: "아직 튼튼한 것을 떼고 다시 붙이면 손님 속눈썹이 손해를 봅니다. 기다리는 것도 관리입니다.", en: "Too often and the natural lash pays for it." },
      { kind: "close", title: "기록이 답을 줍니다", body: "이 손님이 몇 주에 어땠는지 적어두면 두 번째부터는 정확해집니다. 물어보실 때 근거 있게 말씀드릴 수 있습니다.", en: "Write it down once and the second answer is exact." },
    ],
  },
  {
    id: "crew-life",
    caption: `크루로 일한다는 것.

같은 기준으로 시술하는 사람이 여럿이면
기술이 저 하나로 끝나지 않습니다.

Working as a crew — the standard outlives one pair of hands.`,
    hashtags: ["#위닛크루", "#속눈썹교육", "#래쉬아티스트", "#lasheducation", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "20", title: "크루로\n일한다는 것", subtitle: "기준을 나눠 가진 사람들", en: "What it means to work as a crew" },
      { kind: "point", title: "같은 말을 씁니다", body: "간격, 방향, 띄우는 거리를 같은 이름으로 부릅니다. 말이 같으면 서로 봐줄 수 있습니다.", en: "Same words for the same things. Then you can check each other." },
      { kind: "point", title: "혼자 판단하지 않습니다", body: "애매한 케이스를 사진 찍어 물어봅니다. 혼자 고민하다 잘못 가는 것보다 훨씬 빠릅니다.", en: "Send a photo, ask. Faster than guessing alone." },
      { kind: "point", title: "잘된 것을 나눕니다", body: "누가 좋은 방법을 찾으면 다음 주에 모두가 씁니다. 혼자였으면 그 사람만 알고 끝났을 것입니다.", en: "One person's discovery becomes everyone's next week." },
      { kind: "point", title: "손님이 알아봅니다", body: "어느 원장님께 가도 비슷한 결과가 나오면 그게 브랜드가 됩니다. 사람이 아니라 기준을 믿게 됩니다.", en: "When any of us gives the same result, that becomes the brand." },
      { kind: "close", title: "혼자보다 멀리", body: "제 기술이 저에게서 끝나면 아무것도 아닙니다. 나눠 가진 사람이 많아질수록 오래갑니다.", en: "A technique that stops with me is worth nothing." },
    ],
  },
  {
    id: "what-they-ask",
    caption: `배우러 오시는 분들이 가장 많이 묻는 것.

기술이 아니라 대부분 이 질문입니다.
"제 손이 느린데 괜찮을까요."

The most common question from students is not about technique.`,
    hashtags: ["#속눈썹교육", "#래쉬아티스트", "#원장님공부", "#lashtraining", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "38", textTop: true, title: "가장 많이\n묻는 질문", subtitle: "기술 이야기가 아닙니다", en: "The question they actually ask" },
      { kind: "point", title: "손이 느린데 괜찮을까요", body: "느린 게 문제가 아니라 왜 느린지가 중요합니다. 순서가 없어서 느린 것과, 꼼꼼해서 느린 것은 다릅니다.", en: "Slow is not the problem. Not knowing why is." },
      { kind: "point", title: "나이가 많은데요", body: "늦게 시작하신 분들이 오히려 오래 하십니다. 배운 대로 하시고, 습관이 덜 굳어 있어서입니다.", en: "Later starters often last longer." },
      { kind: "point", title: "샵이 작은데요", body: "규모보다 기준이 있는지가 손님을 부릅니다. 자리 하나로 4주를 만드는 원장님을 여럿 봤습니다.", en: "Standards bring people back. Not square meters." },
      { kind: "point", title: "이미 배웠는데 또", body: "다시 배우러 오시는 게 부끄러운 일이 아닙니다. 어디가 흔들리는지 알고 오시는 분이 제일 빨리 늡니다.", en: "Coming back to relearn is not a step backward." },
      { kind: "close", title: "묻는 순간 시작입니다", body: "이 질문을 하신다는 건 이미 자기 시술을 들여다보고 계신 겁니다. 거기서부터 달라집니다.", en: "Asking means you are already looking at your own work." },
    ],
  },
  {
    id: "making-product",
    caption: `제품을 만든다는 것.

가르치다 보니 필요해서 만들었습니다.
좋은 제품이 없어서가 아니라, 제 수업의 조건에 맞는 게 필요했습니다.

I built the product because my lesson needed one condition.`,
    hashtags: ["#LED속눈썹연장", "#속눈썹글루", "#제품개발", "#ledlash", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "75", textTop: true, title: "제품을\n만든다는 것", subtitle: "가르치다 보니 필요해서", en: "Why teaching led to building" },
      { kind: "point", title: "변수를 줄이려고", body: "같은 내용을 가르쳐도 각자 다른 재료를 쓰면 결과가 갈립니다. 수업에서만이라도 조건을 하나로 두고 싶었습니다.", en: "One less variable in the classroom." },
      { kind: "point", title: "현장에서 나온 요구", body: "책상에서 정한 사양이 아니라 시술하면서 아쉬웠던 것들을 모았습니다. 만드는 사람보다 쓰는 사람의 목록이 깁니다.", en: "The list came from the chair, not the desk." },
      { kind: "point", title: "만들어보면 알게 됩니다", body: "왜 어떤 제품이 그런 성질을 갖는지 이해하게 됩니다. 그러면 다른 제품을 쓸 때도 조건을 읽을 수 있습니다.", en: "Building one teaches you how to read the others." },
      { kind: "point", title: "많이 파는 게 목적은 아닙니다", body: "지금은 수강생 실무를 돕는 쪽으로 운영합니다. 배운 대로 재현이 되는지가 먼저입니다.", en: "It supports the training first." },
      { kind: "close", title: "가르치는 일의 연장", body: "제품도 교육의 일부라고 생각합니다. 재현되지 않으면 배운 게 남지 않습니다.", en: "If it cannot be reproduced, the lesson did not land." },
    ],
  },
  {
    id: "press-story",
    caption: `기사가 나왔습니다.

혼자 하는 일이 아니라 방향이 있는 일이라는 걸
밖에서 먼저 정리해 주셨습니다.

Covered in the press — someone outside put it into words first.`,
    hashtags: ["#위닛아이디자인", "#케이뷰티", "#속눈썹교육", "#kbeauty", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "12", photoPosition: "top", title: "기사가\n나왔습니다", subtitle: "매일경제 · 2026년 8월", en: "In the press, August 2026" },
      { kind: "point", title: "시술 브랜드가 아니라", body: "위닛 아이디자인을 교육과 제품, 콘텐츠와 살롱을 잇는 브랜드로 키운다는 계획이 실렸습니다.", en: "Not a treatment brand. A system that links education, product, and salon." },
      { kind: "point", title: "밖에서 보면 정리됩니다", body: "안에서는 하루하루 하던 일인데, 기사로 읽으니 하나의 방향으로 보였습니다.", en: "From inside it was daily work. From outside it had a shape." },
      { kind: "point", title: "일본과 상하이", body: "가까운 시장부터 기준이 통하는지 확인하고 넓혀갈 계획입니다. 기술만 나가는 게 아니라 교육이 먼저 갑니다.", en: "Japan and Shanghai first. Education goes before the salon." },
      { kind: "close", title: "같이 갈 분들을 찾습니다", body: "혼자 나가는 것보다 크루로 나가는 편이 멀리 갑니다. 준비하고 계신 분들과 함께하고 싶습니다.", en: "Going as a crew, not alone." },
    ],
  },
  {
    id: "why-continue",
    caption: `왜 계속하냐고 물으시면.

잘 나왔다고 사진 보내주시는 원장님들 때문입니다.
제 손에서 끝났으면 못 봤을 결과입니다.

Why I keep going — photos from artists I taught.`,
    hashtags: ["#속눈썹교육", "#래쉬아티스트", "#위닛크루", "#lasheducator", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "31", textTop: true, title: "왜 계속\n하냐고 물으시면", subtitle: "제 손에서 끝나지 않아서", en: "Why I keep going" },
      { kind: "point", title: "하루에 받는 손님은 정해져 있습니다", body: "제가 아무리 열심히 해도 하루에 만날 수 있는 분은 몇 분입니다. 손이 두 개라 그렇습니다.", en: "Two hands, a fixed number of clients a day." },
      { kind: "point", title: "가르치면 늘어납니다", body: "제가 가르친 원장님이 각자 자리에서 시술하시면, 제 기준이 닿는 손님이 그만큼 늘어납니다.", en: "Teach one, and the standard reaches many more chairs." },
      { kind: "point", title: "사진이 옵니다", body: "잘 나왔다고 보내주시는 사진을 보면 그날의 피로가 사라집니다. 제일 좋은 순간입니다.", en: "They send photos when it works. Best part of the job." },
      { kind: "close", title: "오래 남는 쪽으로", body: "기술은 사람이 그만두면 같이 사라집니다. 나눠 가진 사람이 많으면 남습니다.", en: "A technique dies with one person. Shared, it stays." },
    ],
  },
  {
    id: "lamp-care",
    caption: `램프도 나이를 먹습니다.

같은 자리에서 같은 시간을 비췄는데 예전 같지 않다면
손보다 램프를 먼저 보실 때입니다.

Lamps age. Same distance, same time, different result.`,
    hashtags: ["#LED속눈썹연장", "#속눈썹교육", "#유지력", "#ledlash", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "44", title: "램프도\n나이를 먹습니다", subtitle: "예전 같지 않다고 느낄 때", en: "Lamps age too" },
      { kind: "point", title: "렌즈가 흐려집니다", body: "시술하면서 글루 성분이 미세하게 튑니다. 눈에 잘 안 보여도 빛이 지나가는 길이 조금씩 가려집니다.", en: "Residue builds on the lens, quietly." },
      { kind: "point", title: "닦는 것도 순서가 있습니다", body: "마른 천으로 문지르면 흠집이 납니다. 흠집도 빛을 흩습니다. 부드러운 천으로 결을 따라 닦습니다.", en: "Scratches scatter light as much as residue does." },
      { kind: "point", title: "광량은 서서히 떨어집니다", body: "고장이 나서 멈추는 게 아니라 조금씩 약해집니다. 그래서 알아차리기 어렵고, 손이 문제인 줄 알게 됩니다.", en: "It fades gradually, so you blame your hands." },
      { kind: "point", title: "기준을 하나 정해두세요", body: "같은 조건에서 굳는 시간이 예전보다 길어졌다면 신호입니다. 감으로 넘기지 말고 적어두면 보입니다.", en: "If cure time creeps up under the same setup, that is your signal." },
      { kind: "close", title: "도구도 관리 대상입니다", body: "재료와 손만 보지 말고 도구도 같이 봅니다. 셋 중 하나만 흔들려도 결과는 흔들립니다.", en: "Material, hands, tools. All three." },
    ],
  },
  {
    id: "choosing-curl",
    caption: `컬을 고를 때 무엇을 보시나요.

유행하는 컬보다 이 손님 눈에 남는 컬이 있습니다.
같은 컬도 눈매에 따라 완전히 다르게 보입니다.

The same curl reads differently on every eye.`,
    hashtags: ["#속눈썹연장", "#눈매디자인", "#속눈썹교육", "#lashdesign", "#koreanlash"],
    slides: [
      { kind: "cover", photo: "41", textTop: true, title: "컬을 고를 때\n무엇을 보나", subtitle: "유행보다 이 눈에 남는 것", en: "Choosing the curl" },
      { kind: "point", title: "눈꺼풀이 먼저입니다", body: "눈두덩이 두툼한 분께 강한 컬을 넣으면 뿌리가 눌려 보입니다. 정면에서는 예쁜데 옆에서 보면 답답합니다.", en: "A heavy lid presses a strong curl down." },
      { kind: "point", title: "자라는 방향을 봅니다", body: "아래를 향해 자라는 눈에는 컬을 세워도 금방 내려옵니다. 컬 세기보다 방향을 먼저 잡아야 오래갑니다.", en: "If it grows downward, direction beats curl strength." },
      { kind: "point", title: "눈매 길이와 균형", body: "눈이 길면 가운데를 세우고, 짧으면 뒤쪽에 힘을 줍니다. 같은 컬로도 눈매 인상이 달라집니다.", en: "Where you put the strength changes the shape." },
      { kind: "point", title: "손님 생활도 변수입니다", body: "안경을 쓰시는 분은 컬이 렌즈에 닿습니다. 매일 눌리면 아무리 잘 잡아도 무너집니다.", en: "Glasses press the curl every day." },
      { kind: "close", title: "유행은 참고입니다", body: "요즘 뭐가 유행이냐는 질문을 자주 받습니다. 참고는 하되 이 눈에 남는 것을 고르는 게 먼저입니다.", en: "Trends are a reference, not the answer." },
    ],
  },
];

/** 큐에서 n번째 글. 범위를 넘으면 null */
export function postAt(index: number): Post | null {
  return POSTS[index] ?? null;
}
