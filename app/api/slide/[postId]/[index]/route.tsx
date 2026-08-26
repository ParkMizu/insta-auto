/**
 * 슬라이드 한 장을 PNG로 내보낸다.
 *
 * 인스타그램은 이미지를 직접 받지 않고 "공개된 주소"를 가져가는 방식이라,
 * 게시할 이미지는 반드시 이렇게 밖에서 열리는 주소여야 한다.
 * 배포되면 https://<도메인>/api/slide/<글id>/<장번호> 가 그 주소가 된다.
 */
import { ImageResponse } from "next/og";
import { BRAND } from "@/content/brand";
import { POSTS } from "@/content/posts";
import { loadKoreanFonts } from "@/lib/og-font";
import { renderSlide, slideTexts } from "@/lib/slides";

/** 인스타가 가져갈 때 매번 그리지 않도록 하루 캐시 */
export const revalidate = 86400;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ postId: string; index: string }> },
) {
  const { postId, index } = await params;

  const post = POSTS.find((p) => p.id === postId);
  if (!post) {
    return new Response("없는 글입니다", { status: 404 });
  }

  const n = Number(index);
  if (!Number.isInteger(n) || n < 0 || n >= post.slides.length) {
    return new Response("없는 슬라이드입니다", { status: 404 });
  }

  const slide = post.slides[n];
  const fonts = await loadKoreanFonts(slideTexts(slide));

  return new ImageResponse(renderSlide(slide, n, post.slides.length, post.tone), {
    width: BRAND.size.width,
    height: BRAND.size.height,
    fonts: fonts.length ? fonts : undefined,
  });
}
