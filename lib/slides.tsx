/**
 * 슬라이드 한 장을 그리는 JSX.
 *
 * next/og(satori)로 PNG가 되기 때문에 일반 CSS가 다 되는 게 아니다.
 *  - flexbox만 된다. grid는 무시된다.
 *  - 자식이 둘 이상인 요소에는 display:flex를 반드시 준다.
 *  - 텍스트에 줄바꿈(\n)을 넣으려면 whiteSpace: "pre-line"이 필요하다.
 *
 * 레이아웃은 세 칸이다: 위(분류·번호) / 가운데(내용) / 아래(영문·서명).
 * 4:5 판에 글이 적으면 가운데가 휑해 보이므로, 가운데 칸이 남는 공간을
 * 전부 먹고 그 안에서 정렬한다. 표지만 아래쪽으로 앉혀 잡지처럼 보이게 했다.
 */
import { BRAND } from "@/content/brand";
import type { Slide } from "@/content/posts";

const { colors: C, type: T, padding: P, size } = BRAND;

function Frame({
  bg,
  top,
  middle,
  bottom,
  align,
}: {
  bg: string;
  top: React.ReactNode;
  middle: React.ReactNode;
  bottom: React.ReactNode;
  /** 가운데 칸에서 내용을 어디에 붙일지 */
  align: "center" | "flex-end";
}) {
  return (
    <div
      style={{
        width: size.width,
        height: size.height,
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        padding: P,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>{top}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: align,
          paddingTop: 48,
          paddingBottom: 48,
        }}
      >
        {middle}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>{bottom}</div>
    </div>
  );
}

/** 골드 짧은 선 — 판을 정리해준다 */
function Rule() {
  return (
    <div
      style={{
        display: "flex",
        width: 96,
        height: 6,
        backgroundColor: C.accent,
      }}
    />
  );
}

/** 하단 서명 줄 — 캡처해서 퍼가도 출처가 남는다 */
function Bottom({
  en,
  enColor,
  footColor,
  page,
}: {
  en?: string;
  enColor: string;
  footColor: string;
  page: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {en ? (
        <div
          style={{
            display: "flex",
            fontSize: T.sub,
            color: enColor,
            lineHeight: 1.5,
            marginBottom: 28,
          }}
        >
          {en}
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: T.caption,
          color: footColor,
        }}
      >
        <div style={{ display: "flex" }}>{BRAND.handle}</div>
        <div style={{ display: "flex" }}>{page}</div>
      </div>
    </div>
  );
}

export function renderSlide(slide: Slide, index: number, total: number) {
  const page = `${index + 1} / ${total}`;

  if (slide.kind === "cover") {
    return (
      <Frame
        bg={C.ink}
        align="flex-end"
        top={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Rule />
            <div
              style={{
                display: "flex",
                fontSize: T.caption,
                letterSpacing: 4,
                color: C.muted,
                marginTop: 28,
              }}
            >
              {BRAND.eyebrow}
            </div>
          </div>
        }
        middle={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: T.hero,
                fontWeight: 700,
                color: C.onInk,
                lineHeight: 1.22,
                whiteSpace: "pre-line",
              }}
            >
              {slide.title}
            </div>
            {slide.subtitle ? (
              <div
                style={{
                  display: "flex",
                  fontSize: T.body,
                  color: C.muted,
                  marginTop: 36,
                }}
              >
                {slide.subtitle}
              </div>
            ) : null}
          </div>
        }
        bottom={
          <Bottom en={slide.en} enColor={C.accent} footColor={C.muted} page={page} />
        }
      />
    );
  }

  if (slide.kind === "point") {
    return (
      <Frame
        bg={C.paper}
        align="center"
        top={
          <div
            style={{
              display: "flex",
              fontSize: T.title,
              fontWeight: 700,
              color: C.accent,
            }}
          >
            {/* 표지를 뺀 번호라서 본문 첫 장이 01이 된다 */}
            {String(index).padStart(2, "0")}
          </div>
        }
        middle={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: T.title,
                fontWeight: 700,
                color: C.onPaper,
                lineHeight: 1.28,
              }}
            >
              {slide.title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: T.body,
                color: C.onPaper,
                lineHeight: 1.62,
                marginTop: 36,
              }}
            >
              {slide.body}
            </div>
          </div>
        }
        bottom={
          <Bottom en={slide.en} enColor={C.muted} footColor={C.muted} page={page} />
        }
      />
    );
  }

  return (
    <Frame
      bg={C.ink}
      align="center"
      top={<Rule />}
      middle={
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: T.title,
              fontWeight: 700,
              color: C.onInk,
              lineHeight: 1.28,
              whiteSpace: "pre-line",
            }}
          >
            {slide.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: T.body,
              color: C.muted,
              lineHeight: 1.62,
              marginTop: 36,
            }}
          >
            {slide.body}
          </div>
        </div>
      }
      bottom={
        <Bottom en={slide.en} enColor={C.accent} footColor={C.muted} page={page} />
      }
    />
  );
}

/** 폰트 서브셋을 받기 위해 슬라이드에 실제로 그려질 글자를 전부 모은다 */
export function slideTexts(slide: Slide): string[] {
  const common = [BRAND.handle, BRAND.eyebrow, "0123456789 /"];
  if (slide.kind === "cover") {
    return [slide.title, slide.subtitle ?? "", slide.en ?? "", ...common];
  }
  return [slide.title, slide.body, slide.en ?? "", ...common];
}
