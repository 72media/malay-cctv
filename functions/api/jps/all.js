// Cloudflare Pages Function: /api/jps/all
// ดึงทั้ง 9 เขตพร้อมกันฝั่งเซิร์ฟเวอร์ แล้วส่งกลับเป็น JSON ก้อนเดียว {"1":[...],"2":[...],...}
// เบราว์เซอร์ยิงคำขอครั้งเดียว แทน 9 ครั้งไปยังเซิร์ฟเวอร์ต้นทางที่ช้า
const UPSTREAM = 'https://infobanjirjps.selangor.gov.my/JPSAPI/api/CCTVS/GetCCTVsByDistrict/';

export async function onRequestGet() {
  const out = {};
  await Promise.all([1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (n) => {
    try {
      const r = await fetch(UPSTREAM + n, {
        headers: { accept: 'application/json' },
        signal: AbortSignal.timeout(10000),
        cf: { cacheTtl: 60, cacheEverything: true },
      });
      if (r.ok) out[n] = await r.json();
    } catch (e) { /* เขตที่พลาดจะถูกข้าม ให้เบราว์เซอร์ลองดึงรายเขตเอง */ }
  }));
  return new Response(JSON.stringify(out), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=60' },
  });
}
