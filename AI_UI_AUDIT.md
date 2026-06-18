# AI UI Audit

## Mục đích

File này ghi lại các phần giao diện trong dự án đang có cảm giác "AI-generated", "template-generated" hoặc "placeholder-driven".

Phạm vi audit:

- `index.html`
- `assets/css/components.css`
- `assets/css/sections.css`
- `assets/js/animations.js`
- SVG trong `assets/img/product/` và `assets/img/hero/`

Ghi chú:

- Audit này dựa trên source code và asset hiện có trong repo.
- Chưa có đối chiếu screenshot runtime trong file này.
- Mục tiêu không phải chê giao diện, mà là xác định các điểm đang làm trang kém "art-directed" và dễ lộ dấu vết AI.

## Tiêu chí nhận diện "mùi AI" trong UI

Một phần giao diện thường mang cảm giác AI khi có một hoặc nhiều dấu hiệu sau:

- Bố cục lặp lại quá đều, gần như copy-paste cùng một pattern.
- Tương tác nhìn như có thật nhưng logic thực chất rất mỏng hoặc giả.
- Asset mang tính minh hoạ placeholder, quá sạch, thiếu độ thật và thiếu texture vật lý.
- Nội dung trust, testimonial, partner hoặc lifestyle có vẻ được điền để lấp chỗ trống hơn là được biên tập thật.
- Hệ thiết kế bị pha thành nhiều "card generic" và các block tương tự nhau thay vì có nhịp điệu biên tập riêng.
- Có nhiều `style=""` inline hoặc các one-off fix, gợi cảm giác page được ghép nhanh thay vì được systemize tốt.

## Findings

### 1. Asset sản phẩm và lifestyle mang tính mockup minh hoạ quá rõ

Đây là dấu hiệu mạnh nhất.

Biểu hiện:

- Hero dùng `calculator-navy.svg` làm ảnh sản phẩm chính thay vì ảnh thật chụp studio.
- Showcase cũng tiếp tục dùng SVG của sản phẩm.
- Feature visual dùng các SVG dạng infographic.
- Lifestyle section dùng cả ảnh lớp học SVG và tái sử dụng visual tính năng như ảnh "đời thực".

Code liên quan:

- `index.html:67-87` dùng `assets/img/product/calculator-navy.svg` trong hero.
- `index.html:138-145` dùng `calculator-black.svg` và `calculator-navy.svg` trong showcase.
- `index.html:164-188` dùng `feat-functions.svg`, `feat-display.svg`, `feat-app.svg` làm feature cards.
- `index.html:441-451` dùng `life-classroom.svg` và tái dùng `feat-functions.svg`, `feat-display.svg`, `feat-app.svg` trong lifestyle.

Chứng cứ trong asset:

- `assets/img/product/calculator-navy.svg:1-115`
- `assets/img/hero/life-classroom.svg:1-47`
- `assets/img/hero/feat-functions.svg:1-27`

Vì sao trông giống AI:

- SVG sản phẩm quá sạch, đối xứng và không có sai số vật lý như ảnh thật.
- SVG lifestyle dùng các shape lớn, silhouette đơn giản, gradient sạch, rất giống placeholder minh hoạ tự sinh.
- Một visual feature lại được dùng lại như ảnh ngữ cảnh thực tế, làm giảm độ tin cậy biên tập.

Mức độ ảnh hưởng:

- Rất cao.
- Đây là lý do lớn nhất khiến trang chưa đạt cảm giác flagship thật tay.

### 2. Color picker là tương tác giả

Biểu hiện:

- UI cho cảm giác có 3 màu: đen, navy, bạc.
- Nhưng stage chỉ có 2 sản phẩm render sẵn.
- JS chỉ đổi class active cho dot, không đổi ảnh, không đổi state, không đổi biến thể thật.

Code liên quan:

- `index.html:138-145` stage chỉ render 2 máy.
- `index.html:147-156` controls có 3 nút màu.
- `assets/js/animations.js:107-115` click handler chỉ thêm và xoá `is-active`.

Vì sao trông giống AI:

