/**
 * 사진의 일부만 잘라 새 번호로 저장한다.
 *
 * 캐러셀에서 확대는 CSS로 안 된다. satori가 background-repeat를 무시해서
 * 배율을 주면 사진이 타일처럼 반복된다. 그래서 파일을 미리 잘라 둔다.
 *
 *   node --experimental-strip-types scripts-crop.mjs 80 81 0.42 0.50 0.62
 *   (원본 80을 81로, 가로 42% 세로 50% 지점을 중심으로 원본 폭의 62%만큼)
 */
import sharp from "sharp";

const [src, dst, cx, cy, scale] = process.argv.slice(2);
const from = `./public/photos/${src}.jpg`;
const to = `./public/photos/${dst}.jpg`;

const img = sharp(from);
const { width, height } = await img.metadata();

// 캐러셀 판과 같은 4:5로 잘라야 나중에 또 잘리지 않는다
let w = Math.round(width * Number(scale));
let h = Math.round(w * 1.25);
if (h > height) { h = height; w = Math.round(h / 1.25); }

let left = Math.round(width * Number(cx) - w / 2);
let top = Math.round(height * Number(cy) - h / 2);
left = Math.max(0, Math.min(left, width - w));
top = Math.max(0, Math.min(top, height - h));

await img.extract({ left, top, width: w, height: h })
  .resize({ width: 1080, height: 1350, fit: "cover" })
  .jpeg({ quality: 88 })
  .toFile(to);

console.log(`${src}.jpg (${width}x${height}) → ${dst}.jpg  잘라낸 영역 ${w}x${h} @ ${left},${top}`);
