/**
 * 언제 무엇이 나갈지 정하는 규칙.
 *
 * 상태를 어디에도 저장하지 않는다. "시작일로부터 며칠째인가"로 순서를 계산한다.
 * 그래서 원장님이 미리보기에서 며칠에 무엇이 나가는지 미리 볼 수 있고,
 * 서버가 재시작되거나 배포를 다시 해도 순서가 흐트러지지 않는다.
 *
 * 대신 규칙이 하나 생긴다: **이미 나간 글의 순서를 바꾸지 말 것.**
 * 큐 앞쪽에 글을 끼워 넣으면 그 뒤가 전부 하루씩 밀린다.
 */
import { POSTS, type Post } from "@/content/posts";

/** 첫 글이 나가는 날. 환경변수로 덮을 수 있다 */
const DEFAULT_START = "2026-09-12";

/** 한국 시간 기준 YYYY-MM-DD */
export function seoulDate(at: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(at);
}

function startDate(): string {
  return process.env.QUEUE_START_DATE || DEFAULT_START;
}

/** 두 날짜(YYYY-MM-DD) 사이의 일수 */
function daysBetween(from: string, to: string): number {
  const a = Date.UTC(
    Number(from.slice(0, 4)),
    Number(from.slice(5, 7)) - 1,
    Number(from.slice(8, 10)),
  );
  const b = Date.UTC(
    Number(to.slice(0, 4)),
    Number(to.slice(5, 7)) - 1,
    Number(to.slice(8, 10)),
  );
  return Math.round((b - a) / 86_400_000);
}

export interface Scheduled {
  post: Post;
  /** 큐에서 몇 번째인지 (0부터) */
  index: number;
  /** 나가는 날 (한국 시간 YYYY-MM-DD) */
  date: string;
}

/** 큐 전체의 게시 예정일 */
export function schedule(): Scheduled[] {
  const start = startDate();
  return POSTS.map((post, index) => {
    const d = new Date(`${start}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + index);
    return { post, index, date: seoulDate(d) };
  });
}

/**
 * 주어진 시각에 나가야 할 글.
 * 시작 전이거나 큐를 다 쓰면 null이다.
 */
export function postForDate(at: Date): Scheduled | null {
  const today = seoulDate(at);
  const index = daysBetween(startDate(), today);
  if (index < 0 || index >= POSTS.length) return null;
  return { post: POSTS[index], index, date: today };
}

/** 오늘 이후로 남은 글 수 — 큐가 마르기 전에 알려주기 위한 것 */
export function remaining(at: Date): number {
  const index = daysBetween(startDate(), seoulDate(at));
  return Math.max(0, POSTS.length - Math.max(0, index));
}
