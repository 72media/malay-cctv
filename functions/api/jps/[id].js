// Cloudflare Pages Function: /api/jps/1 ... /api/jps/9
// ตัวกลางดึงข้อมูลกล้องจาก JPS Selangor เพื่อเลี่ยงปัญหา CORS ในเบราว์เซอร์
const UPSTREAM = 'https://infobanjirjps.selangor.gov.my/JPSAPI/api/CCTVS/GetCCTVsByDistrict/';

export async function onRequestGet({ params }) {
  const id = String(params.id || '');
  if (!/^[1-9]$/.test(id)) {
    return new Response(JSON.stringify({ error: 'district must be 1-9' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
  try {
    const r = await fetch(UPSTREAM + id, {
      headers: { accept: 'application/json' },
      cf: { cacheTtl: 60, cacheEverything: true },
    });
    return new Response(r.body, {
      status: r.status,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=60',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'upstream unreachable' }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }
}

