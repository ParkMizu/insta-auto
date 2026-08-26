/* eslint-disable @next/next/no-img-element --
 * 여기 이미지는 /api/slide가 그때그때 그려내는 PNG다. next/image로 감싸면
 * 이미 만들어진 PNG를 Vercel이 한 번 더 최적화하면서 비용만 늘고 얻는 게 없다.
 * 미리보기 전용 화면이라 LCP도 신경 쓸 대상이 아니다.
 */
/**
 * 미리보기 화면 — 원장님이 결과를 눈으로 확인하는 곳이다.
 *
 * 위: 피드에 깔렸을 때의 모습 (인스타 프로필처럼 3열)
 * 아래: 글마다 캐러셀 전체를 옆으로 넘겨보는 영역
 */
import { BRAND } from "@/content/brand";
import { schedule } from "@/lib/queue";

export const metadata = { title: "피드 미리보기" };

function slideUrl(postId: string, index: number) {
  return `/api/slide/${postId}/${index}`;
}

export default function PreviewPage() {
  const queue = schedule();

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">피드 미리보기</h1>
        <p className="mt-3 text-neutral-500">
          {BRAND.handle} · 캐러셀 {queue.length}개가 큐에 있습니다. 매일 오전 8시에
          위에서부터 하나씩 나갑니다. {queue.length ? `첫 글은 ${queue[0].date}, 마지막은 ${queue[queue.length - 1].date}입니다.` : ""}
        </p>
      </header>

      <section className="mb-16">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
          프로필에서 보이는 모습
        </h2>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-neutral-100 p-1">
          {queue.map(({ post }) => (
            <a
              key={post.id}
              href={`#${post.id}`}
              className="relative block aspect-[4/5] overflow-hidden bg-neutral-200"
            >
              {/* 표지(0번)가 곧 피드 썸네일이다 */}
              <img
                src={slideUrl(post.id, 0)}
                alt={post.id}
                className="h-full w-full object-cover"
              />
            </a>
          ))}
          {/* 큐가 9칸을 못 채우면 빈 자리를 보여줘서 얼마나 더 필요한지 눈에 띄게 한다 */}
          {Array.from({ length: Math.max(0, 9 - queue.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex aspect-[4/5] items-center justify-center bg-neutral-50 text-xs text-neutral-300"
            >
              비어 있음
            </div>
          ))}
        </div>
      </section>

      {queue.map(({ post, date }, order) => (
        <section key={post.id} id={post.id} className="mb-20 scroll-mt-8">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold">
              {order + 1}번째 · {date} 오전 8시 · {post.slides.length}장
            </h2>
            <code className="text-xs text-neutral-400">{post.id}</code>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3">
            {post.slides.map((_, i) => (
              <img
                key={i}
                src={slideUrl(post.id, i)}
                alt={`${post.id} ${i + 1}`}
                className="w-56 shrink-0 rounded-md border border-neutral-200"
              />
            ))}
          </div>

          <div className="mt-5 rounded-lg bg-neutral-50 p-5">
            <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-700">
              {post.caption}
            </p>
            <p className="mt-4 text-sm text-blue-600">{post.hashtags.join(" ")}</p>
          </div>
        </section>
      ))}
    </main>
  );
}
