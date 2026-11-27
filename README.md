# KL-CCTV

แผนที่กล้อง CCTV ภาพนิ่งสถานการณ์น้ำ กัวลาลัมเปอร์ / สลังงอร์
ข้อมูลจาก InfoBanjir JPS Selangor (https://infobanjirjps.selangor.gov.my)

## โครงสร้าง

```
index.html                  หน้าเว็บทั้งหมด (HTML + CSS + JS)
functions/api/jps/[id].js   Cloudflare Pages Function ตัวกลางดึงข้อมูล (แก้ CORS)
```

## ขึ้นเว็บด้วย GitHub + Cloudflare Pages

1. สร้างรีโปบน GitHub แล้วอัปโหลดไฟล์ทั้งสองข้างต้น (รักษาโฟลเดอร์ `functions/` ไว้)
2. เข้า Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
3. เลือกรีโปนี้ แล้วตั้งค่า
   - Framework preset: None
   - Build command: เว้นว่าง
   - Build output directory: `/` (ราก)
4. กด Save and Deploy ได้ลิงก์รูปแบบ `https://ชื่อโปรเจกต์.pages.dev`

ทุกครั้งที่ push เข้า GitHub Cloudflare จะ deploy ใหม่ให้อัตโนมัติ

## ทดสอบ

- เปิด `https://ชื่อโปรเจกต์.pages.dev/api/jps/1` ต้องเห็น JSON รายการกล้อง
- รันในเครื่องด้วย Live Server จะยังไม่มี `/api/jps/` เว็บจะเรียก API ต้นทางตรง
  (ต้องเปิดส่วนขยาย Allow CORS) ถ้าต้องการลองฟังก์ชันในเครื่อง ใช้ `npx wrangler pages dev .`

## หมายเหตุ

- รูปกล้องโหลดตรงจากเซิร์ฟเวอร์ JPS (ลิงก์ http ถูกแปลงเป็น https อัตโนมัติ)
- ถ้ารูปไม่ขึ้นเมื่อเปิดจากโดเมนจริง ให้ตั้งค่า `IMG_PROXY` ใน `index.html`
