/* ============ سبزپوش — Store Logic (مردانه) ============ */

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 4 4%27%3E%3Crect width=%274%27 height=%274%27 fill=%27%23bab3a5%27/%3E%3C/svg%3E";

const BASE_PRODUCTS = [
    /* --- کفش (ونس — بدون تخفیف) --- */
    { id: 1, name: 'کفش ونس مشکی',  cat: 'کفش', sub: '',   price: 118000000, old: null, off: 0, sizes: ['۴۰', '۴۱', '۴۲', '۴۳', '۴۴'], img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    { id: 2, name: 'کفش ونس سفید',  cat: 'کفش', sub: '',   price: 118000000, old: null, off: 0, sizes: ['۴۰', '۴۱', '۴۲', '۴۳', '۴۴'], img: 'https://images.unsplash.com/photo-1514989940723-e8e5e35c857a?w=500&q=80' },
    { id: 3, name: 'کفش ونس سبز',   cat: 'کفش', sub: '',   price: 118000000, old: null, off: 0, sizes: ['۴۰', '۴۱', '۴۲', '۴۳', '۴۴'], img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80' },
    { id: 4, name: 'کفش ونس طوسی',  cat: 'کفش', sub: '',   price: 118000000, old: null, off: 0, sizes: ['۴۰', '۴۱', '۴۲', '۴۳', '۴۴'], img: 'https://images.unsplash.com/photo-1491558096218-364e15761b17?w=500&q=80' },
    { id: 5, name: 'کفش ونس کرم',   cat: 'کفش', sub: '',   price: 118000000, old: null, off: 0, sizes: ['۴۰', '۴۱', '۴۲', '۴۳', '۴۴'], img: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80' },
    /* --- پیراهن --- */
    { id: 6, name: 'پیراهن مردانه آستین بلند', cat: 'پیراهن', sub: '', price: 1690000, old: null,   off: 0, sizes: ['M', 'L', 'XL', '2XL'], img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80' },
    { id: 7, name: 'پیراهن مردانه آستین کوتاه', cat: 'پیراهن', sub: '', price: 990000,  old: 1150000, off: 14, sizes: ['M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80' },
    /* --- کت --- */
    { id: 8,  name: 'کت تک مردانه نیم آستر',   cat: 'کت',    sub: '', price: 1689000, old: null,    off: 0,  sizes: ['۴۸', '۵۰', '۵۲', '۵۴'], img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80' },
    { id: 9,  name: 'کت لینن سافاری',          cat: 'کت',    sub: '', price: 1450000, old: 1750000, off: 17, sizes: ['۴۸', '۵۰', '۵۲'], img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80' },
    /* --- کاپشن --- */
    { id: 10, name: 'کاپشن پافر زمستانی',      cat: 'کاپشن', sub: '', price: 2350000, old: null,    off: 0,  sizes: ['M', 'L', 'XL', '2XL'], img: 'https://images.unsplash.com/photo-1548883354-94bc938a9f24?w=500&q=80' },
    { id: 11, name: 'کاپشن چرم مردانه',        cat: 'کاپشن', sub: '', price: 3890000, old: 4400000, off: 12, sizes: ['M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' },
    /* --- بافت --- */
    { id: 12, name: 'بافت مردانه یقه دار',     cat: 'بافت',  sub: '', price: 1249000, old: null,    off: 0,  sizes: ['M', 'L', 'XL', '2XL'], img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80' },
    { id: 13, name: 'بافت نیم زیپ یقه ایستاده', cat: 'بافت', sub: '', price: 1299000, old: null,    off: 0,  sizes: ['M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500&q=80' },
    /* --- دورس و هودی --- */
    { id: 14, name: 'دورس آستین بلند مردانه',  cat: 'دورس و هودی', sub: '', price: 798000, old: null,    off: 0,  sizes: ['S', 'M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1556821840-6aedd276c8f2?w=500&q=80' },
    { id: 15, name: 'هودی مردانه طرح‌دار',     cat: 'دورس و هودی', sub: '', price: 899000, old: 1090000, off: 18, sizes: ['M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&q=80' },
    /* --- شلوار (با زیرشاخه) --- */
    { id: 16, name: 'شلوار پارچه‌ای مردانه واید', cat: 'شلوار', sub: 'پارچه‌ای', price: 1590000, old: null,    off: 0,  sizes: ['۴۲', '۴۴', '۴۶', '۴۸'], img: 'https://images.unsplash.com/photo-1584372154936-0764aad93605?w=500&q=80' },
    { id: 17, name: 'شلوار کتان تابستانی',       cat: 'شلوار', sub: 'کتان',     price: 1390000, old: 1590000, off: 12, sizes: ['۴۲', '۴۴', '۴۶'], img: 'https://images.unsplash.com/photo-1478176693424-cf1794364316?w=500&q=80' },
    { id: 18, name: 'شلوار جین اسلش',            cat: 'شلوار', sub: 'جین',      price: 1290000, old: 1490000, off: 13, sizes: ['۴۲', '۴۴', '۴۶'], img: 'https://images.unsplash.com/photo-1604176354204-fe04db295133?w=500&q=80' },
    { id: 19, name: 'شلوار سیلک فانتزی',         cat: 'شلوار', sub: 'سیلک',     price: 1990000, old: null,    off: 0,  sizes: ['۴۲', '۴۴', '۴۸'], img: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&q=80' },
];

/* ============ ذخیره‌سازی محصولات (دائمی) ============
   مهاجرت: داده‌های قدیمی fable-custom (overrides) → آرایه کامل fable-products */
let customProducts = {};
try { customProducts = JSON.parse(localStorage.getItem('fable-custom') || '{}') || {}; } catch (e) { customProducts = {}; }

let PRODUCTS;
function loadProducts() {
    try {
        const saved = JSON.parse(localStorage.getItem('fable-products') || 'null');
        if (Array.isArray(saved) && saved.length && saved.every(p => p && p.name)) return saved;
    } catch (e) { /* خراب → پیش‌فرض */ }
    return BASE_PRODUCTS.map(p => ({ ...p, ...(customProducts[p.id] || {}) }));
}
PRODUCTS = loadProducts();
function persistProducts() {
    try { localStorage.setItem('fable-products', JSON.stringify(PRODUCTS)); }
    catch (e) { /* مهم نیست؛ ذخیره اصلی روی سرور انجام می‌شود */ }
    serverSaveAll();
}

/* ============ ارتباط با سرور ============ */
function sessionExpired() {
    try { sessionStorage.removeItem('fable-admin'); } catch (e) { /* مهم نیست */ }
    updateAdminLink();
    closeAdmin();
    showToast('⚠️ نشست مدیریت تمام شده — دوباره وارد شو');
    openLogin();
}

/* ذخیره کل اطلاعات روی سرور (پشت سر هم، تا چند ذخیره با هم قاطی نشوند) */
let saveChain = Promise.resolve(false);
function serverSaveAll() {
    saveChain = saveChain.then(async () => {
        try {
            const r = await fetch('/api/data', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products: PRODUCTS, about: aboutText, articles: ARTICLES, settings: SETTINGS }),
            });
            if (r.status === 401) { sessionExpired(); return false; }
            if (!r.ok) throw new Error('save');
            const d = await r.json();
            if (Array.isArray(d.products)) { PRODUCTS.length = 0; d.products.forEach(p => PRODUCTS.push(p)); }
            if (Array.isArray(d.articles)) { ARTICLES.length = 0; d.articles.forEach(a => ARTICLES.push(a)); }
            return true;
        } catch (e) {
            showToast('⚠️ ذخیره روی سرور انجام نشد — اتصال یا سرور را چک کن');
            return false;
        }
    });
    return saveChain;
}

/* آپلود عکس روی سرور؛ آدرس عکس را برمی‌گرداند (یا null) */
async function uploadImage(dataURL) {
    try {
        const r = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataUrl: dataURL }),
        });
        if (r.status === 401) { sessionExpired(); return null; }
        if (!r.ok) return null;
        return (await r.json()).url;
    } catch (e) { return null; }
}

/* ---------- مقاله‌ها و درباره ما (قابل ویرایش از پنل) ---------- */
const BASE_ARTICLES = [
    {
        id: 'a1', date: '۲۱ مهر ۱۴۰۵',
        title: 'راهنمای خرید کت مردانه؛ چه کتی به اندام شما می‌آید؟',
        img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
        body: 'کت، پادشاه کمد مردانه است؛ اما همه کت‌ها به همه اندام‌ها نمی‌آیند.\n\nاگر لاغر و کشیده هستید، کت با شانه‌های سایز درست بهترین انتخاب است. اگر اندام درشت‌تری دارید، از کت‌های تک‌دکمه با یقه لبه‌ای استفاده کنید که خط عمودی بدن را طولانی‌تر نشان می‌دهد.\n\nدر نهایت، طول کت باید دقیقاً پایه نشیمنگاه را بپوشاند؛ نه کوتاه‌تر و نه بلندتر. این ساده‌ترین قاعده طلایی کت خوب است.'
    },
    {
        id: 'a2', date: '۲ شهریور ۱۴۰۵',
        title: '۵ کفش که با هر شلواری جواب می‌دهد',
        img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80',
        body: 'یک کمد ساده بدون کفش درست کامل نمی‌شود.\n\nکتانی سفید مینیمال با شلوار جین و حتی شلوار پارچه‌ای جواب می‌دهد؛ لیفتر کرم برای استایل اسپرت‌اسمارت عالی است؛ بوت چرم مشکی برای نیمه‌رسمی و زمستان؛ صندل چرمی برای تابستان؛ و در نهایت کفش لیدر برای مهم‌ترین جلسه‌ها.\n\nقاعده کلی: هرچه ساده‌تر، با هر شلواری جواب‌ده‌تر.'
    },
    {
        id: 'a3', date: '۱۵ مرداد ۱۴۰۵',
        title: 'چطور بافت را با دورس و هودی ست کنیم؟',
        img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80',
        body: 'ترکیب بافت با دورس و هودی، حس اسپرت‌اسمارت می‌دهد و برای پاییز فوق‌العاده است.\n\nپیشنهاد ما: بافت سبک یقه گرد روی هودی ساده خاکی، شلوار جین تیره و کتانی سفید. اگر گرم شدی، بافت را روی شانه‌هایت بینداز؛ استایل را کامل می‌کند.'
    },
];

function safeParse(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key) || 'null'); return v && typeof v === 'object' ? v : fallback; } catch (e) { return fallback; }
}
const articleCustom = safeParse('fable-articles', {});
const ARTICLES = BASE_ARTICLES.map(a => ({ ...a, ...(articleCustom[a.id] || {}) }));

const BASE_ABOUT = 'فِیبل ست از سال ۱۳۹۸ با یک هدف ساده شروع کرد: پوشاک مردانه باکیفیت با قیمت منصفانه. ما مستقیماً از تولیدکنندگان داخلی تأمین می‌کنیم، روی دوخت و پارچه وسواس داریم و باور داریم شیک بودن ربطی به گران بودن ندارد. هر محصول ۷ روز ضمانت بازگشت دارد و ارسال به سراسر کشور در کمتر از ۴۸ ساعت انجام می‌شود.';
let aboutText;
/* تنظیمات صفحه اصلی (اسلایدر بالا و کادرهای دسته‌بندی) — از سرور می‌آید */
let SETTINGS = safeParse('fable-settings', {});
try { aboutText = localStorage.getItem('fable-about') || BASE_ABOUT; } catch (e) { aboutText = BASE_ABOUT; }

/* راه‌اندازی محتوای ویرایش‌پذیر (باید بعد از تعریف $ و DOM صدا زده شود) */
function initContent() {
    $('#aboutText').textContent = aboutText;
    renderBlog();
}

/* رندر مقاله‌ها */
function renderBlog() {
    $('#blogGrid').innerHTML = ARTICLES.map(a => `
        <article class="blog-card">
            <img src="${a.img}" alt="${a.title}" onclick="openArticle('${a.id}')"
                 onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
            <div class="blog-body">
                <span class="blog-date">${a.date}</span>
                <h3>${a.title}</h3>
                <a class="see-link" onclick="openArticle('${a.id}')">ادامه مطلب ←</a>
            </div>
        </article>`).join('');
}

/* ---------- صفحه خواندن مقاله ---------- */
function openArticle(id) {
    const a = ARTICLES.find(a => a.id === id);
    if (!a) return;
    $('#artImg').src = a.img;
    $('#artDate').textContent = a.date;
    $('#artTitle').textContent = a.title;
    $('#artBody').innerHTML = (a.body || '').split(/\n\s*\n/).filter(p => p.trim())
        .map(p => `<p>${p.trim()}</p>`).join('');
    const m = $('#articleModal');
    m.classList.add('open'); document.body.classList.add('pm-open'); m.scrollTop = 0;
}

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const toFa = n => n.toLocaleString('fa-IR');
const fmt = n => toFa(n).replace(/,/g, '.'); /* قیمت‌ها با نقطه: ۱۱۸.۰۰۰.۰۰۰ */

/* ---------- Hamburger menu ---------- */
const menuDrawer = $('#menuDrawer');
const productsToggle = $('#productsToggle');
const submenu = $('#submenu');

$('#menuBtn').addEventListener('click', () => menuDrawer.classList.toggle('open'));

productsToggle.addEventListener('click', () => {
    productsToggle.classList.toggle('open');
    submenu.classList.toggle('open');
});

/* کلیک روی گزینه «شلوار» در زیرمنو → باز شدن زیرشاخه‌ها */
$('#pantsToggle').addEventListener('click', () => {
    $('#pantsToggle').classList.toggle('open');
    $('#pantsList').classList.toggle('open');
});

/* کلیک روی بچه‌های زیرمنو (دسته یا زیرشاخه شلوار) → فیلتر + اسکرول به محصولات */
document.querySelectorAll('.sub-link[data-filter]').forEach(link => {
    link.addEventListener('click', () => {
        const f = link.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => {
            const matches = b.dataset.filter === f ||
                (b.dataset.filter === 'شلوار' && ['پارچه‌ای', 'کتان', 'جین', 'سیلک'].includes(f)) ||
                (['پارچه‌ای', 'کتان', 'جین', 'سیلک'].includes(f) && b.dataset.filter === 'شلوار');
            b.classList.toggle('active', matches);
        });
        renderProducts(f);
        closeMenu();
    });
});

/* کلیک روی کادرهای دسته‌بندی صفحه اول */
document.querySelectorAll('.cat-banner').forEach(card => {
    card.addEventListener('click', () => {
        const f = card.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.filter === f));
        renderProducts(f);
    });
});

