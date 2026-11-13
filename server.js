/* ============ FABLE.set — سرور (بدون نیاز به نصب هیچ بسته‌ای) ============
   اجرا:  node server.js
   اطلاعات: پوشه data  |  عکس‌ها: پوشه uploads  |  بک‌آپ خودکار: data/backups */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.join(ROOT, 'data');
const UPLOAD_DIR = path.join(ROOT, 'uploads');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');

for (const d of [DATA_DIR, UPLOAD_DIR, BACKUP_DIR]) fs.mkdirSync(d, { recursive: true });

/* ---------- ذخیره‌سازی فایلی (امن در برابر قطع برق) ---------- */
function writeJsonAtomic(file, obj) {
    const tmp = file + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), 'utf8');
    fs.renameSync(tmp, file);
}
function readJson(file, fallback) {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return fallback; }
}
let db = readJson(DB_FILE, { products: null, about: '', articles: null, settings: null });

function dailyBackup() {
    const d = new Date();
    const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    try {
        fs.copyFileSync(DB_FILE, path.join(BACKUP_DIR, `db-${stamp}.json`));
        const files = fs.readdirSync(BACKUP_DIR).filter(f => /^db-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
        files.slice(0, Math.max(0, files.length - 30)).forEach(f => fs.unlinkSync(path.join(BACKUP_DIR, f)));
    } catch (e) { /* بک‌آپ شکست خورد؛ سایت ادامه می‌دهد */ }
}
function saveDb() { writeJsonAtomic(DB_FILE, db); dailyBackup(); }

/* ---------- رمز مدیر (به‌صورت هش ذخیره می‌شود، نه خود رمز) ---------- */
function hashPass(pass, salt) {
    return crypto.scryptSync(String(pass), salt, 64).toString('hex');
}
function setAdminPass(pass) {
    const salt = crypto.randomBytes(16).toString('hex');
    writeJsonAtomic(ADMIN_FILE, { salt, hash: hashPass(pass, salt) });
}
function checkAdminPass(pass) {
    const a = readJson(ADMIN_FILE, null);
    if (!a) return false;
    const got = Buffer.from(hashPass(pass, a.salt), 'hex');
    const want = Buffer.from(a.hash, 'hex');
    return got.length === want.length && crypto.timingSafeEqual(got, want);
}

/* ---------- نشست‌ها و محدودیت تلاش ورود ---------- */
const sessions = new Map(); /* token → زمان انقضا */
const SESSION_MS = 7 * 24 * 3600 * 1000;
const fails = new Map();    /* ip → { n, until } */

function getCookie(req, name) {
    const c = req.headers.cookie || '';
    const m = c.split(';').map(s => s.trim()).find(s => s.startsWith(name + '='));
    return m ? m.slice(name.length + 1) : '';
}
function isAdmin(req) {
    const t = getCookie(req, 'fable_sid');
    const exp = sessions.get(t);
    if (!exp) return false;
    if (exp < Date.now()) { sessions.delete(t); return false; }
    return true;
}
function clientIp(req) { return req.socket.remoteAddress || 'x'; }

/* ---------- ابزارهای پاسخ ---------- */
function send(res, code, body, headers = {}) {
    const isObj = body !== null && typeof body === 'object' && !Buffer.isBuffer(body);
    res.writeHead(code, {
        'Content-Type': isObj ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store',
        ...headers,
    });
    res.end(isObj ? JSON.stringify(body) : body);
}
function readBody(req, limit) {
    return new Promise((resolve, reject) => {
        let size = 0; const chunks = [];
        req.on('data', c => {
            size += c.length;
            if (size > limit) { reject(Object.assign(new Error('big'), { code: 413 })); req.destroy(); return; }
            chunks.push(c);
        });
        req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        req.on('error', reject);
    });
}
async function readJsonBody(req, limit) {
    if (!(req.headers['content-type'] || '').startsWith('application/json')) {
        throw Object.assign(new Error('type'), { code: 415 });
    }
    try { return JSON.parse(await readBody(req, limit)); }
    catch (e) { throw Object.assign(new Error('json'), { code: e.code || 400 }); }
}

/* ---------- عکس‌ها ---------- */
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

function looksLikeImage(buf, mime) {
    if (mime === 'image/jpeg') return buf[0] === 0xFF && buf[1] === 0xD8;
    if (mime === 'image/png') return buf.slice(0, 4).toString('hex') === '89504e47';
    if (mime === 'image/webp') return buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP';
    return false;
}
function saveDataUrl(dataUrl) {
    const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl || '');
    if (!m) return null;
    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > 4 * 1024 * 1024 || !looksLikeImage(buf, m[1])) return null;
    const name = crypto.randomBytes(12).toString('hex') + '.' + EXT[m[1]];
    fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
    return '/uploads/' + name;
}
/* عکس‌های قدیمیِ داخل خود داده (data:image...) را به فایل واقعی تبدیل می‌کند */
function externalize(v) {
    if (typeof v === 'string' && v.startsWith('data:image/')) return saveDataUrl(v) || '';
    return v;
}

