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
  /** 4:5로 자를 때 남길 부분. 얼굴이나 눈이 잘리면 조정한다 */
  photoPosition?: "top" | "center" | "bottom";
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
  /** 해시태그. 한국어와 영어를 섞어야 해외에도 걸린다 */
  hashtags: string[];
  slides: Slide[];
}

export const POSTS: Post[] = [
  {
    id: "led-distance",
    caption: `LED 글루가 안 굳는다고 램프를 바꾸기 전에.

거리를 재보셨나요?

램프를 몇 센티 떨어뜨리느냐가 유지력을 바꿉니다.
LED 교육에서 가장 먼저 잡는 기준입니다.

Before you blame the lamp — did you measure the distance?`,
    hashtags: [
      "#LED속눈썹연장", "#LED래쉬", "#속눈썹연장", "#속눈썹교육", "#유지력",
      "#ledlash", "#lashextensions", "#lashtraining", "#koreanlash", "#lashtech",
    ],
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
    id: "hybrid-order",
    caption: `연장 먼저냐 펌 먼저냐, 정답이 하나는 아닙니다.

펌을 먼저 가는 방식에도 분명한 장점이 있습니다.
다만 시술 뒤 관리 과정에서 컬이 돌아오는 일이 생기고,
펌 약이 손님 속눈썹에 무엇을 남기는지 모른 채 하면 유지력이 먼저 떨어집니다.

제가 순서를 나눠 쓰는 건 기술이 좋아서가 아니라,
같은 손님을 3주 뒤에 다시 보면서 알게 된 것들 때문입니다.

Neither order is wrong. What changes is what happens after.`,
    hashtags: [
      "#연장후펌", "#하이브리드래쉬", "#속눈썹펌", "#속눈썹연장", "#속눈썹교육",
      "#hybridlash", "#lashlift", "#lashextensions", "#koreanlash", "#lashtraining",
    ],
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
    hashtags: [
      "#속눈썹연장", "#속눈썹교육", "#래쉬아티스트", "#뷰티창업", "#원장님공부",
      "#lashartist", "#lashtraining", "#koreanlash", "#eyelashextensions", "#lashtech",
    ],
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
    hashtags: [
      "#연장후펌", "#리프텐션", "#하이브리드래쉬", "#속눈썹연장", "#속눈썹펌",
      "#liftensions", "#hybridlash", "#lashlift", "#koreanlash", "#lashextensions",
    ],
    slides: [
      {
        kind: "cover",
        photo: "17",
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
    hashtags: [
      "#LED속눈썹연장", "#속눈썹글루", "#속눈썹교육", "#제품개발", "#래쉬아티스트",
      "#ledlash", "#lashadhesive", "#lashtraining", "#koreanlash", "#lashtech",
    ],
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
    hashtags: [
      "#LED속눈썹연장", "#연장후펌", "#하이브리드래쉬", "#속눈썹교육", "#유지력",
      "#ledlash", "#hybridlash", "#lashlift", "#koreanlash", "#lashtraining",
    ],
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
    hashtags: [
      "#속눈썹교육", "#LED속눈썹연장", "#래쉬아티스트", "#원장님공부", "#위닛크루",
      "#lasheducation", "#lashtraining", "#koreanlash", "#lashartist", "#weneedcrew",
    ],
    slides: [
      {
        kind: "cover",
        photo: "39",
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
    hashtags: [
      "#속눈썹대회", "#래쉬아티스트", "#속눈썹교육", "#월드래쉬컵", "#선수지도",
      "#lashcompetition", "#lashartist", "#lashtraining", "#koreanlash", "#lasheducator",
    ],
    slides: [
      {
        kind: "cover",
        photo: "40",
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
    hashtags: [
      "#속눈썹연장", "#속눈썹교육", "#뷰티창업", "#고객관리", "#래쉬아티스트",
      "#lashartist", "#lashconsultation", "#koreanlash", "#beautybusiness", "#lashtraining",
    ],
    slides: [
      {
        kind: "cover",
        photo: "49",
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
        photo: "80",
        title: "한국 속눈썹은\n무엇이 다른가",
        subtitle: "해외에서 가장 많이 묻는 질문",
        en: "What makes Korean lash different",
      },
      {
        kind: "point",
        title: "손님 속눈썹을 먼저 봅니다",
        body: "디자인을 정해두고 거기에 속눈썹을 맞추는 게 아니라, 손님 속눈썹을 보고 가능한 디자인을 정합니다.",
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
        body: "끝난 직후 사진이 아니라 3주 뒤 모습으로 판단합니다. 그래서 오래 가게 만드는 법이 기본 과정에 들어갑니다.",
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
  {
    id: "judge-view",
    tone: "deep",
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
        body: "속눈썹 사이 간격, 뿌리에서 띄운 거리, 방향이 고른가. 이 셋이 흔들리면 아무리 예쁜 디자인도 점수가 깎입니다.",
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
    id: "one-technique-far",
    tone: "deep",
    caption: `기술 하나를 어디까지 끌고 갈 수 있을까요.

시술 메뉴에서 끝내면 유행이 지나면 사라집니다.
교육하고, 제품으로 만들고, 대회 기준까지 세우면 분야가 됩니다.

Technique → Education → Product → Competition → Contents → Branding`,
    hashtags: [
      "#뷰티창업", "#속눈썹교육", "#브랜딩", "#래쉬아티스트", "#원장님공부",
      "#beautybusiness", "#lasheducator", "#lashartist", "#koreanlash", "#branding",
    ],
    slides: [
      {
        kind: "cover",
        photo: "01",
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
    id: "why-korean-lift",
    caption: `노글루 리프트를 왜 "한국식"이라고 부르는가.

2018년부터 전국을 돌며 가르쳤습니다.
밖에서 배운 방식을 그대로 쓰면 한국 손님 속눈썹에서는 결과가 달랐기 때문입니다.

Why we call it the Korean method — the hair itself is different.`,
    hashtags: [
      "#속눈썹펌", "#래쉬리프트", "#노글루", "#속눈썹교육", "#래쉬아티스트",
      "#lashlift", "#noglue", "#koreanlash", "#lashtraining", "#lashartist",
    ],
    slides: [
      {
        kind: "cover",
        photo: "03",
        title: "왜 한국식\n노글루인가",
        subtitle: "2018년부터 전국을 돌며 가르친 이유",
        en: "Why the Korean no-glue method exists",
      },
      {
        kind: "point",
        title: "속눈썹부터 다릅니다",
        body: "한국 사람 속눈썹은 굵고 곧게 자라는 경우가 많습니다. 밖에서 쓰던 시간과 약을 그대로 쓰면 컬이 덜 잡히거나 반대로 상합니다.",
        en: "Straighter, thicker hair does not respond to imported timing.",
      },
      {
        kind: "point",
        title: "방향이 먼저입니다",
        body: "컬을 얼마나 세우느냐보다 어느 방향으로 눕히느냐가 인상을 만듭니다. 눈매에 따라 같은 컬도 다르게 보입니다.",
        en: "Direction shapes the impression more than curl strength.",
      },
      {
        kind: "point",
        title: "손상 관리가 기술입니다",
        body: "한 번 잘 나온 컬보다 다음에 오실 때까지 속눈썹이 버텨주는 게 중요합니다. 속눈썹 상태에 따라 시간과 약을 나누는 기준이 필요합니다.",
        en: "What matters is whether the lash survives until the next visit.",
      },
      {
        kind: "close",
        title: "제품까지 만들었습니다",
        body: "현장에서 쌓인 데이터로 한국인의 속눈썹 특성을 반영한 펌제 공동 개발에 참여했습니다.",
        en: "Co-developed a lift solution built for Korean lashes.",
      },
    ],
  },
  {
    id: "to-shanghai",
    tone: "deep",
    caption: `청담에서 시작해서 어디까지 갈 수 있을까요.

기술과 교육, 제품과 살롱을 하나로 묶어
일본과 상하이를 시작으로 넓혀가고 있습니다.

From Cheongdam to Shanghai — technique, education, product, salon as one.`,
    hashtags: [
      "#위닛아이디자인", "#속눈썹교육", "#케이뷰티", "#뷰티창업", "#래쉬아티스트",
      "#kbeauty", "#lasheducation", "#koreanlash", "#lashartist", "#weneed",
    ],
    slides: [
      {
        kind: "cover",
        photo: "15",
        title: "청담에서\n상하이까지",
        subtitle: "기술 하나로 어디까지 갈 수 있는가",
        en: "From Cheongdam to Shanghai",
      },
      {
        kind: "point",
        title: "기사가 먼저 알렸습니다",
        body: "위닛 아이디자인을 시술 브랜드가 아니라 교육·제품·콘텐츠와 살롱을 잇는 브랜드로 키운다는 계획이 매일경제에 실렸습니다.",
        en: "The plan was covered before it was finished.",
      },
      {
        kind: "point",
        title: "네 가지를 함께 가져갑니다",
        body: "기술만 수출하면 한 번으로 끝납니다. 기술과 교육, 제품과 살롱 운영을 같이 묶어야 현지에서 굴러갑니다.",
        en: "Technique alone travels once. A system travels further.",
      },
      {
        kind: "point",
        title: "교육이 먼저 갑니다",
        body: "현지 아티스트가 같은 기준으로 시술할 수 있어야 브랜드가 유지됩니다. 그래서 살롱보다 교육이 앞섭니다.",
        en: "Education goes first, then the salon.",
      },
      {
        kind: "point",
        title: "일본과 상하이부터",
        body: "가까운 시장에서 기준이 통하는지 먼저 확인하고, 동남아까지 넓혀갈 계획입니다.",
        en: "Japan and Shanghai first, then Southeast Asia.",
      },
      {
        kind: "close",
        title: "함께 갈 원장님을 찾습니다",
        body: "혼자 나가는 것보다 크루로 나가는 편이 멀리 갑니다. 위닛 크루에서 같이 준비하고 있습니다.",
        en: "We are going as a crew, not alone.",
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
];

/** 큐에서 n번째 글. 범위를 넘으면 null */
export function postAt(index: number): Post | null {
  return POSTS[index] ?? null;
}