document.querySelectorAll('.menu-link:not(.menu-toggle)').forEach(l =>
    l.addEventListener('click', closeMenu));

function closeMenu() {
    menuDrawer.classList.remove('open');
    document.querySelectorAll('.menu-toggle').forEach(l => l.classList.remove('open'));
}

/* کلیک بیرون منو → بستن */
document.addEventListener('click', e => {
    if (!menuDrawer.contains(e.target) && !e.target.closest('#menuBtn') && !e.target.closest('#productsToggle')) {
        closeMenu();
    }
});

/* ---------- Render Products ---------- */
const grid = $('#productGrid');
const selectedSize = {};

/* ---- عکس‌ها و موجودی ---- */
const imgsOf = p => [p.img, p.img2, p.img3].filter(Boolean);
const isSoldOut = p => typeof p.stock === 'number' && p.stock <= 0;
const cartQtyOf = id => cart.filter(i => i.id === id).reduce((n, i) => n + i.qty, 0);
const escA = v => String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escT = v => String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/* ---------- صفحه اصلی: اسلایدر بالا و کادرهای دسته‌بندی ---------- */
let heroTimer = null;
function applySettings() {
    const st = SETTINGS || {};
    const h = st.hero || {};
    if (h.label) $('#heroLabel').textContent = h.label;
    if (h.title) $('#heroTitle').textContent = h.title;

    const box = $('#heroBox');
    const first = $('#heroFirstImg');
    box.querySelectorAll('.hero-extra').forEach(n => n.remove());
    clearInterval(heroTimer);
    const slides = Array.isArray(h.slides) ? h.slides.filter(Boolean) : [];
    if (slides.length) {
        const setAr = () => {
            if (first.naturalWidth && first.naturalHeight) {
                const r = Math.min(1.8, Math.max(0.5, first.naturalWidth / first.naturalHeight));
                box.style.setProperty('--ar', r.toFixed(4));
            }
        };
        first.onload = setAr;
        first.src = slides[0];
        if (first.complete) setAr();
        first.classList.add('hero-slide', 'active');
        slides.slice(1).forEach(src => {
            const im = document.createElement('img');
            im.src = src; im.alt = ''; im.className = 'hero-slide hero-extra';
            im.onerror = () => { im.onerror = null; im.src = PLACEHOLDER; };
            box.appendChild(im);
        });
        if (slides.length > 1) {
            let k = 0;
            const all = () => box.querySelectorAll('img.hero-slide');
            heroTimer = setInterval(() => {
                const list = all();
                list[k].classList.remove('active');
                k = (k + 1) % list.length;
                list[k].classList.add('active');
            }, Math.max(2, +h.interval || 5) * 1000);
        }
    }

    const bn = Array.isArray(st.banners) ? st.banners : [];
    document.querySelectorAll('.cat-banner').forEach(c => {
        const f = c.dataset.filter;
        const b = bn.find(x => x.filter === f);
        if (b && b.img) c.querySelector('.cb-media img').src = b.img;
        if (b && b.name) c.querySelector('.cb-name').textContent = b.name;
        /* قیمت «شروع از» خودکار از ارزان‌ترین محصول همان دسته */
        const list = PRODUCTS.filter(p => p.cat === f || p.sub === f);
        const priceEl = c.querySelector('.cb-price');
        if (list.length && priceEl) {
            priceEl.innerHTML = `شروع قیمت از <b>${fmt(Math.min(...list.map(p => p.price)))}</b>`;
        }
    });
}