- Đây là kiểu UI "có vẻ xong" nhưng thực ra chỉ là facade.
- AI-generated landing page rất hay dựng interaction ở mức bề mặt để đủ cảm giác demo, nhưng không có logic sản phẩm phía sau.

Mức độ ảnh hưởng:

- Cao.
- Người xem tinh ý sẽ thấy cảm giác giả lập ngay.

### 3. Hệ card bị lặp quá đồng dạng, tạo cảm giác template-generated

Biểu hiện:

- `award-card`
- `feat-card`
- `spec-card`
- `partners__item`
- `cta-channel`

Các block này đều dùng cùng một công thức:

- nền sáng hoặc translucent
- bo góc
- viền mảnh
- icon nhỏ
- hover nhấc nhẹ

Code liên quan:

- `assets/css/components.css:237-276` định nghĩa `feat-card`
- `assets/css/components.css:279-303` định nghĩa `award-card`
- `assets/css/sections.css:339-364` định nghĩa `spec-card`
- `assets/css/sections.css:409-442` định nghĩa `partners__item`
- `assets/css/sections.css:489-502` định nghĩa `cta-channel`

Vì sao trông giống AI:

- Khi quá nhiều section khác nhau dùng cùng một motif card, trang mất nhịp kể chuyện và trở thành một bộ sưu tập component generic.
- AI thường tối ưu sự "ổn" và "đồng đều", nên hay sinh ra nhiều khối card đẹp vừa phải nhưng thiếu cá tính biên tập.

Mức độ ảnh hưởng:

- Cao.
- Không sai về mặt code, nhưng làm giảm mạnh cảm giác flagship.

### 4. Section trust còn đậm chất placeholder

Biểu hiện:

- Testimonial đang là quote giả.
- Tên giáo viên và vai trò đang đóng vai nội dung lấp chỗ.
- Partner logos hiện là text chip, chưa phải logo thật.

Code liên quan:

- `index.html:458-466` testimonial quote và attribution.
- `index.html:468-475` partner items đang là text.

Vì sao trông giống AI:

- Trust section do AI sinh rất hay dùng quote nghe hợp lý nhưng không có nguồn kiểm chứng.
- Text chip thay logo thật tạo cảm giác "dữ liệu mẫu", chưa phải một landing page có vật liệu thương hiệu thật.

Mức độ ảnh hưởng:

- Rất cao.
- Trust mà giả sẽ kéo toàn bộ perception của trang xuống.

### 5. Storytelling structure đang bám pattern ASUS theo cách cơ học

Biểu hiện:

- Mỗi feature block gần như đều theo công thức cố định:
  `eyebrow + section number + title + desc + stats + full-width visual`
- Xen kẽ sáng/tối có làm đúng tinh thần reference, nhưng nhịp nội dung vẫn quá đều tay.

Code liên quan:

- `index.html:222-252` feature 1
- `index.html:258-295` feature 2
- `index.html:300-332` feature 3
- `index.html:337-369` feature 4
- `assets/css/sections.css:185-277` hệ layout chung cho `feature-block`

Vì sao trông giống AI:

- AI rất giỏi bắt chước pattern cấu trúc, nhưng thường tái sử dụng nó quá ổn định.
- Kết quả là trang "đúng pattern" nhưng thiếu chỗ nhấn biên tập độc đáo, thiếu bất đối xứng có chủ đích, thiếu nhịp visual thật sự.

Mức độ ảnh hưởng:

- Trung bình đến cao.
- Đây là vấn đề về art direction nhiều hơn là bug code.

### 6. Một số CTA rơi về boilerplate e-commerce

Biểu hiện:

- Nav và drawer dùng `Mua ngay`.
- Trong khi guideline dự án đã chốt hero CTA chính là `Khám phá ngay`, tránh đẩy cảm giác bán hàng quá sớm.

Code liên quan:

- `index.html:43-45`
- `index.html:58-60`

Vì sao trông giống AI:

- `Mua ngay` là CTA mặc định rất thường gặp ở output AI và template thương mại điện tử.
- Nó làm landing page chuyển từ flagship storytelling sang generic sales page.

