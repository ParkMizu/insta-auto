/**
 * 캐러셀을 폰으로 옮길 수 있게 파일로 뽑는다.
 *
 * 자동 게시를 붙이기 전에도 오늘부터 올릴 수 있어야 해서 만든 것이다.
 * 폴더 이름 앞의 번호가 곧 올리는 순서이고, 파일 이름 번호가 슬라이드 순서다.
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import { POSTS } from "./content/posts.ts";

const ORIGIN = "http://localhost:3000";
const OUT = "./export";

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

let n = 0;
for (const post of POSTS) {
  n += 1;
  const dir = `${OUT}/${String(n).padStart(2, "0")}-${post.id}`;
  await mkdir(dir, { recursive: true });

  for (let i = 0; i < post.slides.length; i += 1) {
    const res = await fetch(`${ORIGIN}/api/slide/${post.id}/${i}`);
    if (!res.ok) throw new Error(`${post.id} ${i}: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(`${dir}/${String(i + 1).padStart(2, "0")}.png`, buf);
  }

  // 캡션은 그대로 복사해서 붙일 수 있게 해시태그까지 한 파일에 둔다
  await writeFile(
    `${dir}/캡션.txt`,
    `${post.caption}\n\n${post.hashtags.join(" ")}\n`,
    "utf8",
  );
  console.log(`${dir} — 슬라이드 ${post.slides.length}장`);
}
console.log(`\n총 ${n}개 캐러셀`);