function renderProducts(filter = 'همه') {
    const SUBPANTS = ['پارچه‌ای', 'کتان', 'جین', 'سیلک'];
    const list = filter === 'همه' ? PRODUCTS
        : PRODUCTS.filter(p => p.cat === filter || p.sub === filter);
    $('#productCount').textContent = `${toFa(list.length)} محصول`;
    grid.innerHTML = list.map((p, i) => {
        return `
        <article class="product${isSoldOut(p) ? ' soldout' : ''}" style="animation-delay:${i * 50}ms" onclick="openProduct(${p.id})">
            <div class="product-media">
                ${p.off ? `<span class="off-badge">${toFa(p.off)}٪</span>` : ''}
                ${isSoldOut(p) ? '<span class="soldout-badge">ناموجود</span>' : ''}
                <button class="wish-btn" onclick="event.stopPropagation();toggleWish(this,${p.id})" aria-label="علاقه‌مندی">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <img src="${p.img || PLACEHOLDER}" alt="${p.name}" loading="lazy"
                     onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
            </div>
            <div class="product-body">
                <span class="product-name">${p.name}</span>
                <div class="product-price">
                    ${p.old ? `<span class="price-old">${fmt(p.old)}</span>` : ''}
                    <span class="price-now">${fmt(p.price)}</span>
                    <span class="price-unit">تومان</span>
                </div>
                <div class="product-hover-bar">
                    <button class="cart-add" aria-label="افزودن به سبد" onclick="event.stopPropagation();addToCart(${p.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1h-13a1 1 0 0 1-1-1.1L6 7z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>
                    </button>
                </div>
            </div>
        </article>`;
    }).join('');
    applySettings();
}
renderProducts();
grid.style.visibility = 'hidden'; /* تا رسیدن اطلاعات از سرور */
setTimeout(() => { grid.style.visibility = ''; }, 3000);

/* ---------- Product Detail Page + Draggable Gallery ---------- */
const pm = $('#productModal');
const track = $('#pmTrack');
let pmId = null, pmIndex = 0, pmQty = 1, pmImages = [];

/* سه زاویه از همان عکس محصول برای گالری */
function galleryOf(p) {
    const real = imgsOf(p);
    if (real.length > 1) return real;
    const base = String(p.img || '').split('?')[0];
    if (!/images\.unsplash\.com/.test(base)) return real.length ? real : [PLACEHOLDER];
    return [
        `${base}?w=900&q=80`,
        `${base}?w=900&q=80&flip=h`,
        `${base}?w=900&h=1000&fit=crop&crop=entropy&q=80`,
    ];
}

function openProduct(id) {
    const p = PRODUCTS.find(p => p.id === id);
    pmId = id; pmIndex = 0; pmQty = 1;
    pmImages = galleryOf(p);

    $('#pmCat').textContent = p.cat + (p.sub ? ' · ' + p.sub : '');
    $('#pmName').textContent = p.name;
    $('#pmPrice').innerHTML = `
        ${p.old ? `<span class="price-old">${fmt(p.old)}</span>` : ''}
        <span class="price-now">${fmt(p.price)}</span>
        <span class="price-unit">تومان</span>`;

    /* سایزها فقط اینجا، نه روی کارت */
    selectedSize[id] = selectedSize[id] || p.sizes[0] || null;
    $('#pmSizes').innerHTML = p.sizes.length ? `
        <span class="pm-sizes-label">انتخاب سایز:</span>
        <div class="pm-size-row">${p.sizes.map(s =>
            `<button class="size-btn ${selectedSize[id] === s ? 'selected' : ''}"
                onclick="pickSize(${p.id},'${s}')">${s}</button>`).join('')}</div>`
        : '<span class="pm-sizes-label">فری‌سایز (بدون سایزبندی)</span>';

    $('#pmDesc').textContent =
        `«${p.name}» از کالکشن ${p.cat} فِیبل ست؛ دوخت تمیز، پارچه باکیفیت و ست‌شدن آسان با استایل روزمره‌ات.` +
        (p.off ? ` همین حالا با ${toFa(p.off)}٪ تخفیف ویژه عرضه می‌شود.` : '');

    if (typeof p.stock === 'number' && p.stock > 0 && p.stock <= 5) {
        $('#pmDesc').textContent += ` فقط ${toFa(p.stock)} عدد باقی مانده است.`;
    }
    const addBtn = $('#pmAdd');
    addBtn.dataset.label = addBtn.dataset.label || addBtn.textContent;
    addBtn.disabled = isSoldOut(p);
    addBtn.textContent = isSoldOut(p) ? 'ناموجود' : addBtn.dataset.label;

    $('#pmQty').textContent = toFa(1);
    renderGallery();
    pm.classList.add('open');
    document.body.classList.add('pm-open');
    pm.scrollTop = 0;
}

