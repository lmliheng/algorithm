/**
 * 生成站点图标（浏览器标签页 / PWA / iOS 主屏）。
 *
 *   node site/scripts/icons.ts        （npm run site:icons）
 *
 * 图标是手写几何 + 自己光栅化，不依赖任何图形库：所有坐标都写在 64×64 的
 * 设计方格里，再按 4×4 超采样画成 PNG。产物落在 site/docs/public/，是要
 * 入库的静态资源；改了设计重跑一次即可。favicon.svg 是手写的，不在这里生成。
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { deflateSync } from 'node:zlib'
import { PUBLIC_DIR } from './lib/config.ts'

/** 设计稿边长，下面所有坐标都在这个方格里 */
const DESIGN = 64
/** 抗锯齿用的超采样倍数（每个输出像素 SS×SS 个子样本） */
const SS = 4

type Rgb = readonly [number, number, number]

/** 底色渐变：上浅下深，整体是站点主题的那抹蓝 */
const GRADIENT_TOP: Rgb = [0x4a, 0x6b, 0xd6]
const GRADIENT_BOTTOM: Rgb = [0x2b, 0x43, 0x96]
/** 圆角方块的外框（留一点透明边距） */
const TILE = { x: 2, y: 2, w: 60, h: 60, r: 14 }
/** 三根从矮到高的柱子，底边对齐在 y = 46 */
const BARS = [
  { x: 11.5, y: 32, w: 9, h: 14 },
  { x: 27.5, y: 24, w: 9, h: 22 },
  { x: 43.5, y: 16, w: 9, h: 30 },
]

interface Variant {
  file: string
  size: number
  /** 铺满整块、不透明：iOS 主屏和 PWA maskable 用它，让系统自己去切圆角 */
  fullBleed: boolean
  /** 图形相对默认大小的缩放，铺满时缩小一点留出安全区 */
  glyphScale: number
}

const VARIANTS: Variant[] = [
  { file: 'icon-192.png', size: 192, fullBleed: false, glyphScale: 1 },
  { file: 'icon-512.png', size: 512, fullBleed: false, glyphScale: 1 },
  { file: 'apple-touch-icon.png', size: 180, fullBleed: true, glyphScale: 0.86 },
  { file: 'icon-maskable-512.png', size: 512, fullBleed: true, glyphScale: 0.72 },
]

/** ico 里塞几张位图（PNG 负载的 ico，Vista 之后的系统都认） */
const ICO_SIZES = [16, 32, 48]

/** 圆角矩形的有符号距离场：小于 0 表示点在图形内部。 */
function sdRoundRect(x: number, y: number, box: { x: number; y: number; w: number; h: number; r: number }): number {
  const halfW = box.w / 2
  const halfH = box.h / 2
  const radius = Math.min(box.r, halfW, halfH)
  const qx = Math.abs(x - (box.x + halfW)) - (halfW - radius)
  const qy = Math.abs(y - (box.y + halfH)) - (halfH - radius)
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - radius
}

/** 把柱子按比例绕中心缩放。 */
function barsAt(scale: number): { x: number; y: number; w: number; h: number; r: number }[] {
  const center = DESIGN / 2
  return BARS.map((bar) => ({
    x: center + (bar.x - center) * scale,
    y: center + (bar.y - center) * scale,
    w: bar.w * scale,
    h: bar.h * scale,
    r: (bar.w / 2) * scale,
  }))
}

/** 一个子采样点的颜色，返回 [r, g, b, a]。 */
function sample(x: number, y: number, variant: Variant): [number, number, number, number] {
  const insideTile = variant.fullBleed || sdRoundRect(x, y, TILE) <= 0
  if (!insideTile) return [0, 0, 0, 0]

  for (const bar of barsAt(variant.glyphScale)) {
    if (sdRoundRect(x, y, bar) <= 0) return [255, 255, 255, 1]
  }

  const t = y / DESIGN
  return [
    Math.round(GRADIENT_TOP[0] + (GRADIENT_BOTTOM[0] - GRADIENT_TOP[0]) * t),
    Math.round(GRADIENT_TOP[1] + (GRADIENT_BOTTOM[1] - GRADIENT_TOP[1]) * t),
    Math.round(GRADIENT_TOP[2] + (GRADIENT_BOTTOM[2] - GRADIENT_TOP[2]) * t),
    1,
  ]
}

