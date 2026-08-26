/**
 * PIC 폴더의 원본을 캐러셀에서 쓸 수 있는 형태로 바꾼다.
 *
 * 핵심은 회전이다. 폰으로 찍은 사진은 픽셀은 가로로 저장하고 "세로로 돌려서 보라"는
 * 표시(EXIF)만 붙여두는 경우가 많다. 브라우저와 사진 앱은 그 표시를 읽지만
 * 캐러셀을 그리는 satori는 무시해서, 강의실 사진이 옆으로 누운 채 렌더된다.
 * sharp의 rotate()가 그 표시를 실제 픽셀에 적용해준다.
 */
import { readdir, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "/Users/mizu/mizuhome/PIC";
const OUT = "./public/photos";

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC))
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort();

const meta = [];
let n = 0;
for (const f of files) {
  n += 1;
  const id = String(n).padStart(2, "0");
  const out = path.join(OUT, `${id}.jpg`);

  const info = await sharp(path.join(SRC, f))
    .rotate() // EXIF 회전을 픽셀에 적용
    .resize({ width: 1350, height: 1350, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 86 })
    .toFile(out);

  meta.push({ id, w: info.width, h: info.height, landscape: info.width > info.height });
}

const land = meta.filter((m) => m.landscape).map((m) => m.id);
console.log(`${n}장 변환`);
console.log(`가로 ${land.length}장:`, land.join(" "));
await writeFile("./photo-sizes.json", JSON.stringify(meta, null, 2));