function closeProduct() {
    pm.classList.remove('open');
    document.body.classList.remove('pm-open');
}
$('#pmBack').addEventListener('click', closeProduct);
document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeProduct();
    closeAdmin();
    $('#articleModal').classList.remove('open');
    $('#loginModal').classList.remove('open');
});

function renderGallery() {
    track.innerHTML = pmImages.map(src =>
        `<div class="pm-slide"><img src="${src}" alt="" draggable="false"
            onerror="this.onerror=null;this.src='${PLACEHOLDER}'"></div>`).join('');
    $('#pmThumbs').innerHTML = pmImages.map((src, i) =>
        `<button class="pm-thumb ${i === 0 ? 'active' : ''}" onclick="goSlide(${i})">
            <img src="${src}" alt="" draggable="false"></button>`).join('');
    track.style.transform = 'translateX(0)';
}

function goSlide(i) {
    pmIndex = Math.max(0, Math.min(pmImages.length - 1, i));
    track.style.transition = '';
    track.style.transform = `translateX(-${pmIndex * 100}%)`;
    document.querySelectorAll('.pm-thumb').forEach((t, k) =>
        t.classList.toggle('active', k === pmIndex));
}
$('#pmNext').addEventListener('click', () => goSlide(pmIndex + 1));
$('#pmPrev').addEventListener('click', () => goSlide(pmIndex - 1));

/* --- کشیدن عکس به چپ/راست با ماوس و لمس --- */
let dragStartX = 0, dx = 0, isDragging = false;
const pmMain = pm.querySelector('.pm-main');

pmMain.addEventListener('pointerdown', e => {
    if (e.target.closest('.pm-nav')) return;
    isDragging = true; dx = 0; dragStartX = e.clientX;
    pmMain.setPointerCapture(e.pointerId);
    pmMain.classList.add('dragging');
    track.style.transition = 'none';
});
pmMain.addEventListener('pointermove', e => {
    if (!isDragging) return;
    dx = e.clientX - dragStartX;
    track.style.transform = `translateX(calc(-${pmIndex * 100}% + ${dx}px))`;
});
function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    pmMain.classList.remove('dragging');
    track.style.transition = '';
    if (Math.abs(dx) > 60) {
        if (dx < 0 && pmIndex < pmImages.length - 1) pmIndex++;
        else if (dx > 0 && pmIndex > 0) pmIndex--;
    }
    dx = 0;
    goSlide(pmIndex);
}
pmMain.addEventListener('pointerup', endDrag);
pmMain.addEventListener('pointercancel', endDrag);

/* --- انتخاب سایز فقط در صفحه جزئیات --- */
function pickSize(id, size) {
    selectedSize[id] = size;
    document.querySelectorAll('#pmSizes .size-btn').forEach(b =>
        b.classList.toggle('selected', b.textContent.trim() === size));
}

/* --- تعداد و افزودن از صفحه جزئیات --- */
$('#pmQtyPlus').addEventListener('click', () => { if (pmQty < 9) pmQty++; $('#pmQty').textContent = toFa(pmQty); });
$('#pmQtyMinus').addEventListener('click', () => { if (pmQty > 1) pmQty--; $('#pmQty').textContent = toFa(pmQty); });
$('#pmAdd').addEventListener('click', () => {
    addToCart(pmId, pmQty);
    showToast('✔ به سبد خرید اضافه شد');
});

/* ---------- Filters ---------- */
$('#filters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
});

/* ---------- Wishlist ---------- */
const wish = new Set();
function toggleWish(btn, id) {
    if (wish.has(id)) { wish.delete(id); btn.classList.remove('active'); showToast('از علاقه‌مندی‌ها حذف شد'); }
    else { wish.add(id); btn.classList.add('active'); showToast('♥ به علاقه‌مندی‌ها اضافه شد'); }
}

/* ---------- Cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('fable-cart') || localStorage.getItem('sabzpoosh-cart') || '[]'); } catch (e) { cart = []; }
if (!Array.isArray(cart)) cart = [];
const save = () => { try { localStorage.setItem('fable-cart', JSON.stringify(cart)); } catch (e) {} };

/* اگر محصولی از پنل حذف شده باشد، از سبد هم پاک شود */
function purgeCart() {
    const before = cart.length;
    cart = cart.filter(i => PRODUCTS.some(p => p.id === i.id));
    if (cart.length !== before) save();
}

function addToCart(id, qty = 1) {
    const p = PRODUCTS.find(p => p.id === id);
    if (!p) return;
    if (isSoldOut(p)) { showToast('⚠️ این محصول ناموجود است'); return; }
    if (typeof p.stock === 'number' && cartQtyOf(id) + qty > p.stock) {
        showToast(`⚠️ فقط ${toFa(p.stock)} عدد موجود است`); return;
    }
    const size = selectedSize[id] || p.sizes[0] || null;
    const key = id + (size ? '-' + size : '');
    const item = cart.find(i => i.key === key);
    item ? item.qty += qty : cart.push({ key, id, size, qty });
    save(); renderCart();
    const badge = $('#cartBadge');
    badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
    showToast(`✔ «${p.name}» ${size ? 'سایز ' + size : ''} به سبد اضافه شد`);
}

function changeQty(key, d) {
    const item = cart.find(i => i.key === key);
    if (!item) return;
    if (d > 0) {
        const pr = PRODUCTS.find(p => p.id === item.id);
        if (pr && typeof pr.stock === 'number' && cartQtyOf(pr.id) + d > pr.stock) {
            showToast(`⚠️ فقط ${toFa(pr.stock)} عدد موجود است`); return;
        }
    }
    item.qty += d;
    if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
    save(); renderCart();
}

function removeItem(key) {
    cart = cart.filter(i => i.key !== key);
    save(); renderCart();
}

function renderCart() {
    purgeCart();
    $('#cartBadge').textContent = toFa(cart.reduce((s, i) => s + i.qty, 0));
    const box = $('#cartItems');
    if (!cart.length) {
        box.innerHTML = `<div class="cart-empty"><span class="big">🛒</span>سبد خرید شما خالی است!<br><small>از محصولات فروشگاه دیدن کنید</small></div>`;
    } else {
        box.innerHTML = cart.map(i => {
            const p = PRODUCTS.find(p => p.id === i.id);
            if (!p) return '';
            return `
            <div class="cart-item">
                <img src="${p.img || PLACEHOLDER}" alt="${p.name}" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
                <div>
                    <div class="ci-name">${p.name}${i.size ? ` <small>(${i.size})</small>` : ''}</div>
                    <div class="ci-price">${fmt(p.price * i.qty)} تومان</div>
                    <div class="ci-qty">
                        <button class="qty-btn" onclick="changeQty('${i.key}', 1)">+</button>
                        <span>${toFa(i.qty)}</span>
                        <button class="qty-btn" onclick="changeQty('${i.key}', -1)">−</button>
                    </div>
                </div>
                <button class="ci-remove" onclick="removeItem('${i.key}')">🗑</button>
            </div>`;
        }).join('');
    }
    const total = cart.reduce((s, i) => s + i.qty * PRODUCTS.find(p => p.id === i.id).price, 0);
    $('#cartTotal').innerHTML = total ? `${fmt(total)} تومان` : '۰ تومان';
}
renderCart();

/* ---------- Cart Drawer ---------- */
const openCart = () => { $('#cartDrawer').classList.add('open'); $('#cartOverlay').classList.add('open'); };
const closeCart = () => { $('#cartDrawer').classList.remove('open'); $('#cartOverlay').classList.remove('open'); };
$('#cartBtn').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
$('#cartOverlay').addEventListener('click', closeCart);
document.addEventListener('keydown', e => e.key === 'Escape' && closeCart());

