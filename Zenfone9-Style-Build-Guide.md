# Hướng dẫn build trang sản phẩm theo phong cách Zenfone 9

> **Áp dụng cho:** Microsite Casio FX-580VN X (BITEX)
> **Tham khảo:** https://www.asus.com/mobile-handhelds/phones/zenfone/zenfone-9/
> **Brief gốc:** Header + body tương tự ASUS/Gigabyte · Footer copy từ BITEX · Màu chủ đạo theo BITEX (xanh dương + trắng)

---

## Mục lục

1. [Tổng quan kiến trúc](#1-tổng-quan-kiến-trúc)
2. [Stack công nghệ](#2-stack-công-nghệ)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [Design tokens (CSS variables)](#4-design-tokens-css-variables)
5. [Header + Sub-nav sticky](#5-header--sub-nav-sticky)
6. [Hero section](#6-hero-section)
7. [Pattern "Big on X" — lõi của trang](#7-pattern-big-on-x--lõi-của-trang)
8. [Awards & Reviews](#8-awards--reviews)
9. [Colors switcher](#9-colors-switcher)
10. [Gallery Swiper](#10-gallery-swiper)
11. [Footer BITEX](#11-footer-bitex)
12. [GSAP + ScrollTrigger animations](#12-gsap--scrolltrigger-animations)
13. [Smooth scroll với Lenis](#13-smooth-scroll-với-lenis)
14. [Responsive breakpoints](#14-responsive-breakpoints)
15. [Tối ưu hiệu năng](#15-tối-ưu-hiệu-năng)
16. [Mapping tính năng FX-580VN X → "Big on X"](#16-mapping-tính-năng-fx-580vn-x--big-on-x)
17. [Sprint plan (9 bước)](#17-sprint-plan-9-bước)
18. [Checklist QA trước khi giao](#18-checklist-qa-trước-khi-giao)

---

## 1. Tổng quan kiến trúc

Trang sẽ có **3 lớp cấu trúc**:

```
┌─────────────────────────────────────┐
│  Header BITEX (xanh đậm, sticky)    │  ← fixed top, 60px
├─────────────────────────────────────┤
│  Sub-nav sản phẩm FX-580VN X        │  ← sticky dưới header, 56px
│  Overview · Specs · Features · ...  │
├─────────────────────────────────────┤
│                                     │
│  Hero (full viewport)               │
│  ────────────────────────           │
│  Awards & Reviews                   │
│  ────────────────────────           │
│  Colors (5 màu)                     │
│  ────────────────────────           │
│  Big on tính toán                   │  ← pattern lặp 8-10 lần
│  Big on bộ nhớ                      │
│  Big on phím bấm                    │
│  Big on pin                         │
│  ...                                │
│  ────────────────────────           │
│  Gallery "Tính bởi FX-580VN X"      │
│                                     │
├─────────────────────────────────────┤
│  Footer BITEX (copy nguyên)         │
└─────────────────────────────────────┘
```

**Nguyên tắc thiết kế:**
- Trắng làm chủ đạo (giống Zenfone 9), xanh BITEX làm điểm nhấn
- Mỗi section "Big on X" alternating background (trắng / xám nhạt)
- Animation reveal khi scroll vào view (không phải khi load page)
- Mobile-first responsive, breakpoint chính ở 768px và 1024px

---

## 2. Stack công nghệ

| Layer | Tool | Lý do |
|---|---|---|
| Markup | HTML5 semantic | `<section id="...">` cho sub-nav active state |
| Style | CSS3 thuần (Flexbox + Grid + Custom Properties) | Không cần preprocessor cho dự án này |
| Logic | JavaScript vanilla (ES6+) | Đủ nhẹ, không cần framework |
| Animation | **GSAP 3.x + ScrollTrigger** | Scroll-triggered reveal mượt, count-up number |
| Smooth scroll | **Lenis** (optional) | Smooth scroll giống Zenfone 9 |
| Carousel | **Swiper.js 11** | Gallery "Tính bởi" + Colors |
| Icons | SVG inline hoặc Lucide | Tránh font-awesome nặng |

**CDN setup trong `<head>`:**

```html
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>

<!-- App CSS -->
<link rel="stylesheet" href="css/main.css">
```

**Scripts trước `</body>`:**

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
<script src="js/nav.js"></script>
<script src="js/animations.js"></script>
<script src="js/main.js"></script>
```

---

## 3. Cấu trúc thư mục

```
casio-fx580vnx/
├── index.html
├── css/
│   ├── reset.css          # normalize/reset CSS
│   ├── variables.css      # design tokens (color, font, spacing)
│   ├── base.css           # typography, container, utilities
│   ├── header.css         # header + sub-nav sticky
│   ├── hero.css           # hero section
│   ├── sections.css       # pattern "Big on X"
│   ├── colors.css         # color switcher
│   ├── gallery.css        # Swiper gallery
│   ├── footer.css         # footer BITEX
│   └── main.css           # @import tất cả + responsive
├── js/
│   ├── nav.js             # sticky sub-nav active state
│   ├── animations.js      # GSAP ScrollTrigger
│   └── main.js            # color switcher, swiper init, misc
├── assets/
│   ├── images/
│   │   ├── hero/          # FX-580VN X từ nhiều góc
│   │   ├── features/      # ảnh từng tính năng
│   │   ├── colors/        # 5 màu máy
│   │   └── gallery/       # ảnh demo bài toán
│   ├── icons/
│   │   ├── bitex-logo.svg
│   │   ├── fb.svg, tiktok.svg, yt.svg
│   │   └── gplay.svg, appstore.svg
│   └── fonts/             # nếu self-host
└── README.md
```

---

## 4. Design tokens (CSS variables)

`css/variables.css`:

```css
:root {
  /* ===== Màu BITEX ===== */
  --bitex-blue:        #1B4F9C;
  --bitex-blue-dark:   #0F3D8C;
  --bitex-blue-light:  #E8F0FB;
  --bitex-orange:      #F37021;  /* accent CTA */

  /* ===== Neutrals (theme Zenfone 9) ===== */
  --white:        #FFFFFF;
  --gray-50:      #FAFAFA;
  --gray-100:     #F5F5F5;
  --gray-200:     #E5E7EB;
  --gray-500:     #6B7280;
  --gray-700:     #374151;
  --gray-900:     #1A1A1A;

  /* ===== Typography ===== */
  --font-display: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;

  --fs-hero:      clamp(48px, 8vw, 96px);
  --fs-h2:        clamp(36px, 4vw, 56px);
  --fs-h3:        clamp(24px, 2.5vw, 32px);
  --fs-body:      16px;
  --fs-large:     18px;
  --fs-small:     14px;
  --fs-label:     13px;

  /* ===== Spacing ===== */
  --container:    1280px;
  --gutter:       24px;
  --section-pad:  clamp(60px, 8vw, 120px);

  /* ===== Heights ===== */
  --header-h:     60px;
  --subnav-h:     56px;
  --total-nav:    calc(var(--header-h) + var(--subnav-h));

  /* ===== Radius & Shadow ===== */
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    16px;
  --shadow-sm:    0 1px 3px rgba(0,0,0,.08);
  --shadow-md:    0 4px 12px rgba(0,0,0,.1);
  --shadow-lg:    0 20px 40px rgba(0,0,0,.12);

  /* ===== Easing & Duration ===== */
  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
  --duration:     .3s;
}
```

`css/base.css`:

```css
*,*::before,*::after { box-sizing: border-box }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100% }
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: 1.6;
  color: var(--gray-900);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: var(--fs-small);
  text-decoration: none;
  transition: all var(--duration) var(--ease-out);
  cursor: pointer;
  border: none;
}
.btn-primary { background: var(--bitex-blue); color: #fff }
.btn-primary:hover { background: var(--bitex-blue-dark); transform: translateY(-2px) }
.btn-outline {
  background: transparent;
  color: var(--bitex-blue);
  border: 2px solid var(--bitex-blue);
}
.btn-outline:hover { background: var(--bitex-blue); color: #fff }
```

---

## 5. Header + Sub-nav sticky

### HTML

```html
<!-- Main header -->
<header class="site-header">
  <div class="container header-inner">
    <a href="https://bitex.com.vn" class="logo">
      <img src="assets/icons/bitex-logo.svg" alt="BITEX" height="36"/>
    </a>
    <nav class="main-nav">
      <a href="https://bitex.com.vn">Trang chủ</a>
      <a href="https://bitex.com.vn/vn/san-pham/may-tinh-casio.html">Máy tính Casio</a>
      <a href="#">Văn phòng phẩm</a>
      <a href="#">Tin tức</a>
      <a href="#">Liên hệ</a>
    </nav>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- Product sub-nav -->
<nav class="product-subnav" id="subnav">
  <div class="container subnav-inner">
    <span class="product-name">Casio FX-580VN X</span>
    <ul class="subnav-links">
      <li><a href="#overview" class="active">Overview</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#tech-specs">Tech Specs</a></li>
      <li><a href="#gallery">Gallery</a></li>
      <li><a href="#support">Support</a></li>
    </ul>
    <a href="#buy" class="btn-buy">Mua ngay</a>
  </div>
</nav>
```

### CSS

```css
/* Main header */
.site-header {
  position: fixed; inset: 0 0 auto 0;
  height: var(--header-h);
  background: var(--bitex-blue);
  z-index: 100;
  box-shadow: var(--shadow-sm);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.logo img { display: block }
.main-nav { display: flex; gap: 32px }
.main-nav a {
  color: #fff;
  text-decoration: none;
  font-size: var(--fs-small);
  text-transform: uppercase;
  letter-spacing: .5px;
  transition: opacity var(--duration);
}
.main-nav a:hover { opacity: .8 }

/* Product sub-nav (sticky) */
.product-subnav {
  position: sticky;
  top: var(--header-h);
  height: var(--subnav-h);
  background: rgba(255, 255, 255, .95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--gray-200);
  z-index: 99;
  transition: background var(--duration);
}
.product-subnav.scrolled {
  background: rgba(255, 255, 255, .98);
  box-shadow: var(--shadow-sm);
}
.subnav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.product-name {
  font-weight: 600;
  font-size: var(--fs-body);
  color: var(--gray-900);
}
.subnav-links {
  display: flex;
  gap: 28px;
  list-style: none;
  margin: 0; padding: 0;
}
.subnav-links a {
  color: var(--gray-700);
  text-decoration: none;
  font-size: var(--fs-small);
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: all var(--duration);
}
.subnav-links a.active,
.subnav-links a:hover {
  color: var(--bitex-blue);
  border-bottom-color: var(--bitex-blue);
}
.btn-buy {
  background: var(--bitex-orange);
  color: #fff;
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--fs-small);
  transition: transform var(--duration);
}
.btn-buy:hover { transform: translateY(-2px) }

/* Hamburger (mobile) */
.hamburger {
  display: none;
  background: transparent;
  border: 0;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
}
.hamburger span {
  display: block;
  width: 24px; height: 2px;
  background: #fff;
}
```

### JS (active state khi scroll)

`js/nav.js`:

```js
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.subnav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  },
  { rootMargin: '-50% 0px -50% 0px' }
);

sections.forEach((s) => observer.observe(s));

// Smooth scroll khi click sub-nav
navLinks.forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const offset = 60 + 56; // header + subnav
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth',
      });
    }
  });
});
```

---

## 6. Hero section

### HTML

```html
<section id="overview" class="hero">
  <div class="container hero-inner">
    <p class="hero-label">Casio</p>
    <h1 class="hero-title">FX-580VN X</h1>
    <p class="hero-tagline">
      Compact Power. <strong>BIG POSSIBILITIES.</strong>
    </p>

    <div class="hero-image">
      <img src="assets/images/hero/fx580vnx-main.png" alt="Casio FX-580VN X"/>
    </div>

    <div class="hero-cta">
      <a href="#features" class="btn btn-primary">Khám phá tính năng</a>
      <a href="#buy" class="btn btn-outline">Mua ngay</a>
    </div>
  </div>
</section>
```

### CSS

```css
.hero {
  min-height: 100vh;
  padding-top: var(--total-nav);
  padding-bottom: var(--section-pad);
  background: linear-gradient(180deg, #fff 0%, var(--bitex-blue-light) 100%);
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.hero-inner { width: 100% }

.hero-label {
  font-size: var(--fs-label);
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--bitex-blue);
  margin-bottom: 16px;
}
.hero-title {
  font-size: var(--fs-hero);
  font-weight: 800;
  color: var(--bitex-blue);
  line-height: 1;
  margin: 0;
}
.hero-tagline {
  font-size: clamp(20px, 2.5vw, 32px);
  color: var(--gray-700);
  margin-top: 16px;
  font-weight: 400;
}
.hero-tagline strong { color: var(--gray-900); font-weight: 700 }

.hero-image {
  margin: 60px auto;
  max-width: 500px;
}
.hero-image img { width: 100%; height: auto }

.hero-cta {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}
```

---

## 7. Pattern "Big on X" — lõi của trang

Đây là **template lặp** cho từng tính năng. Mỗi block:
- 2 cột (text trái + ảnh phải), đảo bên bằng class `.reverse`
- Background xen kẽ trắng/xám
- Animation slide-in từ 2 bên khi scroll tới

### HTML — 1 block mẫu

```html
<section id="features" class="big-section">
  <!-- Block 1 -->
  <article class="big-block">
    <div class="container big-inner">
      <div class="big-text">
        <span class="big-label">Tính năng</span>
        <h2 class="big-title">Big on <strong>tính toán</strong></h2>
        <p class="big-desc">
          FX-580VN X tích hợp <strong>521 chức năng</strong>, đáp ứng đầy đủ
          chương trình Toán THCS, THPT và các kỳ thi tốt nghiệp quốc gia.
        </p>
        <ul class="big-metrics">
          <li>
            <span class="num" data-target="521">0</span>
            <span class="unit">chức năng</span>
          </li>
          <li>
            <span class="num" data-target="47">0</span>
            <span class="unit">KB bộ nhớ</span>
          </li>
        </ul>
      </div>
      <div class="big-image">
        <img src="assets/images/features/calc-screen.png" alt="Màn hình hiển thị"/>
      </div>
    </div>
  </article>

  <!-- Block 2 đảo bên -->
  <article class="big-block reverse">
    <div class="container big-inner">
      <div class="big-text">
        <span class="big-label">Thiết kế</span>
        <h2 class="big-title">Big on <strong>độ bền</strong></h2>
        <p class="big-desc">
          Vỏ ABS cao cấp chống va đập, phím bấm bền trên 1 triệu lần nhấn.
        </p>
      </div>
      <div class="big-image">
        <img src="assets/images/features/durability.png" alt="Độ bền"/>
      </div>
    </div>
  </article>
</section>
```

### CSS

```css
.big-section { background: #fff }

.big-block {
  padding: var(--section-pad) 0;
}
.big-block:nth-child(even) { background: var(--gray-50) }

.big-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.big-block.reverse .big-inner {
  grid-template-areas: 'img text';
}
.big-block.reverse .big-text  { grid-area: text }
.big-block.reverse .big-image { grid-area: img }

.big-label {
  display: inline-block;
  font-size: var(--fs-label);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--bitex-blue);
  margin-bottom: 16px;
  font-weight: 600;
}
.big-title {
  font-size: var(--fs-h2);
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  color: var(--gray-900);
}
.big-title strong { color: var(--bitex-blue); font-weight: 700 }

.big-desc {
  font-size: var(--fs-large);
  color: var(--gray-500);
  margin-top: 20px;
  max-width: 480px;
}

.big-metrics {
  list-style: none;
  display: flex;
  gap: 48px;
  margin: 32px 0 0;
  padding: 0;
}
.big-metrics li { display: flex; flex-direction: column }
.big-metrics .num {
  font-size: 48px;
  font-weight: 700;
  color: var(--bitex-blue);
  line-height: 1;
}
.big-metrics .unit {
  font-size: var(--fs-small);
  color: var(--gray-500);
  margin-top: 4px;
}

.big-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

---

## 8. Awards & Reviews

### HTML

```html
<section class="awards">
  <div class="container">
    <h3 class="section-heading">Awards & Reviews</h3>
    <div class="awards-grid">
      <div class="award-card">
        <img src="assets/awards/casio-official.svg" alt="Casio Official"/>
        <p>Casio Japan chính hãng</p>
      </div>
      <div class="award-card">
        <img src="assets/awards/bgd-approved.svg" alt="Bộ GD&ĐT"/>
        <p>Bộ GD&ĐT cho phép sử dụng kỳ thi</p>
      </div>
      <div class="rating-card">
        <span class="score">4.8</span>
        <span class="stars">★★★★★</span>
        <p>1.200+ đánh giá từ giáo viên</p>
      </div>
    </div>
  </div>
</section>
```

### CSS

```css
.awards { padding: var(--section-pad) 0; background: #fff }
.section-heading {
  text-align: center;
  font-size: var(--fs-h3);
  font-weight: 600;
  margin-bottom: 48px;
}
.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
}
.award-card, .rating-card {
  background: var(--gray-50);
  padding: 32px 24px;
  border-radius: var(--radius-md);
  text-align: center;
}
.award-card img { height: 60px; margin-bottom: 16px }
.rating-card .score {
  display: block;
  font-size: 56px;
  font-weight: 700;
  color: var(--bitex-blue);
  line-height: 1;
}
.rating-card .stars { color: #FBBF24; font-size: 20px; margin: 8px 0 }
```

---

## 9. Colors switcher

### HTML

```html
<section class="colors">
  <div class="container">
    <h2 class="big-title" style="text-align:center">Colors</h2>
    <p class="big-desc" style="margin:16px auto 48px; text-align:center">
      5 phiên bản màu cho phong cách riêng của bạn
    </p>

    <div class="color-display">
      <img id="colorImg" src="assets/images/colors/fx580-black.png" alt=""/>
    </div>

    <div class="color-swatches">
      <button data-color="black" data-name="Midnight Black" class="active">
        <span style="background:#1a1a1a"></span>
      </button>
      <button data-color="white" data-name="Pearl White">
        <span style="background:#f5f5f5; border:1px solid #ddd"></span>
      </button>
      <button data-color="pink" data-name="Soft Pink">
        <span style="background:#f4a8b8"></span>
      </button>
      <button data-color="blue" data-name="Sky Blue">
        <span style="background:#7eb5e0"></span>
      </button>
      <button data-color="green" data-name="Mint Green">
        <span style="background:#a8d8b9"></span>
      </button>
    </div>
    <p class="color-name" id="colorName">Midnight Black</p>
  </div>
</section>
```

### CSS

```css
.colors {
  padding: var(--section-pad) 0;
  background: var(--gray-50);
  text-align: center;
}
.color-display {
  max-width: 500px;
  margin: 0 auto 32px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.color-display img {
  width: 100%;
  height: auto;
  transition: opacity var(--duration);
}
.color-swatches {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}
.color-swatches button {
  background: transparent;
  border: 2px solid transparent;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  transition: border-color var(--duration);
}
.color-swatches button span {
  display: block;
  width: 32px; height: 32px;
  border-radius: 50%;
}
.color-swatches button.active { border-color: var(--bitex-blue) }
.color-name {
  font-size: var(--fs-small);
  color: var(--gray-500);
  letter-spacing: 1px;
}
```

### JS

```js
// js/main.js
document.querySelectorAll('.color-swatches button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-swatches button')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const img = document.getElementById('colorImg');
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = `assets/images/colors/fx580-${btn.dataset.color}.png`;
      img.style.opacity = 1;
    }, 200);

    document.getElementById('colorName').textContent = btn.dataset.name;
  });
});
```

---

## 10. Gallery Swiper

### HTML

```html
<section id="gallery" class="gallery">
  <div class="container">
    <h2 class="big-title" style="text-align:center">
      Tính bởi <strong>FX-580VN X</strong>
    </h2>
    <p class="big-desc" style="margin:16px auto 48px; text-align:center">
      Khám phá những bài toán đã được giải bằng FX-580VN X
    </p>

    <div class="swiper gallery-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="assets/images/gallery/equation.jpg" alt=""/>
          <div class="slide-caption">
            <h4>Giải phương trình bậc 4</h4>
            <p>Hỗ trợ hệ phương trình lên đến 4 ẩn</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="assets/images/gallery/matrix.jpg" alt=""/>
          <div class="slide-caption">
            <h4>Ma trận 4×4</h4>
            <p>Tính định thức, nghịch đảo, chuyển vị</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="assets/images/gallery/stats.jpg" alt=""/>
          <div class="slide-caption">
            <h4>Thống kê & hồi quy</h4>
            <p>8 loại phân tích thống kê</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="assets/images/gallery/integral.jpg" alt=""/>
          <div class="slide-caption">
            <h4>Tích phân, đạo hàm</h4>
            <p>Giải tích cho lớp 11-12</p>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <button class="swiper-button-prev"></button>
      <button class="swiper-button-next"></button>
    </div>
  </div>
</section>
```

### CSS

```css
.gallery { padding: var(--section-pad) 0; background: #fff }
.gallery-swiper {
  padding: 32px 8px 64px;
}
.gallery-swiper .swiper-slide {
  background: var(--gray-50);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.gallery-swiper .swiper-slide img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}
.slide-caption {
  padding: 20px 24px;
}
.slide-caption h4 { font-size: 18px; margin: 0 0 8px }
.slide-caption p  { color: var(--gray-500); margin: 0; font-size: 14px }

.swiper-pagination-bullet-active { background: var(--bitex-blue) !important }
.swiper-button-next, .swiper-button-prev { color: var(--bitex-blue) !important }
```

### JS

```js
new Swiper('.gallery-swiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768:  { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});
```

---

## 11. Footer BITEX

### HTML

```html
<footer class="site-footer">
  <!-- App banner -->
  <div class="footer-app">
    <div class="container footer-app-inner">
      <h4>APP BẢO HÀNH ĐIỆN TỬ</h4>
      <div class="store-buttons">
        <a href="#"><img src="assets/icons/gplay.svg" alt="Google Play"/></a>
        <a href="#"><img src="assets/icons/appstore.svg" alt="App Store"/></a>
      </div>
    </div>
  </div>

  <!-- Main footer -->
  <div class="footer-main">
    <div class="container footer-grid">
      <div class="footer-col footer-brand">
        <img src="assets/icons/bitex-logo-white.svg" alt="BITEX" class="footer-logo"/>
        <p>Công ty Cổ Phần XNK Bình Tây</p>
      </div>

      <div class="footer-col">
        <h5>Bảo Hành</h5>
        <ul>
          <li><a href="#">Trung tâm bảo hành</a></li>
          <li><a href="#">Chính sách bảo hành Casio</a></li>
          <li><a href="#">Đăng ký máy tính Casio</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5>Thông tin cần biết</h5>
        <ul>
          <li><a href="#">Catalogue</a></li>
          <li><a href="#">Khách hàng doanh nghiệp</a></li>
          <li><a href="#">Chính sách bảo mật</a></li>
        </ul>
      </div>

      <div class="footer-col footer-contact">
        <h5>Thông tin liên hệ</h5>
        <p><strong>📞 Hotline:</strong> 1800 2152</p>
        <p><strong>✉ Email:</strong> bitex@bitex.com.vn</p>
        <p><strong>📍 Văn phòng giao dịch:</strong></p>
        <p>Số 16 Tôn Thất Hiệp, P.13, Q.11, TP.HCM</p>
      </div>
    </div>
  </div>

  <!-- Social bar -->
  <div class="footer-social">
    <div class="container social-inner">
      <a href="#" aria-label="Facebook"><img src="assets/icons/fb.svg"/></a>
      <a href="#" aria-label="TikTok"><img src="assets/icons/tiktok.svg"/></a>
      <a href="#" aria-label="YouTube"><img src="assets/icons/yt.svg"/></a>
    </div>
  </div>

  <!-- Copyright -->
  <div class="footer-bottom">
    <div class="container">
      <p>© 2017 - 2026 BITEX. All rights reserved.</p>
    </div>
  </div>
</footer>
```

### CSS

```css
.site-footer { background: var(--bitex-blue-dark); color: #fff }

.footer-app {
  background: var(--bitex-blue);
  padding: 32px 0;
}
.footer-app-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}
.footer-app h4 {
  font-size: 18px;
  margin: 0;
  letter-spacing: 1px;
}
.store-buttons { display: flex; gap: 12px }
.store-buttons img { height: 40px }

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 40px;
  padding: 60px 0;
}
.footer-brand .footer-logo { width: 100px; margin-bottom: 16px }

.footer-col h5 {
  font-size: 16px;
  margin: 0 0 16px;
  color: #fff;
  font-weight: 600;
}
.footer-col ul { list-style: none; margin: 0; padding: 0 }
.footer-col li { margin-bottom: 8px }
.footer-col a {
  color: rgba(255, 255, 255, .8);
  text-decoration: none;
  font-size: 14px;
  transition: color var(--duration);
}
.footer-col a:hover { color: #fff }
.footer-contact p { margin: 4px 0; font-size: 14px; color: rgba(255,255,255,.85) }

.footer-social {
  border-top: 1px solid rgba(255, 255, 255, .1);
  padding: 24px 0;
}
.social-inner {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.social-inner a {
  width: 36px; height: 36px;
  background: rgba(255,255,255,.1);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: background var(--duration);
}
.social-inner a:hover { background: rgba(255,255,255,.2) }
.social-inner img { width: 18px; filter: brightness(0) invert(1) }

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, .1);
  padding: 20px 0;
  text-align: center;
}
.footer-bottom p {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, .6);
}
```

---

## 12. GSAP + ScrollTrigger animations

`js/animations.js`:

```js
gsap.registerPlugin(ScrollTrigger);

/* ============================
 * 1. Hero — fade in khi load
 * ============================ */
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .from('.hero-label',  { y: 20, opacity: 0, duration: .8 })
  .from('.hero-title',  { y: 50, opacity: 0, duration: 1 },    '-=.5')
  .from('.hero-tagline',{ y: 30, opacity: 0, duration: .8 },   '-=.6')
  .from('.hero-image img', { scale: .85, opacity: 0, duration: 1.2 }, '-=.4')
  .from('.hero-cta .btn',  { y: 20, opacity: 0, stagger: .1, duration: .6 }, '-=.6');

/* ============================
 * 2. Big blocks — slide in từ 2 bên
 * ============================ */
gsap.utils.toArray('.big-block').forEach((block) => {
  const text = block.querySelector('.big-text');
  const img  = block.querySelector('.big-image');
  const isReverse = block.classList.contains('reverse');

  gsap.from(text, {
    scrollTrigger: { trigger: block, start: 'top 70%', toggleActions: 'play none none reverse' },
    x: isReverse ? 60 : -60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
  gsap.from(img, {
    scrollTrigger: { trigger: block, start: 'top 70%', toggleActions: 'play none none reverse' },
    x: isReverse ? -60 : 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: .15,
  });
});

/* ============================
 * 3. Count-up numbers
 * ============================ */
gsap.utils.toArray('.big-metrics .num').forEach((el) => {
  const end = parseInt(el.dataset.target || el.textContent);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () =>
      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: end,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate() {
            el.textContent = Math.floor(el.textContent).toLocaleString('vi-VN');
          },
        }
      ),
  });
});

/* ============================
 * 4. Awards cards — stagger fade up
 * ============================ */
gsap.from('.award-card, .rating-card', {
  scrollTrigger: { trigger: '.awards-grid', start: 'top 75%' },
  y: 40, opacity: 0,
  stagger: .15,
  duration: .8,
  ease: 'power3.out',
});

/* ============================
 * 5. Sub-nav background đậm khi scroll
 * ============================ */
ScrollTrigger.create({
  start: 'top -100',
  onUpdate: (self) => {
    document.getElementById('subnav').classList.toggle('scrolled', self.scroll() > 100);
  },
});

/* ============================
 * 6. Section heading reveal
 * ============================ */
gsap.utils.toArray('.section-heading, .big-title').forEach((h) => {
  gsap.from(h, {
    scrollTrigger: { trigger: h, start: 'top 80%' },
    y: 30, opacity: 0, duration: .8, ease: 'power3.out',
  });
});
```

---

## 13. Smooth scroll với Lenis

Thêm vào đầu `animations.js`:

```js
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## 14. Responsive breakpoints

`css/main.css` — phần cuối:

```css
/* Tablet ≤ 1024px */
@media (max-width: 1024px) {
  .main-nav { gap: 20px }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px }
  .big-inner { gap: 48px }
}

/* Mobile ≤ 768px */
@media (max-width: 768px) {
  /* Header */
  .main-nav { display: none }
  .hamburger { display: flex }

  /* Sub-nav: scroll ngang */
  .subnav-links {
    overflow-x: auto;
    scrollbar-width: none;
    gap: 20px;
  }
  .subnav-links::-webkit-scrollbar { display: none }
  .product-name, .btn-buy { display: none }

  /* Hero */
  .hero-title { font-size: 48px }
  .hero-cta { flex-direction: column; align-items: center }
  .hero-cta .btn { width: 240px; justify-content: center }

  /* Big blocks → 1 cột */
  .big-inner {
    grid-template-columns: 1fr !important;
    gap: 32px;
    text-align: center;
  }
  .big-block.reverse .big-inner { grid-template-areas: 'text' 'img' }
  .big-desc { margin-left: auto; margin-right: auto }
  .big-metrics { justify-content: center }

  /* Footer */
  .footer-grid { grid-template-columns: 1fr; gap: 32px; text-align: center }
  .footer-app-inner { flex-direction: column; text-align: center }
}

/* Small mobile ≤ 480px */
@media (max-width: 480px) {
  :root { --section-pad: 48px }
  .hero-image { max-width: 280px }
  .big-metrics { gap: 24px }
  .big-metrics .num { font-size: 36px }
}
```

---

## 15. Tối ưu hiệu năng

### Hình ảnh

- **Format:** dùng WebP, fallback JPG/PNG cho ảnh sản phẩm
- **Kích thước:** export 2 size — `@1x` (max-width của container) và `@2x` (retina)
- **Lazy-load:** ảnh ngoài viewport thêm `loading="lazy"`

```html
<img src="hero@1x.webp"
     srcset="hero@1x.webp 1x, hero@2x.webp 2x"
     loading="lazy"
     width="500" height="500"
     alt=""/>
```

### CSS/JS

- **Critical CSS:** inline CSS cho header + hero, defer phần còn lại
- **Defer script:** thêm `defer` vào tất cả `<script>` ở `</body>`
- **Preload font:** dùng `<link rel="preload" as="font" crossorigin>` cho Inter

### Lighthouse target

| Metric | Target |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |

---

## 16. Mapping tính năng FX-580VN X → "Big on X"

Gợi ý 10 section cho microsite Casio:

| # | Tên section | Nội dung chính | Metric/Badge |
|---|---|---|---|
| 1 | Big on **tính toán** | 521 chức năng, mọi cấp học | `521` chức năng |
| 2 | Big on **độ chính xác** | Sai số ≤ 10⁻¹⁰, độ tin cậy cao | `10⁻¹⁰` sai số |
| 3 | Big on **thi cử** | Được Bộ GD&ĐT cho phép trong kỳ thi quốc gia | Logo Bộ GD&ĐT |
| 4 | Big on **bộ nhớ** | 47 KB, lưu công thức tự định nghĩa | `47` KB |
| 5 | Big on **màn hình** | Natural Display, hiển thị giống SGK | "Natural" badge |
| 6 | Big on **giải PT** | Phương trình bậc 4, hệ 4 ẩn | `4` ẩn |
| 7 | Big on **ma trận** | Ma trận 4×4, định thức, nghịch đảo | `4×4` |
| 8 | Big on **thống kê** | 8 loại phân tích hồi quy | `8` chế độ |
| 9 | Big on **pin** | Pin lithium 3 năm sử dụng | `3` năm |
| 10 | Big on **độ bền** | Vỏ ABS, phím 1 triệu nhấn | `1M+` lần |

---

## 17. Sprint plan (9 bước)

| # | Việc | Thời gian | Output |
|---|---|---|---|
| 1 | Setup HTML skeleton + import CSS/JS + variables | 2h | `index.html` + `variables.css` chạy được |
| 2 | Build Header BITEX + Sub-nav sticky + active state | 3h | Header hoàn chỉnh, click nav scroll smooth |
| 3 | Hero section + responsive | 2h | Hero hiển thị đẹp mobile/desktop |
| 4 | Build 1 block "Big on X" → copy ra 8-10 block | 4h | 8 section tính năng có nội dung thật |
| 5 | Awards + Colors switcher + Gallery Swiper | 3h | 3 section interactive |
| 6 | Footer BITEX (copy + adapt) | 2h | Footer khớp với bitex.com.vn |
| 7 | GSAP ScrollTrigger animations + Lenis | 3h | Tất cả animation scroll-triggered mượt |
| 8 | Responsive QA (375px, 768px, 1280px) | 2h | Không bể layout |
| 9 | Tối ưu ảnh + Lighthouse + cross-browser | 2h | Lighthouse ≥ 90, test Chrome/Firefox/Safari |

**Tổng:** ~23 giờ (~3 ngày làm việc)

---

## 18. Checklist QA trước khi giao

### Functional

- [ ] Click logo BITEX → mở https://bitex.com.vn
- [ ] Click các link sub-nav → scroll đúng section, có active state
- [ ] Click color swatch → ảnh sản phẩm đổi mượt
- [ ] Swiper gallery: kéo, click prev/next, click pagination đều OK
- [ ] Footer links đầy đủ thông tin BITEX (hotline, email, địa chỉ)
- [ ] CTA "Mua ngay" → link đến bitexshop.com hoặc trang sản phẩm
- [ ] Tất cả social icons có link thực

### Visual

- [ ] Màu xanh BITEX `#1B4F9C` đúng tone
- [ ] Font Inter render đúng (không fallback Arial)
- [ ] Spacing đều giữa các section
- [ ] Ảnh không bị méo, có border-radius nhất quán
- [ ] Hero không bị che bởi header

### Animation

- [ ] Hero animation chạy 1 lần khi load
- [ ] Big blocks reveal khi scroll tới 70% viewport
- [ ] Count-up numbers chạy đúng 1 lần
- [ ] Sub-nav background đậm hơn khi scroll
- [ ] Không có animation lag/jank

### Responsive

- [ ] Test trên 375px (iPhone SE)
- [ ] Test trên 768px (iPad)
- [ ] Test trên 1280px (laptop)
- [ ] Test trên 1920px (desktop lớn)
- [ ] Hamburger menu hoạt động mobile

### Performance

- [ ] Lighthouse Performance ≥ 90
- [ ] Ảnh đã WebP + lazy-load
- [ ] CSS/JS minified (nếu deploy production)
- [ ] Không có console error

### Accessibility

- [ ] Tất cả ảnh có `alt`
- [ ] Heading hierarchy đúng (h1 → h2 → h3)
- [ ] Color contrast ≥ 4.5:1 cho text
- [ ] Keyboard tab navigation hoạt động
- [ ] Focus state visible

---

## Tài liệu tham khảo

- ASUS Zenfone 9: https://www.asus.com/mobile-handhelds/phones/zenfone/zenfone-9/
- AORUS RTX 5080 INFINITY: https://www.gigabyte.com/Graphics-Card/GV-N5080AORUS-IF-16GD
- BITEX (footer source): https://bitex.com.vn/
- GSAP ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Swiper docs: https://swiperjs.com/swiper-api
- Lenis: https://github.com/darkroomengineering/lenis

---

*Tài liệu này là blueprint kỹ thuật cho microsite Casio FX-580VN X — BITEX 2026.*