/* ---------- اعتبارسنجی داده‌ها ---------- */
const str = (v, max) => String(v == null ? '' : v).slice(0, max);
const int = v => Math.max(0, Math.round(Number(v) || 0));

function cleanProducts(list) {
    if (!Array.isArray(list) || list.length > 2000) return null;
    const out = [];
    for (const p of list) {
        if (!p || typeof p !== 'object' || !str(p.name, 200).trim()) return null;
        const price = int(p.price);
        const old = p.old ? int(p.old) : null;
        out.push({
            id: Number.isFinite(+p.id) ? +p.id : Date.now() + out.length,
            name: str(p.name, 200),
            cat: str(p.cat, 60),
            sub: str(p.sub, 60),
            price,
            old: old && old > price ? old : null,
            off: old && old > price ? Math.round(((old - price) / old) * 100) : 0,
            sizes: Array.isArray(p.sizes) ? p.sizes.slice(0, 30).map(s => str(s, 20)) : [],
            img: str(externalize(p.img), 500),
            img2: str(externalize(p.img2), 500),
            img3: str(externalize(p.img3), 500),
            /* موجودی: خالی (null) = بدون محدودیت، ۰ = ناموجود */
            stock: p.stock === null || p.stock === undefined || p.stock === '' || !Number.isFinite(Number(p.stock)) ? null : int(p.stock),
        });
    }
    return out;
}
function cleanArticles(list) {
    if (!Array.isArray(list) || list.length > 500) return null;
    return list.filter(a => a && typeof a === 'object').map((a, i) => ({
        id: str(a.id || 'a' + (i + 1), 40),
        date: str(a.date, 60),
        title: str(a.title, 300),
        img: str(externalize(a.img), 500),
        body: str(a.body, 20000),
    }));
}

/* تنظیمات صفحه اصلی: اسلایدر و کادرهای دسته‌بندی */
function cleanSettings(st) {
    if (!st || typeof st !== 'object') return null;
    const h = st.hero && typeof st.hero === 'object' ? st.hero : {};
    const slides = Array.isArray(h.slides)
        ? h.slides.slice(0, 8).map(u => str(externalize(u), 500)).filter(Boolean) : [];
    const banners = Array.isArray(st.banners)
        ? st.banners.slice(0, 8).filter(b => b && typeof b === 'object').map(b => ({
            filter: str(b.filter, 60),
            name: str(b.name, 60),
            img: str(externalize(b.img), 500),
        })) : [];
    return {
        hero: {
            label: str(h.label, 60),
            title: str(h.title, 200),
            interval: Math.min(30, Math.max(2, Math.round(Number(h.interval)) || 5)),
            slides,
        },
        banners,
    };
}

/* ---------- فایل‌های سایت (فقط همین چند فایل قابل دیدن است) ---------- */
const STATIC = {
    '/': ['index.html', 'text/html; charset=utf-8'],
    '/index.html': ['index.html', 'text/html; charset=utf-8'],
    '/script.js': ['script.js', 'text/javascript; charset=utf-8'],
    '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
};
function serveFile(res, file, type) {
    fs.readFile(file, (err, buf) => {
        if (err) return send(res, 404, 'پیدا نشد');
        res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
        res.end(buf);
    });
}