$('#checkoutBtn').addEventListener('click', () => {
    if (!cart.length) { showToast('سبد خرید شما خالی است!'); return; }
    showToast('🎉 سفارش شما ثبت شد! به‌زودی با شما تماس می‌گیریم');
    cart = []; save(); renderCart(); closeCart();
});

/* ---------- Back to top ---------- */
const toTop = $('#toTop');
window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 500));
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Newsletter ---------- */
$('#newsForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#emailInput').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $('#newsMsg').textContent = '⚠️ لطفاً یک ایمیل معتبر وارد کنید';
        $('#newsMsg').style.color = '#d88080';
        return;
    }
    $('#newsMsg').textContent = '🌿 خوش آمدید! عضویت شما با موفقیت ثبت شد';
    $('#newsMsg').style.color = '#7fae8d';
    $('#emailInput').value = '';
});

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ============ پنل مدیریت (عکس و قیمت) ============ */
const adminModal = $('#adminModal');
const adminList = $('#adminList');

/* یک کادر عکس: پیش‌نمایش + لینک + انتخاب فایل + پاک کردن */
function slotHTML(url, label) {
    const u = escA(url);
    return `<div class="img-slot">
        <img class="slot-img" src="${u || PLACEHOLDER}" alt="" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
        <input type="text" class="ar-url" value="${u}" placeholder="${escA(label || 'لینک عکس')}" dir="ltr">
        <span class="ar-file-wrap">📷 انتخاب عکس
            <input type="file" accept="image/*" class="ar-file">
        </span>
        <button type="button" class="slot-clear" title="پاک کردن">✕</button>
    </div>`;
}

function articleRowHTML(a) {
    return `
        <div class="aa-row" data-art="${escA(a.id)}">
            <div class="ar-line">
                <span>عنوان <input type="text" class="aa-title" value="${escA(a.title)}"></span>
                <span>تاریخ <input type="text" class="aa-date" value="${escA(a.date)}"></span>
                <button type="button" class="btn btn-outline btn-sm aa-del">🗑 حذف مقاله</button>
            </div>
            ${slotHTML(a.img, 'عکس مقاله')}
            <textarea class="aa-body" rows="4" placeholder="متن مقاله (هر پاراگراف با یک خط خالی جدا شود)">${escT(a.body)}</textarea>
        </div>`;
}

function slideRowHTML(url) { return `<div class="hm-slide">${slotHTML(url, 'عکس اسلاید')}</div>`; }

/* تب «صفحه اصلی»: اسلایدر و کادرهای دسته‌بندی */
function renderAdminHome() {
    const st = SETTINGS || {};
    const h = st.hero || {};
    let slides = Array.isArray(h.slides) ? h.slides.filter(Boolean) : [];
    if (!slides.length) slides = [$('#heroFirstImg').getAttribute('src')];
    const label = h.label || $('#heroLabel').textContent.trim();
    const title = h.title || $('#heroTitle').textContent.trim();
    const banners = [...document.querySelectorAll('.cat-banner')].map(c => {
        const f = c.dataset.filter;
        const b = (Array.isArray(st.banners) ? st.banners : []).find(x => x.filter === f) || {};
        return {
            filter: f,
            name: b.name || c.querySelector('.cb-name').textContent.trim(),
            img: b.img || c.querySelector('.cb-media img').getAttribute('src'),
        };
    });
    $('#adminHome').innerHTML = `
        <h4 class="admin-sec">🖼️ اسلایدر بالای صفحه اول (عکس مدل‌ها)</h4>
        <p class="admin-hint">هر چند عکس بگذاری خودکار یکی‌یکی عوض می‌شوند (حداکثر ۸ عکس).</p>
        <div id="hmSlides">${slides.map(slideRowHTML).join('')}</div>
        <button type="button" class="btn btn-outline btn-sm" id="hmAddSlide">➕ افزودن عکس اسلاید</button>
        <div class="ar-line">
            <span>برچسب کوچک <input type="text" id="hmLabel" value="${escA(label)}"></span>
            <span>عنوان <input type="text" id="hmTitle" value="${escA(title)}" style="width:240px"></span>
            <span>هر چند ثانیه عوض شود <input type="number" id="hmInterval" min="2" max="30" value="${+h.interval || 5}"></span>
        </div>
        <h4 class="admin-sec">🏷️ کادرهای دسته‌بندی</h4>
        <p class="admin-hint">قیمت «شروع از» خودکار از ارزان‌ترین محصول هر دسته حساب می‌شود.</p>
        <div class="hm-banners">${banners.map(b => `
            <div class="hm-banner" data-filter="${escA(b.filter)}">
                <span>نام نمایشی <input type="text" class="hm-bname" value="${escA(b.name)}"></span>
                ${slotHTML(b.img, 'عکس کادر')}
            </div>`).join('')}</div>`;
}

function showAdminTab(name) {
    adminModal.querySelectorAll('.admin-tab').forEach(t =>
        t.classList.toggle('active', t.dataset.tab === name));
}

/* ---------- منوی همبرگری پنل: هر دسته یک بخش جدا ---------- */
const ADMIN_CATS = ['کفش', 'پیراهن', 'کت', 'کاپشن', 'بافت', 'دورس و هودی', 'شلوار'];
const ADMIN_PANTS = ['پارچه‌ای', 'کتان', 'جین', 'سیلک'];
let adminSection = { tab: 'products', cat: 'همه', sub: '' };

function inSection(p, sec) {
    if (sec.cat === 'همه') return true;
    if (p.cat !== sec.cat) return false;
    return !sec.sub || p.sub === sec.sub;
}
function sectionLabel(sec) {
    if (sec.tab === 'home') return '🖼️ صفحه اصلی';
    if (sec.tab === 'articles') return '📰 مقالات';
    if (sec.tab === 'about') return '📝 درباره ما';
    if (sec.cat === 'همه') return '👕 همه محصولات';
    return '👕 ' + (sec.sub ? 'شلوار ' + sec.sub : sec.cat);
}
function renderAdminMenu() {
    const cur = adminSection;
    const item = (label, sec, cls = '') => {
        const active = sec.tab === cur.tab &&
            (sec.tab !== 'products' || (sec.cat === cur.cat && (sec.sub || '') === (cur.sub || '')));
        const n = sec.tab === 'products'
            ? `<small>${toFa(PRODUCTS.filter(p => inSection(p, sec)).length)}</small>` : '';
        return `<button type="button" class="am-item ${cls}${active ? ' active' : ''}" data-tab="${sec.tab}" data-cat="${escA(sec.cat || '')}" data-sub="${escA(sec.sub || '')}"><span>${label}</span>${n}</button>`;
    };
    const extra = [...new Set(PRODUCTS.map(p => p.cat))].filter(c => c && !ADMIN_CATS.includes(c));
    let html = item('👕 همه محصولات', { tab: 'products', cat: 'همه', sub: '' });
    [...ADMIN_CATS, ...extra].forEach(c => {
        html += item(escT(c), { tab: 'products', cat: c, sub: '' });
        if (c === 'شلوار') {
            ADMIN_PANTS.forEach(sb => {
                html += item('شلوار ' + sb, { tab: 'products', cat: 'شلوار', sub: sb }, 'am-sub');
            });
        }
    });
    html += '<div class="am-sep"></div>';
    html += item('🖼️ صفحه اصلی', { tab: 'home' });
    html += item('📰 مقالات', { tab: 'articles' });
    html += item('📝 درباره ما', { tab: 'about' });
    $('#adminMenuList').innerHTML = html;
}
function applyAdminSection() {
    const sec = adminSection;
    showAdminTab(sec.tab);
    $('#adminHere').textContent = sectionLabel(sec);
    const inProducts = sec.tab === 'products';
    let shown = 0;
    adminList.querySelectorAll('.admin-row').forEach(row => {
        const p = PRODUCTS.find(p => p.id === +row.dataset.id);
        const vis = !!p && inSection(p, sec);
        row.style.display = vis ? '' : 'none';
        if (vis) shown++;
    });
    $('#adminEmpty').hidden = !(inProducts && shown === 0);
    /* فرم «افزودن محصول» خودش روی همین بخش تنظیم می‌شود */
    if (inProducts && sec.cat !== 'همه') {
        const opts = [...($('#npCat').options || [])];
        if (opts.some(o => o.value === sec.cat)) {
            $('#npCat').value = sec.cat;
            $('#npCat').dispatchEvent(new Event('change'));
            if (sec.sub) $('#npSub').value = sec.sub;
        }
        $('#addProductOpen').textContent = '➕ افزودن محصول به «' + (sec.sub ? 'شلوار ' + sec.sub : sec.cat) + '»';
    } else {
        $('#addProductOpen').textContent = '➕ افزودن محصول جدید';
    }
    renderAdminMenu();
}
$('#adminBurger').addEventListener('click', e => {
    e.stopPropagation();
    renderAdminMenu();
    $('#adminMenu').classList.toggle('open');
});
$('#adminMenuList').addEventListener('click', e => {
    const b = e.target.closest('.am-item');
    if (!b) return;
    const tab = b.dataset.tab;
    adminSection = tab === 'products'
        ? { tab, cat: b.dataset.cat || 'همه', sub: b.dataset.sub || '' }
        : { tab, cat: 'همه', sub: '' };
    $('#adminMenu').classList.remove('open');
    applyAdminSection();
    adminModal.scrollTop = 0;
});
document.addEventListener('click', e => {
    if (!e.target.closest('#adminMenu') && !e.target.closest('#adminBurger')) {
        $('#adminMenu').classList.remove('open');
    }
});

