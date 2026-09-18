# J.A.R.V.I.S. HUD Studio (Mark VII)

เว็บแอพพลิเคชันสำหรับเปลี่ยนโฉมและปรับแต่งไอคอนมือถือ & แท็บเล็ต ให้กลายเป็นระบบ **J.A.R.V.I.S. ไฮเทค** สไตล์ Stark Industries / Iron Man พร้อมชุดวิดเจ็ตแสดงผลแบบเรียลไทม์

---

## ⚡ ฟีเจอร์หลัก (Features)

### 1. J.A.R.V.I.S. Icon Workshop & Generator
- **คลังไอคอน 50+ แอพยอดนิยม**: รองรับทั้ง LINE, Facebook, Instagram, TikTok, YouTube, Spotify, Camera, Safari, Bank Apps (K PLUS, SCB, Krungthai), Shopping, Tools ฯลฯ
- **เรนเดอร์ความละเอียด Ultra HD 1024x1024**: ออกแบบด้วย Canvas 2D เรืองแสงนีออน คมชัดระดับโปร
- **เลือกรูปทรงกรอบไฮเทค (5 สไตล์)**:
  - Arc Reactor Core (วงแหวนเตาปฏิกรณ์อาร์ก)
  - Cyber Hexagon (หกเหลี่ยมไฮเทค)
  - Tactical Octagon (แปดเหลี่ยมยุทธวิธี)
  - Tachyon Minimal Ring (วงแหวนมินิมอล)
  - Matrix HUD Square (สี่เหลี่ยมเป้าล็อก HUD)
- **ปรับแต่งโทนสีแสงนีออน (6 โทนสี)**: Stark Arc Cyan, Mark VII Gold & Crimson, Stealth Emerald, Quantum Violet, Solar Plasma, Tactical Spec White
- **ระบบอัปโหลดรูปของตัวเอง**: นำรูปภาพหรือโลโก้ใดๆ มาใส่ในกรอบ J.A.R.V.I.S. ได้ทันที
- **ส่งออกไฟล์สะดวกรวดเร็ว**:
  - ดาวน์โหลดรูปเดี่ยว 1024x1024 PNG
  - ดาวน์โหลดทั้งแพ็กในคลิกเดียวเป็นไฟล์ `.ZIP`
  - สร้างไฟล์ Apple Configuration Profile (`.mobileconfig`) สำหรับติดตั้งลง iPhone/iPad

### 2. ชุดวิดเจ็ตแสดงผลแบบเรียลไทม์ (Telemetry Widgets Suite)
- **Arc Reactor Clock**: นาฬิกาดิจิทัลมิลลิวินาทีพร้อมวงแหวนปฏิกรณ์อาร์กหมุนวน
- **Battery & Hardware Telemetry**: วัดเปอร์เซ็นต์แบตเตอรี่จริงจากเครื่อง (`navigator.getBattery`), สถานะการชาร์จ, คลื่นความถี่ประมวลผล
- **Atmospheric & Weather Radar**: ดึงสภาพอากาศจริงจาก Open-Meteo API อุณหภูมิ, ความเร็วลม, ความชื้น, เรดาร์ตรวจจับ
- **J.A.R.V.I.S. AI Voice & Waveform**: คลื่นเสียงไซไฟพร้อมเสียงตอบรับด้วยระบบสังเคราะห์เสียง Web Speech API และปุ่มคำสั่งเสียงสำเร็จรูป
- **Orbital Compass**: เข็มทิศ 360 องศา หมุนตามเซนเซอร์เครื่องจริงบนมือถือ/แท็บเล็ต
- **ส่งออกวิดเจ็ต**: ส่งออกภาพความละเอียดสูงสำหรับ Widgetsmith หรือคัดลอกโค้ด JavaScript สำหรับแอพ **Scriptable** บน iOS

### 3. Holographic Device Simulator (จำลองหน้าจอ)
- พรีวิวหน้าจอจริงบน **iPhone 16 Pro**, **iPad / Tablet**, และ **Android Galaxy**
- เลือกเปลี่ยนภาพพื้นหลัง AMOLED ไฮเทค พร้อมปุ่มดาวน์โหลดภาพพื้นหลังขนาดมือถือและแท็บเล็ต (2732x2048)

### 4. ระบบเสียงประกอบไซไฟ (Procedural Web Audio API)
- เสียงฮัมเตาปฏิกรณ์อาร์ก (Arc Reactor Boot Hum), เสียงคลิก Holographic, เสียงสแกนเรดาร์ โดยไม่ต้องโหลดไฟล์ mp3 ภายนอก

---

## 🚀 วิธีเปิดใช้งาน (Run Application)

```bash
# 1. เข้าสู่โฟลเดอร์
cd jarvis-hud-studio

# 2. เริ่มทำงาน Dev Server
bun run dev
# หรือ
npm run dev
```

เปิดบราวเซอร์ไปที่: `http://localhost:5173` หรือเปิดจากมือถือ/แท็บเล็ตผ่าน IP Wi-Fi วงเดียวกัน!
