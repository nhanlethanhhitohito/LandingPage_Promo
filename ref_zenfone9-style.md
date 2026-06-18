---
name: zenfone9-research
description: "Reference notes về cấu trúc trang ASUS Zenfone 9 (nguồn nghiên cứu để tái tạo) — tech stack Nuxt.js, font TTNormsPro/Roboto, 22 section pattern wd__section"
metadata: 
  node_type: memory
  type: project
  originSessionId: c8567caf-e9c4-4fa5-a5f1-61c6f74de7b3
---

# ASUS Zenfone 9 — Research notes (nguồn để tái tạo)

URL gốc: https://www.asus.com/mobile-handhelds/phones/zenfone/zenfone-9/

**Why:** Intern đang nghiên cứu trang ASUS Zenfone 9 để tái tạo lại (giống dự án CASIO microsite trước đó).

**How to apply:** Khi user hỏi tiếp về tái tạo trang, dùng các pattern dưới đây làm reference. Liên kết với [[casio-microsite]].

## Tech stack gốc
- Nuxt.js (Vue SSR), CSS modules (hash suffix kiểu `__xxxxx`)
- Font: **TTNormsProMedium** (primary), **Roboto** (fallback), **ASUS Icons**
- jQuery + custom JS (đoán có IntersectionObserver cho scroll-in animation)
- Slick-style tab (color picker, accessories tab) — class `slick-tab-content`, `slick-nav-btn`, `slick-info-item`

## Pattern section (lặp lại 22 section)
```
<section class="wd__section section__<name>" id="section__<id>">
  <div class="section_content">
    <div class="row">
      <div class="col l12 m12 s12 always__on__top colContent">
        <div class="wd__content wd__content-horz main-content [left|right]-content">
          <div class="content-col content-col-1"><h2 class="content__slogan">CATEGORY</h2></div>
          <div class="content-col content-col-2">
            <h3 class="content__title">Big on ...</h3>
            <div class="content__info info--1">paragraph</div>
            <div class="wd__feature__list">
              <div class="wd__feature feature-1"><div class="wd__feature__data">5.9"</div><div class="wd__feature__describe">one-handed size</div></div>
            </div>
          </div>
          <div class="content-col content-col-3"><h3 class="content__subSlogan">subtitle</h3></div>
        </div>
      </div>
      <div class="col l12 m12 s12 colImg"><!-- image/video --></div>
    </div>
  </div>
</section>
```

## Danh sách 22 section (theo thứ tự)
1. `section__kv` — Hero "Compact Size. BIG POSSIBILITIES."
2. `section__pdc-top` — Gallery 7 ảnh (Nuxt component `product_gallery`)
3. `section__ultra` — Grid 3 cột: Design / Performance / Camera (CTA "Learn more")
4. `section__video` — 2 video YouTube nhúng (lifestyle + product)
5. `section__pdc-bottom` — Awards + reviews + media
6. `section__fit` — Design: 5.9" / 169g
7. `section__sensor` — Side fingerprint sensor
8. `section__zenTouch` — ZenTouch button + video demo
9. `section__color` (id `section__6`) — 4 màu, slick tab + circle SVG
10. `section__IP68` — Water resistance + animation bong bóng (`img__top_bubble`, `img__bottom_bubble`, `pixiPhone`)
11. `section__performance` — Snapdragon 8+ Gen 1, 16GB RAM
12. `section__thermal` — Vapor chamber cooling
13. `section__battery` (theme-black) — 4300 mAh, 30W, animation "back casing biến mất"
14. `section__camera` (id `section__11`) — phone_container với 3 slide-item camera-info (50MP, 12MP, 12MP) overlay
15. `section__gimbal` — Triple video compare (X-ray + with + without)
16. `section__hdr` — Camera modes: sticky-wrap, ảnh waterfall + grid mode (Night, Light Trail, Slow Motion)
17. `section__display` — AMOLED 5.9", Delta-E<1, 112% DCI-P3, 445ppi, HDR10+ icons
18. `section__120hzRefresh` — 120Hz vs 60Hz so sánh
19. `section__sound` (theme-black) — dual speakers + audioWave animation
20. `section__audio` (theme-black) — 3.5mm jack
21. `section__connect` (theme-black) — WiFi 6E + 5G, 2 phone screen-to-screen
22. `section__os` — UI: 3 phone container vertical (Back double-tap, Zoom bar, Tool panel)
23. `section__accessoriesSet` — Connex accessories tab (Black/White set)
24. `section__backpackMount` — Smart Backpack Mount

## Hiệu ứng/animation patterns
- `progressive-image grace-show` — lazy load + fade-in khi vào viewport
- `scroll__containter` — parallax cho ảnh full-bleed
- `always__on__top` — đè z-index lên image background
- `position-ani`, `ani_enter_detect`, `ani_detect` — trigger các keyframe khi enter viewport
- `aniItem` — element tham gia animation timeline (battery section)
- `sticky-wrap` — sticky image cho HDR/camera mode section
- `detect-point detect-point-0/1/2` — multi-step scroll trigger (fit section đổi ảnh theo scroll)
- `pixiPhone` — class gợi ý có dùng **PixiJS** cho animation IP68 water splash
- Video: `progressive-video`, autoplay khi vào viewport, có nút pause/play `video_control_btn`
- Slick tab: click chọn màu/accessories, không auto

## Các "viewpoint" (góc nhìn) phone
- **Hero**: tay phải cầm phone Midnight Black, mặt sau góc 45°
- **Design fit**: 3 ảnh story (subway-pocket, point-at-viewer, selfie-with-dog)
- **Sensor**: clip animation ngón cái chạm cạnh phải
- **Color**: front + back đứng cạnh sample màu, 4 màu (Starry Blue #6c859c, Moonlight White #dcd8d0, Sunset Red #ae4244, Midnight Black #222)
- **Camera**: 2 phone xếp chồng overlay (back + screen), 3 tip-line trỏ vào ống kính
- **Display**: 45° front, screen hiển thị glass building đa màu
- **Connect**: side profile 2 phone screen-to-screen lơ lửng trên vũ trụ
- **UI**: 3 phone đứng trên monitor giả (back double-tap, zoom bar, tool panel)

## Asset CDN
- `https://dlcdnwebimgs.asus.com/gain/<uuid>/w80` (thumbnail)
- `https://dlcdnwebimgs.asus.com/gain/<uuid>/w800` (full)
- Hỗ trợ `webp` qua `<picture><source type="image/webp" srcset="...w800/fwebp">`

## Khuyến nghị tái tạo (tech stack tối giản)
- HTML5 + CSS Grid/Flexbox (không cần Nuxt — dùng static HTML)
- Vanilla JS với IntersectionObserver cho scroll-trigger
- GSAP (nếu cần animation phức tạp) hoặc CSS transitions cho fade/slide
- Swiper.js cho gallery + color tab
- Lazy-load qua `<img loading="lazy">` thay vì base64 placeholder
- Breakpoints: large `l12` (desktop ≥1200px), medium `m12` (tablet 768-1199), small `s12` (mobile <768)
- Container max-width ước lượng: 1280-1400px, padding section dọc ~80-120px

Liên kết: [[casio-microsite]] có cấu trúc tương tự về layout product showcase.