function openAdmin() {
    if (!adminModal.classList.contains('open')) adminSection = { tab: 'products', cat: 'همه', sub: '' };
    adminList.innerHTML = PRODUCTS.map(p => {
        const imgs = imgsOf(p);
        return `
        <div class="admin-row" data-id="${p.id}">
            <img class="ar-img" src="${escA(imgs[0]) || PLACEHOLDER}" alt=""
                 onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
            <div class="ar-fields">
                <div class="ar-line">
                    <span>نام <input type="text" class="ar-name-input" value="${escA(p.name)}"></span>
                    <button class="btn btn-outline btn-sm ar-del" onclick="delProduct(${p.id})">🗑 حذف</button>
                </div>
                <div class="ar-line">
                    <span>قیمت <input type="number" class="ar-price" value="${p.price}"></span>
                    <span>قیمت قبلی <input type="number" class="ar-old" value="${p.old ?? ''}" placeholder="خالی = بدون تخفیف"></span>
                    <span>موجودی <input type="number" min="0" class="ar-stock" value="${typeof p.stock === 'number' ? p.stock : ''}" placeholder="خالی = بدون محدودیت"></span>
                </div>
                <div class="ar-slots">
                    ${[0, 1, 2].map(i => slotHTML(imgs[i], i === 0 ? 'عکس اصلی' : 'عکس ' + toFa(i + 1))).join('')}
                </div>
            </div>
        </div>`;
    }).join('');
    /* درباره ما و مقاله‌ها */
    $('#adminAbout').value = aboutText;
    $('#adminArts').innerHTML = ARTICLES.map(articleRowHTML).join('');
    renderAdminHome();
    applyAdminSection();
    adminModal.classList.add('open');
    document.body.classList.add('pm-open');
    adminModal.scrollTop = 0;
}

function closeAdmin() {
    adminModal.classList.remove('open');
    document.body.classList.remove('pm-open');
}
$('#adminLink').addEventListener('click', openAdmin);
$('#adminBack').addEventListener('click', closeAdmin);
$('#artBack').addEventListener('click', () => {
    $('#articleModal').classList.remove('open');
    document.body.classList.remove('pm-open');
});

/* انتخاب عکس از فایل → کوچک‌کردن در مرورگر → آپلود روی سرور (برای همه کادرهای عکس) */
adminModal.addEventListener('change', e => {
    const input = e.target;
    if (!input.classList.contains('ar-file') || !input.files[0]) return;
    const slot = input.closest('.img-slot');
    if (!slot) return;
    const file = input.files[0];
    const fr = new FileReader();
    fr.onload = () => {
        const img = new Image();
        img.onload = () => {
            const max = 1200;
            const sc = Math.min(1, max / Math.max(img.width, img.height));
            const c = document.createElement('canvas');
            c.width = Math.round(img.width * sc);
            c.height = Math.round(img.height * sc);
            c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
            const dataURL = c.toDataURL('image/webp', 0.8);
            const urlInput = slot.querySelector('.ar-url');
            const preview = slot.querySelector('.slot-img');
            preview.src = dataURL;
            showToast('⏳ در حال آپلود عکس...');
            uploadImage(dataURL).then(url => {
                if (!url) { showToast('⚠️ آپلود عکس انجام نشد'); return; }
                urlInput.value = url;
                preview.src = url;
                showToast('✔ عکس بارگذاری شد — یادت نرود ذخیره کنی');
            });
        };
        img.onerror = () => showToast('⚠️ عکس قابل خواندن نیست');
        img.src = fr.result;
    };
    fr.readAsDataURL(file);
    input.value = '';
});

/* پیش‌نمایش زنده با تغییر لینک، پاک‌کردن عکس، افزودن اسلاید، حذف مقاله */
adminModal.addEventListener('input', e => {
    if (!e.target.classList.contains('ar-url')) return;
    const slot = e.target.closest('.img-slot');
    if (slot) slot.querySelector('.slot-img').src = e.target.value.trim() || PLACEHOLDER;
});
adminModal.addEventListener('click', e => {
    const clear = e.target.closest('.slot-clear');
    if (clear) {
        const slide = clear.closest('.hm-slide');
        if (slide) { slide.remove(); return; }
        const slot = clear.closest('.img-slot');
        slot.querySelector('.ar-url').value = '';
        slot.querySelector('.slot-img').src = PLACEHOLDER;
        return;
    }
    if (e.target.id === 'hmAddSlide') {
        const box = $('#hmSlides');
        if (box.children.length >= 8) { showToast('حداکثر ۸ عکس برای اسلایدر'); return; }
        box.insertAdjacentHTML('beforeend', slideRowHTML(''));
        return;
    }
    const del = e.target.closest('.aa-del');
    if (del) {
        if (!confirm('این مقاله حذف شود؟')) return;
        del.closest('.aa-row').remove();
        showToast('مقاله برداشته شد — برای قطعی شدن «ذخیره تغییرات» را بزن');
    }
});

$('#addArticleBtn').addEventListener('click', () => {
    const today = new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    $('#adminArts').insertAdjacentHTML('afterbegin',
        articleRowHTML({ id: 'n' + Date.now(), title: '', date: today, img: '', body: '' }));
    $('#adminArts').querySelector('.aa-title').focus();
});

/* محاسبه off از روی قیمت قبلی */
function calcOff(price, old) {
    return old && old > price ? Math.round(((old - price) / old) * 100) : 0;
}