/* ---------- مسیرها ---------- */
const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x');
    const p = url.pathname;
    try {
        /* --- API --- */
        if (p === '/api/data' && req.method === 'GET') {
            return send(res, 200, { products: db.products, about: db.about, articles: db.articles, settings: db.settings || null });
        }
        if (p === '/api/me' && req.method === 'GET') {
            return send(res, 200, { admin: isAdmin(req) });
        }
        if (p === '/api/login' && req.method === 'POST') {
            const ip = clientIp(req);
            const f = fails.get(ip);
            if (f && f.until > Date.now()) return send(res, 429, { error: 'too_many' });
            const body = await readJsonBody(req, 10 * 1024);
            if (checkAdminPass(body.password)) {
                fails.delete(ip);
                const t = crypto.randomBytes(32).toString('hex');
                sessions.set(t, Date.now() + SESSION_MS);
                const secure = req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
                return send(res, 200, { ok: true }, {
                    'Set-Cookie': `fable_sid=${t}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_MS / 1000}${secure}`,
                });
            }
            const n = (f ? f.n : 0) + 1;
            fails.set(ip, { n, until: n >= 5 ? Date.now() + 10 * 60 * 1000 : 0 });
            return send(res, 401, { error: 'bad_password' });
        }
        if (p === '/api/logout' && req.method === 'POST') {
            sessions.delete(getCookie(req, 'fable_sid'));
            return send(res, 200, { ok: true }, { 'Set-Cookie': 'fable_sid=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0' });
        }

        /* از اینجا به بعد فقط مدیر وارد‌شده */
        if (p.startsWith('/api/')) {
            if (!isAdmin(req)) return send(res, 401, { error: 'login_required' });

            if (p === '/api/data' && req.method === 'PUT') {
                const body = await readJsonBody(req, 40 * 1024 * 1024);
                const products = cleanProducts(body.products);
                const articles = body.articles == null ? db.articles : cleanArticles(body.articles);
                if (!products || (body.articles != null && !articles)) return send(res, 400, { error: 'bad_data' });
                db.products = products;
                db.articles = articles;
                if (typeof body.about === 'string') db.about = str(body.about, 5000);
                if (body.settings !== undefined) db.settings = cleanSettings(body.settings);
                saveDb();
                return send(res, 200, { ok: true, products: db.products, articles: db.articles, settings: db.settings || null });
            }
            if (p === '/api/upload' && req.method === 'POST') {
                const body = await readJsonBody(req, 8 * 1024 * 1024);
                const u = saveDataUrl(body.dataUrl);
                if (!u) return send(res, 400, { error: 'bad_image' });
                return send(res, 200, { url: u });
            }
            if (p === '/api/password' && req.method === 'POST') {
                const body = await readJsonBody(req, 10 * 1024);
                const np = String(body.password || '');
                if (np.length < 6) return send(res, 400, { error: 'short' });
                setAdminPass(np);
                sessions.clear(); /* همه باید دوباره وارد شوند */
                return send(res, 200, { ok: true }, { 'Set-Cookie': 'fable_sid=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0' });
            }
            return send(res, 404, { error: 'not_found' });
        }

        /* --- فایل‌ها --- */
        if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'مجاز نیست');
        if (STATIC[p]) return serveFile(res, path.join(ROOT, STATIC[p][0]), STATIC[p][1]);
        const up = /^\/uploads\/([a-f0-9]{24}\.(jpg|png|webp))$/.exec(p);
        if (up) {
            const file = path.join(UPLOAD_DIR, up[1]);
            return fs.readFile(file, (err, buf) => {
                if (err) return send(res, 404, 'پیدا نشد');
                res.writeHead(200, { 'Content-Type': MIME[up[2]], 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'public, max-age=31536000, immutable' });
                res.end(buf);
            });
        }
        return send(res, 404, 'پیدا نشد');
    } catch (e) {
        const code = e && [400, 413, 415].includes(e.code) ? e.code : 500;
        if (code === 500) console.error(e);
        if (!res.headersSent) send(res, code, { error: 'request_failed' });
    }
});

/* ---------- راه‌اندازی: رمز مدیر در اولین اجرا ---------- */
function ask(q) {
    return new Promise(resolve => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question(q, a => { rl.close(); resolve(a.trim()); });
    });
}
async function ensureAdmin() {
    if (fs.existsSync(ADMIN_FILE)) return;
    let pass = process.env.ADMIN_PASSWORD || '';
    if (!pass && process.stdin.isTTY) {
        console.log('\nاولین اجرا: یک رمز برای پنل مدیریت انتخاب کن.');
        while (pass.length < 6) {
            pass = await ask('رمز (حداقل ۶ کاراکتر): ');
            if (pass.length < 6) console.log('⚠️ رمز کوتاه است.');
        }
    }
    if (!pass) {
        pass = crypto.randomBytes(9).toString('base64url');
        console.log('\n⚠️ رمز مدیریت به‌صورت خودکار ساخته شد (فقط همین یک بار نمایش داده می‌شود): ' + pass);
    }
    setAdminPass(pass);
    console.log('✔ رمز مدیریت ذخیره شد.\n');
}

ensureAdmin().then(() => {
    if (!fs.existsSync(DB_FILE)) writeJsonAtomic(DB_FILE, db);
    server.listen(PORT, () => {
        console.log(`✔ سایت روشن شد:  http://localhost:${PORT}`);
        console.log('  برای ورود به پنل مدیریت، ۳ بار روی لوگو کلیک کن یا آخر آدرس #admin بنویس.');
        console.log('  برای خاموش کردن: Ctrl + C');
    });
});
