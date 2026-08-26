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
import { PHOTOS } from "@/content/photos";

const { colors: C, type: T, padding: P, size } = BRAND;

function Frame({
  bg,
  photoSrc,
  photoPosition,
  splitPhoto,
  top,
  middle,
  bottom,
  align,
}: {
  bg: string;
  /** 깔면 배경 사진 위에 글이 앉는다 */
  photoSrc?: string;
  photoPosition?: "top" | "center" | "bottom";
  /** 사진을 배경으로 깔지 않고 위쪽에 따로 앉힌다 */
  splitPhoto?: boolean;
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
        ...(photoSrc && !splitPhoto
          ? {
              // 사진 위에 어두운 막을 겹쳐야 글자가 읽힌다. 두 겹을 한 번에 준다.
              backgroundImage: `linear-gradient(to bottom, rgba(20,17,15,0.10) 0%, rgba(20,17,15,0.30) 35%, rgba(20,17,15,0.72) 62%, rgba(20,17,15,0.94) 100%), url(${photoSrc})`,
              backgroundSize: "cover",
              backgroundPosition: photoPosition ?? "center",
            }
          : {}),
      }}
    >
      {/* 가로 사진은 위쪽에 통째로 앉힌다. 잘리는 것보다 낫다 */}
      {photoSrc && splitPhoto ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: Math.round(size.height * 0.52),
            backgroundImage: `url(${photoSrc})`,
            backgroundSize: "cover",
            backgroundPosition: photoPosition ?? "center",
          }}
        />
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
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
            paddingTop: splitPhoto ? 28 : 48,
            paddingBottom: splitPhoto ? 20 : 48,
          }}
        >
          {middle}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>{bottom}</div>
      </div>
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

/** satori는 사진을 절대 주소로만 가져올 수 있다 */
function photoUrl(origin: string, id: string): string {
  return `${origin}/photos/${id}.jpg`;
}

/**
 * 가로 사진을 4:5 판에 꽉 채우면 양옆이 잘린다.
 * 눈이나 손끝 클로즈업은 잘려도 그림이 되지만, 단체 사진이나 공간 사진은
 * 사람과 맥락이 같이 잘려나간다. 그런 사진은 위쪽에 통째로 앉히고 아래를 글자 자리로 쓴다.
 */
function needsSplit(id: string): boolean {
  const meta = PHOTOS.find((p) => p.id === id);
  if (!meta?.landscape) return false;
  return meta.use !== "result" && meta.use !== "craft";
}

export function renderSlide(
  slide: Slide,
  index: number,
  total: number,
  tone: "deep" | "light" = "light",
  origin = "",
) {
  const page = `${index + 1} / ${total}`;
  // 표지와 마무리만 톤을 따른다. 본문은 항상 누드여야 글이 읽힌다.
  // 사진을 깔면 톤과 상관없이 밝은 글자를 쓴다 — 어두운 글자는 사진에 묻힌다.
  const coverPhoto = slide.kind === "cover" ? slide.photo : undefined;
  // 사진을 위쪽에 따로 앉히는 경우 글자는 사진이 아니라 배경색 위에 온다
  const coverSplit = coverPhoto ? needsSplit(coverPhoto) : false;
  const textOnPhoto = Boolean(coverPhoto) && !coverSplit;
  const onDark = tone === "deep" || textOnPhoto;
  const coverBg = onDark ? C.deep : C.nude;
  const coverText = textOnPhoto ? "#FFFFFF" : onDark ? C.onDeep : C.onNude;
  const coverMuted = onDark ? C.mutedOnDeep : C.muted;

  if (slide.kind === "cover") {
    return (
      <Frame
        bg={coverBg}
        photoSrc={slide.photo ? photoUrl(origin, slide.photo) : undefined}
        photoPosition={slide.photoPosition}
        splitPhoto={coverSplit}
        align="flex-end"
        top={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Rule />
            <div
              style={{
                display: "flex",
                fontSize: T.caption,
                letterSpacing: 4,
                color: coverMuted,
                marginTop: 28,
              }}
            >
              {BRAND.eyebrow}
            </div>
          </div>
        }
        middle={
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* 영문이 한글보다 위에 온다. 해외 계정이 스쳐도 주제가 먼저 읽혀야 한다 */}
            {slide.en ? (
              <div
                style={{
                  display: "flex",
                  fontSize: T.heroEn,
                  color: C.accent,
                  letterSpacing: 1,
                  marginBottom: 22,
                }}
              >
                {slide.en}
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                fontSize: T.hero,
                fontWeight: 700,
                color: coverText,
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
                  color: coverMuted,
                  marginTop: 36,
                }}
              >
                {slide.subtitle}
              </div>
            ) : null}
          </div>
        }
        bottom={
          <Bottom enColor={C.accent} footColor={coverMuted} page={page} />
        }
      />
    );
  }

  if (slide.kind === "photo") {
    const hasText = Boolean(slide.title || slide.body);
    return (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: C.deep,
          backgroundImage: `url(${photoUrl(origin, slide.photo)})`,
          backgroundSize: "cover",
          backgroundPosition: slide.position ?? "center",
        }}
      >
        {/* 사진 아래쪽에 어두운 막을 깔아야 흰 글자가 읽힌다 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: P,
            paddingTop: hasText ? 220 : P,
            backgroundImage: hasText
              ? "linear-gradient(to bottom, rgba(20,17,15,0), rgba(20,17,15,0.86))"
              : "linear-gradient(to bottom, rgba(20,17,15,0), rgba(20,17,15,0.55))",
          }}
        >
          {slide.title ? (
            <div
              style={{
                display: "flex",
                fontSize: T.title,
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.28,
                whiteSpace: "pre-line",
              }}
            >
              {slide.title}
            </div>
          ) : null}
          {slide.body ? (
            <div
              style={{
                display: "flex",
                fontSize: T.body,
                color: "#EFE9E3",
                lineHeight: 1.6,
                marginTop: 24,
              }}
            >
              {slide.body}
            </div>
          ) : null}
          {slide.en ? (
            <div
              style={{
                display: "flex",
                fontSize: T.sub,
                color: C.accent,
                marginTop: 24,
              }}
            >
              {slide.en}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: T.caption,
              color: "#CFC6BD",
              marginTop: 32,
            }}
          >
            <div style={{ display: "flex" }}>{BRAND.handle}</div>
            <div style={{ display: "flex" }}>{page}</div>
          </div>
        </div>
      </div>
    );
  }

  if (slide.kind === "point") {
    return (
      <Frame
        bg={C.nude}
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
                color: C.onNude,
                lineHeight: 1.28,
              }}
            >
              {slide.title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: T.body,
                color: C.onNude,
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
      bg={coverBg}
      align="center"
      top={<Rule />}
      middle={
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: T.title,
              fontWeight: 700,
              color: coverText,
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
              color: coverMuted,
              lineHeight: 1.62,
              marginTop: 36,
            }}
          >
            {slide.body}
          </div>
        </div>
      }
      bottom={
        <Bottom en={slide.en} enColor={C.accent} footColor={coverMuted} page={page} />
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
  if (slide.kind === "photo") {
    return [slide.title ?? "", slide.body ?? "", slide.en ?? "", ...common];
  }
  return [slide.title, slide.body, slide.en ?? "", ...common];
}