/* ---------- ذخیره تغییرات ---------- */
$('#adminSave').addEventListener('click', () => {
    let ok = true;

    /* ۱) محصولات */
    adminList.querySelectorAll('.admin-row').forEach(row => {
        const id = +row.dataset.id;
        const p = PRODUCTS.find(p => p.id === id);
        if (!p) return;
        const priceEl = row.querySelector('.ar-price');
        const oldEl = row.querySelector('.ar-old');
        const price = Math.max(0, Math.round(+priceEl.value || 0));
        const old = oldEl.value ? Math.max(0, Math.round(+oldEl.value)) : null;
        if (!price) { priceEl.style.border = '1px solid #d88080'; ok = false; }
        else priceEl.style.border = '';
        const imgs = [...row.querySelectorAll('.img-slot .ar-url')].map(i => i.value.trim()).filter(Boolean).slice(0, 3);
        const stockRaw = row.querySelector('.ar-stock').value.trim();
        p.name = row.querySelector('.ar-name-input').value.trim() || p.name;
        if (imgs.length) p.img = imgs[0];
        p.img2 = imgs[1] || '';
        p.img3 = imgs[2] || '';
        p.price = price;
        p.old = old && old > price ? old : null;
        p.off = calcOff(p.price, p.old);
        p.stock = stockRaw === '' ? null : Math.max(0, Math.round(+stockRaw || 0));
    });

    /* ۲) درباره ما */
    const newAbout = $('#adminAbout').value.trim();
    if (newAbout) {
        aboutText = newAbout;
        try { localStorage.setItem('fable-about', aboutText); } catch (e) { /* مهم نیست */ }
        $('#aboutText').textContent = aboutText;
    }

    /* ۳) مقاله‌ها (افزودن و حذف هم اینجا قطعی می‌شود) */
    const built = [...$('#adminArts').querySelectorAll('.aa-row')].map(r => ({
        id: r.dataset.art,
        title: r.querySelector('.aa-title').value.trim() || 'مقاله بدون عنوان',
        date: r.querySelector('.aa-date').value.trim(),
        img: r.querySelector('.ar-url').value.trim(),
        body: r.querySelector('.aa-body').value,
    }));
    ARTICLES.splice(0, ARTICLES.length, ...built);
    renderBlog();

    /* ۴) صفحه اصلی: اسلایدر و کادرهای دسته‌بندی */
    if ($('#hmLabel')) {
        SETTINGS = {
            hero: {
                label: $('#hmLabel').value.trim(),
                title: $('#hmTitle').value.trim(),
                interval: Math.min(30, Math.max(2, Math.round(+$('#hmInterval').value) || 5)),
                slides: [...$('#hmSlides').querySelectorAll('.ar-url')].map(i => i.value.trim()).filter(Boolean).slice(0, 8),
            },
            banners: [...$('#adminHome').querySelectorAll('.hm-banner')].map(b => ({
                filter: b.dataset.filter,
                name: b.querySelector('.hm-bname').value.trim(),
                img: b.querySelector('.ar-url').value.trim(),
            })),
        };
        try { localStorage.setItem('fable-settings', JSON.stringify(SETTINGS)); } catch (e) { /* مهم نیست */ }
    }

    if (!ok) { showToast('⚠️ قیمت واردشده معتبر نیست'); return; }
    persistProducts();               /* ذخیره دائمی روی سرور */
    renderProducts(currentFilter()); /* نمایش خودکار در سایت (و اعمال تنظیمات صفحه اول) */
    renderCart();
    showToast('💾 تغییرات ذخیره شد');
    closeAdmin();
});

/* ---------- حذف محصول (با تأیید) ---------- */
function delProduct(id) {
    const p = PRODUCTS.find(p => p.id === id);
    if (!p) return;
    if (!confirm(`محصول «${p.name}» حذف شود؟\n\nاین کار قابل بازگشت نیست!`)) return;
    const i = PRODUCTS.findIndex(p => p.id === id);
    PRODUCTS.splice(i, 1);
    persistProducts();
    renderProducts(currentFilter());
    renderCart();
    openAdmin();
    showToast('🗑 محصول حذف شد');
}

/* ---------- افزودن محصول جدید ---------- */
$('#addProductOpen').addEventListener('click', () => {
    const f = $('#addProductForm');
    f.classList.toggle('open');
    if (f.classList.contains('open')) $('#npName').focus();
});

$('#npCat').addEventListener('change', () => {
    $('#npSubWrap').style.display = $('#npCat').value === 'شلوار' ? '' : 'none';
});

/* کادرهای عکس فرم «افزودن محصول» */
function renderNewSlots() {
    $('#npSlots').innerHTML = [0, 1, 2].map(i => slotHTML('', i === 0 ? 'عکس اصلی' : 'عکس ' + toFa(i + 1))).join('');
}
renderNewSlots();

$('#adminReset').addEventListener('click', () => {
    if (!confirm('همه محصولات به پیش‌فرض بازگردند؟ (محصولات اضافه‌شده حذف می‌شوند)')) return;
    localStorage.removeItem('fable-products');
    localStorage.removeItem('fable-custom');
    PRODUCTS.length = 0;
    BASE_PRODUCTS.forEach(p => PRODUCTS.push({ ...p }));
    persistProducts();
    renderProducts(currentFilter());
    renderCart();
    openAdmin();
    showToast('↩ محصولات به حالت پیش‌فرض برگشت');
});