/** 画一张 size×size 的 RGBA 位图。 */
function raster(variant: Variant): Buffer {
  const { size } = variant
  const unit = DESIGN / size
  const samples = SS * SS
  const rgba = Buffer.alloc(size * size * 4)

  for (let py = 0; py < size; py += 1) {
    for (let px = 0; px < size; px += 1) {
      let r = 0
      let g = 0
      let b = 0
      let alpha = 0
      for (let sy = 0; sy < SS; sy += 1) {
        for (let sx = 0; sx < SS; sx += 1) {
          const [sr, sg, sb, sa] = sample((px + (sx + 0.5) / SS) * unit, (py + (sy + 0.5) / SS) * unit, variant)
          r += sr * sa
          g += sg * sa
          b += sb * sa
          alpha += sa
        }
      }
      const offset = (py * size + px) * 4
      rgba[offset] = alpha > 0 ? Math.round(r / alpha) : 0
      rgba[offset + 1] = alpha > 0 ? Math.round(g / alpha) : 0
      rgba[offset + 2] = alpha > 0 ? Math.round(b / alpha) : 0
      rgba[offset + 3] = Math.round((alpha / samples) * 255)
    }
  }
  return rgba
}

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(buf: Buffer): number {
  let c = 0xffffffff
  for (const byte of buf) c = (CRC_TABLE[(c ^ byte) & 0xff] as number) ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type: string, data: Buffer): Buffer {
  const head = Buffer.alloc(4)
  head.writeUInt32BE(data.length, 0)
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([head, body, crc])
}

/** 最小 PNG 编码器：8 位 RGBA，逐行 filter 0。 */
function encodePng(rgba: Buffer, size: number): Buffer {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // 位深
  ihdr[9] = 6 // 颜色类型：真彩 + alpha
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const stride = size * 4
  const raw = Buffer.alloc((stride + 1) * size)
  for (let y = 0; y < size; y += 1) {
    raw[y * (stride + 1)] = 0 // filter: None
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/** 把若干张 PNG 打包成 .ico。 */
function encodeIco(entries: { size: number; png: Buffer }[]): Buffer {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(entries.length, 4)

  const directory = Buffer.alloc(entries.length * 16)
  let offset = header.length + directory.length
  entries.forEach((entry, index) => {
    const base = index * 16
    directory[base] = entry.size >= 256 ? 0 : entry.size
    directory[base + 1] = entry.size >= 256 ? 0 : entry.size
    directory[base + 2] = 0 // 调色板数量
    directory[base + 3] = 0 // reserved
    directory.writeUInt16LE(1, base + 4) // 色彩平面
    directory.writeUInt16LE(32, base + 6) // 位深
    directory.writeUInt32LE(entry.png.length, base + 8)
    directory.writeUInt32LE(offset, base + 12)
    offset += entry.png.length
  })

  return Buffer.concat([header, directory, ...entries.map((entry) => entry.png)])
}

function main(): void {
  mkdirSync(PUBLIC_DIR, { recursive: true })

  for (const variant of VARIANTS) {
    const png = encodePng(raster(variant), variant.size)
    writeFileSync(path.join(PUBLIC_DIR, variant.file), png)
    console.log(`  ${variant.file}  ${variant.size}×${variant.size}  ${(png.length / 1024).toFixed(1)} KB`)
  }

  const ico = encodeIco(
    ICO_SIZES.map((size) => ({
      size,
      png: encodePng(raster({ file: '', size, fullBleed: false, glyphScale: size <= 16 ? 1.15 : 1 }), size),
    })),
  )
  writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), ico)
  console.log(`  favicon.ico  ${ICO_SIZES.join('/')}  ${(ico.length / 1024).toFixed(1)} KB`)

  console.log(`\n图标已写入 ${PUBLIC_DIR}`)
}

main()