Mức độ ảnh hưởng:

- Trung bình.
- Không phải lỗi hình thức lớn nhất, nhưng làm lệch tone thương hiệu.

### 7. Lifestyle section đang lộ rõ dấu hiệu "điền chỗ trống"

Biểu hiện:

- Chỉ có 1 SVG lifestyle riêng.
- 3 ô còn lại dùng lại asset của feature.

Code liên quan:

- `index.html:440-451`

Vì sao trông giống AI:

- Đây là pattern rất phổ biến khi AI hoặc người dựng nhanh cần đủ layout trước: lấy asset sẵn có để lấp grid.
- Vì vậy section nhìn đủ khung nhưng không thật sự kể thêm câu chuyện mới.

Mức độ ảnh hưởng:

- Cao.
- Đây là một trong những chỗ dễ bị người xem nhận ra là placeholder.

### 8. Nhiều one-off inline style làm page có cảm giác ghép nhanh

Biểu hiện:

- Có khá nhiều `style=""` inline trong HTML để xử lý margin, padding hoặc màu.

Ví dụ:

- `index.html:58`
- `index.html:86`
- `index.html:98`
- `index.html:161`
- `index.html:210`
- `index.html:379-380`
- `index.html:426`
- `index.html:459`
- `index.html:482-483`
- `index.html:530`
- `index.html:556`

Vì sao trông giống AI:

- Output AI thường vá giao diện bằng inline style để hoàn tất nhanh.
- Khi số lượng one-off fix tăng lên, cảm giác hệ thống thiết kế yếu đi và trang trông giống bản generated draft hơn là bản đã được polish.

Mức độ ảnh hưởng:

- Trung bình.
- Chủ yếu ảnh hưởng perception về độ hoàn thiện kỹ thuật.

### 9. Motion và interaction đúng chức năng nhưng hơi "mặc định"

Biểu hiện:

- Reveal animation chỉ là fade + translateY lặp lại trên toàn site.
- Hero parallax chỉ đẩy sản phẩm xuống theo scroll.
- Không có variation theo loại section ngoài delay.

Code liên quan:

- `assets/css/sections.css:558-576` reveal pattern
- `assets/js/animations.js:10-32` IntersectionObserver reveal
- `assets/js/animations.js:86-104` hero parallax

Vì sao trông giống AI:

- Animation ở mức "sạch và đủ dùng", nhưng gần với mặc định của nhiều landing page generated.
- Mỗi section chưa có chuyển động riêng phản ánh tính cách nội dung của nó.

Mức độ ảnh hưởng:

- Trung bình.
- Không phá giao diện, nhưng chưa tạo cảm giác authored.

## Tổng hợp mức độ ưu tiên

Ưu tiên cao:

- Thay asset sản phẩm SVG bằng ảnh thật.
- Thay lifestyle placeholder bằng ảnh thật.
- Thay testimonial giả và partner text bằng tư liệu thật.
- Sửa color picker để phản ánh state sản phẩm thật hoặc bỏ hẳn.

Ưu tiên trung bình:

- Giảm số lượng block card đồng dạng.
- Làm feature sections khác nhau rõ hơn về nhịp visual.
- Dọn inline style thành token/class.
- Rà lại CTA boilerplate như `Mua ngay`.

Ưu tiên thấp hơn:

- Tinh chỉnh motion theo từng section.
- Tạo nhiều bất đối xứng có chủ đích hơn trong storytelling.

## Kết luận ngắn

Trang hiện tại đã có khung tốt, đúng hướng ASUS-inspired và có tổ chức sạch. Tuy nhiên những dấu vết "AI" rõ nhất không nằm ở layout cơ bản mà nằm ở 4 điểm:

- asset giả lập thay cho asset thật
- interaction giả như color picker
- trust content placeholder
- lạm dụng card pattern đồng dạng

Nếu xử lý đúng 4 điểm này trước, cảm giác "AI-generated" sẽ giảm mạnh ngay cả khi chưa thay đổi toàn bộ bố cục.