/* ---------- بکاپ‌گیری و بازیابی داده‌ها ---------- */
$('#exportBtn').addEventListener('click', () => {
    const data = {
        app: 'fable.set',
        version: 2,
        exportedAt: new Date().toISOString(),
        products: PRODUCTS,
        about: aboutText,
        articles: ARTICLES,
        settings: SETTINGS,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const d = new Date();
    const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = `fable-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('⬇ فایل بکاپ دانلود شد');
});

$('#importFile').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const fr = new FileReader();
    fr.onload = () => {
        let data;
        try { data = JSON.parse(fr.result); } catch (err) {
            showToast('⚠️ فایل JSON معتبر نیست');
            e.target.value = '';
            return;
        }
        const products = Array.isArray(data) ? data : data.products;
        if (!Array.isArray(products) || !products.length ||
            !products.every(p => p && p.name && Number.isFinite(+p.price))) {
            showToast('⚠️ فایل بکاپ معتبر نیست — محصولی پیدا نشد');
            e.target.value = '';
            return;
        }
        if (!confirm(`بازیابی ${products.length} محصول جایگزین اطلاعات فعلی شود؟`)) {
            e.target.value = '';
            return;
        }
        try {
            const normalized = products.map((p, i) => {
                const price = Math.max(0, Math.round(+p.price || 0));
                const old = p.old && +p.old > price ? Math.round(+p.old) : null;
                return {
                    id: typeof p.id === 'number' ? p.id : Date.now() + i,
                    name: String(p.name),
                    cat: p.cat || 'پیراهن',
                    sub: p.sub || '',
                    price,
                    old,
                    off: old ? Math.round(((old - price) / old) * 100) : 0,
                    sizes: Array.isArray(p.sizes) ? p.sizes.map(String) : [],
                    img: p.img || '',
                    img2: p.img2 || '',
                    img3: p.img3 || '',
                    stock: (p.stock === null || p.stock === undefined || p.stock === '') ? null : Math.max(0, Math.round(+p.stock || 0)),
                };
            });
            try { localStorage.setItem('fable-products', JSON.stringify(normalized)); } catch (e) { /* مهم نیست؛ سرور ذخیره می‌کند */ }

            if (typeof data.about === 'string' && data.about.trim()) {
                localStorage.setItem('fable-about', data.about.trim());
            }
            if (data.articles) {
                const map = {};
                if (Array.isArray(data.articles)) {
                    data.articles.forEach(a => { if (a && a.id) map[a.id] = a; });
                } else if (typeof data.articles === 'object') {
                    Object.assign(map, data.articles);
                }
                if (Object.keys(map).length) {
                    localStorage.setItem('fable-articles', JSON.stringify(map));
                }
            }
            PRODUCTS.length = 0; normalized.forEach(p => PRODUCTS.push(p));
            if (typeof data.about === 'string' && data.about.trim()) aboutText = data.about.trim();
            if (Array.isArray(data.articles)) {
                const arts = data.articles.filter(x => x && x.title).map((x, i) => ({
                    id: String(x.id || 'n' + Date.now() + i), date: String(x.date || ''),
                    title: String(x.title), img: String(x.img || ''), body: String(x.body || ''),
                }));
                ARTICLES.splice(0, ARTICLES.length, ...arts);
            } else if (data.articles && typeof data.articles === 'object') {
                ARTICLES.forEach(x => Object.assign(x, data.articles[x.id] || {}));
            }
            if (data.settings && typeof data.settings === 'object') SETTINGS = data.settings;
            showToast('⏳ در حال بازیابی روی سرور...');
            serverSaveAll().then(ok => {
                if (ok) {
                    showToast('✔ بکاپ بازیابی شد — صفحه دوباره بارگذاری می‌شود');
                    setTimeout(() => location.reload(), 700);
                }
            });
        } catch (err) {
            showToast('⚠️ حافظه مرورگر جا کافی نداشت');
        }
        e.target.value = '';
    };
    fr.readAsText(file);
});

/* تأیید افزودن محصول جدید */
$('#addProductConfirm').addEventListener('click', () => {
    const name = $('#npName').value.trim();
    const price = Math.max(0, Math.round(+$('#npPrice').value || 0));
    if (!name) { showToast('⚠️ نام محصول را بنویس'); $('#npName').focus(); return; }
    if (!price) { showToast('⚠️ قیمت معتبر وارد کن'); $('#npPrice').focus(); return; }
    const cat = $('#npCat').value;
    const oldV = $('#npOld').value ? Math.max(0, Math.round(+$('#npOld').value)) : null;
    const imgs = [...$('#npSlots').querySelectorAll('.ar-url')].map(i => i.value.trim()).filter(Boolean).slice(0, 3);
    const sub = cat === 'شلوار' ? $('#npSub').value : '';
    const sizes = $('#npSizes').value.split(/[،,]/).map(s => s.trim()).filter(Boolean);
    const stockRaw = $('#npStock').value.trim();
    const old = oldV && oldV > price ? oldV : null;
    const product = {
        id: Date.now(), name, cat, sub, price, old, off: calcOff(price, old), sizes,
        img: imgs[0] || '', img2: imgs[1] || '', img3: imgs[2] || '',
        stock: stockRaw === '' ? null : Math.max(0, Math.round(+stockRaw || 0)),
    };
    PRODUCTS.unshift(product); /* جدیدها اول لیست دیده می‌شوند */
    persistProducts();
    renderProducts('همه');
    renderCart();
    /* فرم را پاک کن و ببند */
    ['#npName', '#npPrice', '#npOld', '#npSizes', '#npStock'].forEach(sel => $(sel).value = '');
    renderNewSlots();
    $('#addProductForm').classList.remove('open');
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === 'همه'));
    if (adminSection.cat !== 'همه') adminSection = { tab: 'products', cat, sub };
    openAdmin();
    showToast(`✔ «${name}» اضافه شد و در صفحه اصلی نمایش داده می‌شود`);
});

/* ============ ورود مدیر با رمز ============ */
const loginModal = $('#loginModal');

function isAdminNow() {
    try { return sessionStorage.getItem('fable-admin') === '1'; } catch (e) { return false; }
}
function updateAdminLink() {
    $('#adminLink').style.display = isAdminNow() ? '' : 'none';
}
function openLogin() {
    loginModal.classList.add('open');
    $('#passInput').value = '';
    $('#loginMsg').textContent = '';
    setTimeout(() => $('#passInput').focus(), 50);
}
try {
    if (location.hash === '#admin') openLogin(); /* ورود مخفی از آدرس */
} catch (e) { /* url hash ممکن است در file:// باشد */ }

$('#loginBtn').addEventListener('click', async () => {
    const v = $('#passInput').value;
    const msg = $('#loginMsg');
    msg.style.color = '#d88080';
    try {
        const r = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: v }),
        });
        if (r.ok) {
            sessionStorage.setItem('fable-admin', '1');
            loginModal.classList.remove('open');
            document.body.classList.remove('pm-open');
            updateAdminLink();
            openAdmin();
            showToast('پنل مدیریت باز شد');
            return;
        }
        msg.textContent = r.status === 429
            ? '⚠️ تلاش‌های زیاد؛ ۱۰ دقیقه بعد دوباره امتحان کن'
            : '⚠️ رمز اشتباه است';
    } catch (e) {
        msg.textContent = '⚠️ ارتباط با سرور برقرار نیست';
    }
    $('#passInput').value = '';
});
$('#passInput').addEventListener('keydown', e => { if (e.key === 'Enter') $('#loginBtn').click(); });

/* ترفند مخفی: ۳ بار کلیک سریع روی لوگو = ورود مدیریت */
let logoClicks = 0, logoTimer;
document.querySelector('.header .logo').addEventListener('click', e => {
    logoClicks++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => logoClicks = 0, 800);
    if (logoClicks >= 3) {
        e.preventDefault();
        logoClicks = 0;
        isAdminNow() ? openAdmin() : openLogin();
    }
});

$('#adminLogout').addEventListener('click', () => {
    fetch('/api/logout', { method: 'POST' }).catch(() => {});
    sessionStorage.removeItem('fable-admin');
    updateAdminLink();
    closeAdmin();
    showToast('از پنل مدیریت خارج شدی — مشتریان دیگر آن را نمی‌بینند');
});

$('#savePass').addEventListener('click', async () => {
    const v = $('#newPass').value.trim();
    if (v.length < 6) { showToast('رمز جدید حداقل ۶ کاراکتر باشد'); return; }
    try {
        const r = await fetch('/api/password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: v }),
        });
        if (r.status === 401) { sessionExpired(); return; }
        if (!r.ok) throw new Error('pass');
        $('#newPass').value = '';
        try { sessionStorage.removeItem('fable-admin'); } catch (e) { /* مهم نیست */ }
        updateAdminLink();
        closeAdmin();
        showToast('🔐 رمز عوض شد — با رمز جدید دوباره وارد شو');
        openLogin();
    } catch (e) {
        showToast('⚠️ رمز عوض نشد');
    }
});

updateAdminLink();
initContent();

function currentFilter() {
    const active = document.querySelector('.filter-btn.active');
    return active ? active.dataset.filter : 'همه';
}

/* ============ همگام‌سازی با سرور (اطلاعات واقعی سایت از سرور می‌آید) ============ */
(async function syncFromServer() {
    try {
        const me = await fetch('/api/me').then(r => (r.ok ? r.json() : null)).catch(() => null);
        if (me) {
            try {
                if (me.admin) sessionStorage.setItem('fable-admin', '1');
                else sessionStorage.removeItem('fable-admin');
            } catch (e) { /* مهم نیست */ }
            updateAdminLink();
        }
        const r = await fetch('/api/data');
        if (!r.ok) return;
        const d = await r.json();
        if (Array.isArray(d.products)) { PRODUCTS.length = 0; d.products.forEach(p => PRODUCTS.push(p)); }
        if (typeof d.about === 'string' && d.about) aboutText = d.about;
        if (Array.isArray(d.articles)) { ARTICLES.length = 0; d.articles.forEach(a => ARTICLES.push(a)); }
        if (d.settings && typeof d.settings === 'object') SETTINGS = d.settings;
        renderProducts(currentFilter());
        initContent();
        renderCart();
    } catch (e) {
        /* سرور در دسترس نیست؛ همان اطلاعات داخل مرورگر نمایش داده می‌شود */
    } finally {
        grid.style.visibility = '';
    }
})();
