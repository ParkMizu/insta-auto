/**
 * 하이라이트 커버를 PNG로 내보낸다.
 *
 * 인스타가 원형으로 자르기 때문에 글자를 판 한가운데 좁은 영역에만 둔다.
 * 스토리 비율(1080×1920)로 뽑아야 스토리에 올릴 때 위아래가 안 잘린다.
 */
import { ImageResponse } from "next/og";
import { BRAND } from "@/content/brand";
import { HIGHLIGHTS } from "@/content/highlights";
import { loadKoreanFonts } from "@/lib/og-font";

export const revalidate = 86400;

const WIDTH = 1080;
const HEIGHT = 1920;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const item = HIGHLIGHTS.find((h) => h.key === key);
  if (!item) return new Response("없는 커버입니다", { status: 404 });

  const fonts = await loadKoreanFonts([item.label, item.sub ?? ""]);

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BRAND.colors.nude,
        }}
      >
        {/* 원형으로 잘려도 남는 가운데 영역 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 72,
              height: 4,
              backgroundColor: BRAND.colors.accent,
              marginBottom: 40,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: item.label.length > 6 ? 88 : 104,
              fontWeight: 700,
              color: BRAND.colors.onNude,
              letterSpacing: 2,
            }}
          >
            {item.label}
          </div>
          {item.sub ? (
            <div
              style={{
                display: "flex",
                fontSize: 34,
                color: BRAND.colors.muted,
                letterSpacing: 6,
                marginTop: 24,
              }}
            >
              {item.sub}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT, fonts: fonts.length ? fonts : undefined },
  );
}
