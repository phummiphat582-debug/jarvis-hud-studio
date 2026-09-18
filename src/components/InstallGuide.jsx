import React, { useState } from 'react';
import { 
  Smartphone, Tablet, CheckCircle2, ChevronRight, 
  ExternalLink, Copy, Check, Sparkles, BookOpen, Layers
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export default function InstallGuide() {
  const [activePlatform, setActivePlatform] = useState('ios-shortcuts');
  const [copiedScheme, setCopiedScheme] = useState('');

  const handleCopyScheme = (scheme) => {
    playClickSound();
    navigator.clipboard.writeText(scheme);
    setCopiedScheme(scheme);
    setTimeout(() => setCopiedScheme(''), 2000);
  };

  const popularSchemes = [
    { name: 'LINE', scheme: 'line://', desc: 'เปิดแชท LINE ทันที' },
    { name: 'YouTube', scheme: 'youtube://', desc: 'เปิดวิดีโอ YouTube ทันที' },
    { name: 'Instagram', scheme: 'instagram://', desc: 'เปิดหน้าฟีด Instagram' },
    { name: 'Facebook', scheme: 'fb://', desc: 'เปิดแอพ Facebook ทันที' },
    { name: 'TikTok', scheme: 'tiktok://', desc: 'เปิดหน้าหลัก TikTok' },
    { name: 'Spotify', scheme: 'spotify://', desc: 'เปิดเครื่องเล่นเพลง Spotify' },
    { name: 'Camera (กล้อง)', scheme: 'camera:', desc: 'เปิดกล้องถ่ายภาพ' },
    { name: 'Settings (ตั้งค่า)', scheme: 'App-Prefs:root', desc: 'เปิดการตั้งค่าเครื่อง' },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-cyan-900/40">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wider">
            คู่มือการติดตั้งไอคอนและวิดเจ็ต (DEPLOYMENT PROTOCOLS)
          </h3>
        </div>
        <p className="text-sm text-cyan-400/80 font-mono-tech mt-1">
          คำแนะนำทีละขั้นตอนอย่างละเอียดสำหรับ iPhone, iPad และ Android เพื่อให้เครื่องของคุณกลายเป็นระบบ J.A.R.V.I.S. ไฮเทคแบบสมบูรณ์
        </p>
      </div>

      {/* Platform Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono-tech text-xs">
        <button
          onClick={() => { playClickSound(); setActivePlatform('ios-shortcuts'); }}
          className={`px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-2 shrink-0 ${
            activePlatform === 'ios-shortcuts'
              ? 'bg-cyan-500 text-black font-bold'
              : 'bg-black/40 text-cyan-400 border border-cyan-900/40 hover:bg-cyan-950/40'
          }`}
        >
          <span>🍎 iOS / iPadOS: แอพคำสั่งลัด (Shortcuts)</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActivePlatform('ios-profile'); }}
          className={`px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-2 shrink-0 ${
            activePlatform === 'ios-profile'
              ? 'bg-cyan-500 text-black font-bold'
              : 'bg-black/40 text-cyan-400 border border-cyan-900/40 hover:bg-cyan-950/40'
          }`}
        >
          <span>⚡ iOS: ติดตั้งผ่าน Profile (.mobileconfig)</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActivePlatform('android'); }}
          className={`px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-2 shrink-0 ${
            activePlatform === 'android'
              ? 'bg-cyan-500 text-black font-bold'
              : 'bg-black/40 text-cyan-400 border border-cyan-900/40 hover:bg-cyan-950/40'
          }`}
        >
          <span>🤖 Android / แท็บเล็ต: Nova &amp; Shortcut Maker</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActivePlatform('widgets'); }}
          className={`px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-2 shrink-0 ${
            activePlatform === 'widgets'
              ? 'bg-cyan-500 text-black font-bold'
              : 'bg-black/40 text-cyan-400 border border-cyan-900/40 hover:bg-cyan-950/40'
          }`}
        >
          <span>📊 การใส่วิดเจ็ต (Widgets)</span>
        </button>
      </div>

      {/* Protocol 1: iOS Shortcuts Method */}
      {activePlatform === 'ios-shortcuts' && (
        <div className="hud-panel p-6 rounded-2xl border border-cyan-500/30 bg-[#040c1e]/90 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40">
            <h4 className="text-base font-orbitron font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              วิธีเปลี่ยนไอคอนบน iPhone &amp; iPad ผ่านแอพ &ldquo;คำสั่งลัด&rdquo; (Shortcuts)
            </h4>
            <span className="text-xs font-mono-tech text-cyan-400">ZERO-DELAY PROTOCOL</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-black/40 border border-cyan-900/40 rounded-xl space-y-2">
                <div className="font-bold text-cyan-300 font-mono-tech text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xs font-bold">1</span>
                  บันทึกรูปภาพไอคอน J.A.R.V.I.S.
                </div>
                <p className="text-xs text-cyan-400/80 leading-relaxed font-mono-tech">
                  กดดาวน์โหลดไอคอนที่ต้องการจาก <strong>Icon Studio</strong> หรือกดปุ่ม <strong>"ดาวน์โหลดทุกไอคอน (ZIP Pack)"</strong> แล้วบันทึกลงในคลังรูปภาพ (Photos) ของ iPhone/iPad
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-cyan-900/40 rounded-xl space-y-2">
                <div className="font-bold text-cyan-300 font-mono-tech text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xs font-bold">2</span>
                  เปิดแอพ "คำสั่งลัด" (Shortcuts)
                </div>
                <p className="text-xs text-cyan-400/80 leading-relaxed font-mono-tech">
                  กดเครื่องหมาย <strong>+ (สร้างคำสั่งลัดใหม่)</strong> มุมขวาบน &gt; เลือก <strong>"เพิ่มการกระทำ" (Add Action)</strong>
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-cyan-900/40 rounded-xl space-y-2">
                <div className="font-bold text-cyan-300 font-mono-tech text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xs font-bold">3</span>
                  เลือกแอพที่ต้องการเปิด (Open App หรือ Open URL)
                </div>
                <p className="text-xs text-cyan-400/80 leading-relaxed font-mono-tech">
                  พิมพ์ค้นหาคำว่า <strong>"เปิดแอป" (Open App)</strong> แล้วเลือกแอพที่ต้องการ เช่น LINE หรือ YouTube (หรือใช้คำสั่ง <em>Open URL</em> แล้วใส่ URL Scheme ด้านขวาเพื่อเปิดทันทีไม่มีหน้าต่างคั่น!)
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-cyan-900/40 rounded-xl space-y-2">
                <div className="font-bold text-cyan-300 font-mono-tech text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xs font-bold">4</span>
                  เพิ่มไปยังหน้าจอโฮม (Add to Home Screen)
                </div>
                <p className="text-xs text-cyan-400/80 leading-relaxed font-mono-tech">
                  กดที่ปุ่มแชร์ด้านล่าง หรือลูกศรชื่อคำสั่งลัด &gt; เลือก <strong>"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen)</strong> &gt; แตะที่รูปไอคอน &gt; เลือกรูป J.A.R.V.I.S. HD จากคลังภาพ แล้วกด "เพิ่ม" เป็นอันเสร็จสิ้น!
                </p>
              </div>
            </div>

            {/* Quick URL Schemes for Zero-Delay Opening */}
            <div className="hud-panel p-5 rounded-xl border border-cyan-500/30 bg-black/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold font-orbitron text-white">
                  ⚡ URL Schemes เปิดแอพทันที (Zero-Delay)
                </div>
              </div>
              <p className="text-xs text-cyan-400/80 font-mono-tech">
                ใช้คำสั่ง <strong>"เปิด URL" (Open URLs)</strong> ใน Shortcuts แทน Open App จะทำให้เปิดแอพได้เร็วกว่าเดิมโดยไม่มีหน้าต่างคำสั่งลัดเด้งขึ้นมา:
              </p>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {popularSchemes.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-cyan-950/30 border border-cyan-900/40 rounded flex items-center justify-between text-xs font-mono-tech">
                    <div>
                      <span className="text-white font-bold">{item.name}</span>
                      <span className="text-cyan-500 text-[11px] block">{item.desc}</span>
                    </div>
                    <button
                      onClick={() => handleCopyScheme(item.scheme)}
                      className="px-2 py-1 bg-cyan-900/50 hover:bg-cyan-800/60 border border-cyan-700/60 rounded text-cyan-300 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      {copiedScheme === item.scheme ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScheme === item.scheme ? 'คัดลอกแล้ว' : item.scheme}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Protocol 2: iOS .mobileconfig Profile */}
      {activePlatform === 'ios-profile' && (
        <div className="hud-panel p-6 rounded-2xl border border-cyan-500/30 bg-[#040c1e]/90 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40">
            <h4 className="text-base font-orbitron font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              วิธีติดตั้งผ่านโปรไฟล์การกำหนดค่า Apple (.mobileconfig)
            </h4>
          </div>

          <div className="space-y-3 font-mono-tech text-xs text-cyan-300/90 leading-relaxed">
            <p>
              โปรไฟล์ <strong>.mobileconfig</strong> คือไฟล์การตั้งค่าทางการของ Apple ที่ให้คุณสามารถติดตั้ง WebClips (ไอคอนทางลัด) ขึ้นหน้าจอโฮมได้หลายไอคอนพร้อมกันในคลิกเดียว:
            </p>

            <ol className="list-decimal pl-5 space-y-2 text-cyan-400/90">
              <li>
                กดปุ่ม <strong>"สร้าง iOS Profile (.mobileconfig)"</strong> ในส่วน Icon Studio ด้านบน เพื่อดาวน์โหลดไฟล์โปรไฟล์
              </li>
              <li>
                เปิดไฟล์ในเบราว์เซอร์ <strong>Safari</strong> บน iPhone หรือ iPad &gt; กดยอมรับการดาวน์โหลดโปรไฟล์
              </li>
              <li>
                ไปที่ <strong>การตั้งค่า (Settings) &gt; ดาวน์โหลดโปรไฟล์แล้ว (Profile Downloaded)</strong>
              </li>
              <li>
                กด <strong>"ติดตั้ง" (Install)</strong> มุมขวาบน แล้วใส่รหัสผ่านเครื่อง ไอคอนทั้งหมดจะปรากฏขึ้นบนหน้าจอโฮมของคุณทันที!
              </li>
            </ol>

            <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded text-amber-300 text-[11px] mt-3">
              ⚠️ หมายเหตุ: สามารถลบโปรไฟล์ออกได้ตลอดเวลาผ่าน <em>การตั้งค่า &gt; ทั่วไป &gt; VPN และการจัดการอุปกรณ์</em> โดยไม่ส่งผลกระทบต่อแอพจริงในเครื่อง
            </div>
          </div>
        </div>
      )}

      {/* Protocol 3: Android Guide */}
      {activePlatform === 'android' && (
        <div className="hud-panel p-6 rounded-2xl border border-cyan-500/30 bg-[#040c1e]/90 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40">
            <h4 className="text-base font-orbitron font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              วิธีเปลี่ยนไอคอนบน Android และแท็บเล็ต
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono-tech text-xs">
            <div className="p-4 bg-black/40 border border-cyan-900/40 rounded-xl space-y-2">
              <div className="font-bold text-white text-sm">
                วิธีที่ 1: ใช้แอพ "Shortcut Maker" (ง่ายที่สุด ไม่ต้องเปลี่ยน Launcher)
              </div>
              <p className="text-cyan-400/80 leading-relaxed">
                1. ดาวน์โหลดแอพ <strong>Shortcut Maker</strong> ได้ฟรีจาก Google Play Store<br />
                2. เปิดแอพ &gt; เลือกเมนู <strong>"Apps"</strong> &gt; เลือกแอพที่ต้องการเปลี่ยน เช่น LINE<br />
                3. แตะที่หัวข้อ <strong>"Icon" &gt; Image Gallery</strong> แล้วเลือกรูปภาพ J.A.R.V.I.S. ที่ดาวน์โหลดไว้<br />
                4. ปรับขนาดให้พอดี แล้วกด <strong>"Create Shortcut"</strong> ไอคอนจะถูกสร้างขึ้นบนหน้าจอโฮมทันที
              </p>
            </div>

            <div className="p-4 bg-black/40 border border-cyan-900/40 rounded-xl space-y-2">
              <div className="font-bold text-white text-sm">
                วิธีที่ 2: ใช้ Nova Launcher / Lawnchair / Smart Launcher
              </div>
              <p className="text-cyan-400/80 leading-relaxed">
                1. แตะค้างที่ไอคอนแอพบนหน้าจอโฮม &gt; เลือกเมนู <strong>แก้ไข (Edit / ดินสอ)</strong><br />
                2. แตะที่รูปไอคอน &gt; เลือก <strong>แกลเลอรี / Gallery Apps</strong><br />
                3. เลือกรูปไอคอน J.A.R.V.I.S. 1024x1024 ที่บันทึกไว้<br />
                4. กดบันทึก จะได้ไอคอนธีมไฮเทคทันทีโดยไม่ต้องสร้างทางลัดซ้ำซ้อน
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Protocol 4: Widgets Guide */}
      {activePlatform === 'widgets' && (
        <div className="hud-panel p-6 rounded-2xl border border-cyan-500/30 bg-[#040c1e]/90 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40">
            <h4 className="text-base font-orbitron font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              การติดตั้งวิดเจ็ตแสดงผลบนหน้าจอโฮม
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono-tech text-xs">
            <div className="p-4 bg-black/40 border border-cyan-900/40 rounded-xl space-y-2">
              <div className="font-bold text-white text-sm">
                🍎 สำหรับ iOS / iPadOS:
              </div>
              <ul className="list-disc pl-4 space-y-2 text-cyan-400/80">
                <li>
                  <strong>แอพ Widgetsmith:</strong> ดาวน์โหลด Widgetsmith จาก App Store &gt; สร้างวิดเจ็ตขนาด Medium หรือ Large &gt; เลือกรูปแบบ Photo &gt; นำรูปภาพที่ส่งออกจากแถบ Widgets ไปใส่ &gt; เพิ่ม Widgetsmith มายังหน้าจอโฮม
                </li>
                <li>
                  <strong>แอพ Scriptable (วิดเจ็ตสด):</strong> ติดตั้ง Scriptable &gt; กดคัดลอกโค้ดจากแท็บ Telemetry Widgets &gt; วางใน Scriptable &gt; เพิ่มวิดเจ็ตของ Scriptable ในหน้าโฮม จะแสดงเวลานาฬิกาดิจิทัลและแบตเตอรี่จริง!
                </li>
              </ul>
            </div>

            <div className="p-4 bg-black/40 border border-cyan-900/40 rounded-xl space-y-2">
              <div className="font-bold text-white text-sm">
                🤖 สำหรับ Android:
              </div>
              <ul className="list-disc pl-4 space-y-2 text-cyan-400/80">
                <li>
                  <strong>KWGT Kustom Widget:</strong> แอพยอดนิยมสำหรับการปรับแต่งหน้าจอไฮเทค วางการ์ดภาพ J.A.R.V.I.S. หรือตั้งค่าเซนเซอร์แสดงผลแบบตามเวลาจริง
                </li>
                <li>
                  <strong>Simple Photo Widget:</strong> ลากวิดเจ็ตวางบนหน้าจอโฮม แล้วเลือกภาพ J.A.R.V.I.S. Telemetry PNG ที่ดาวน์โหลดไว้
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
