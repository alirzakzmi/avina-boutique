/* ═══════════ PRODUCTS DATA ═══════════ */
const DEFAULT_PRODUCTS = [
    { id: 1, name: 'کلاه نخی تابستانی', slug: 'hat', image: 'images/LtxHS10VGk3qvF3lCD89bvgYewc8en0Hho9qRK26_Ncg3.jpg', price: 450000, oldPrice: null, discount: null, colors: [{name:'سفید',hex:'#fff'},{name:'مشکی',hex:'#000'}], sizes: ['Free Size'] },
    { id: 2, name: 'ست تیشرت و شلوار بچگانه', slug: 'kids-set', image: 'images/xlgNgca8DVuK85BWDFpK9mLwsyQpvIuFn2DHBJ1Q_Ncg3.jpg', price: 380000, oldPrice: null, discount: null, colors: [{name:'صورتی',hex:'#fbcfe8'},{name:'آبی',hex:'#93c5fd'}], sizes: ['1-2 سال','3-4 سال','5-6 سال'] },
    { id: 3, name: 'پیراهن مردانه آستین بلند', slug: 'men-shirt', image: 'images/t0vqjF0uVIL2cXME3GGEMZ5McMJPZ5enhswg1dpQ_Ncg3.jpg', price: 850000, oldPrice: null, discount: null, colors: [{name:'آبی نفتی',hex:'#1e3a8a'},{name:'سفید',hex:'#fff'}], sizes: ['S','M','L','XL','XXL'] },
    { id: 4, name: 'شومیز زنانه ابریشمی', slug: 'women-blouse', image: 'images/86MVFLaR9Hlbed0NvSAvB1vX6aVNX8iD1UaipOxp_Ncg3.jpg', price: 950000, oldPrice: null, discount: null, colors: [{name:'مشکی',hex:'#000'},{name:'کرم',hex:'#f5e6d3'}], sizes: ['S','M','L'] },
    { id: 5, name: 'پیراهن روزمره سبز', slug: 'green-dress', image: 'images/PAMGrygCiNqO3sg01IsGYEqcyq2nbv4EXRSPla0n_Ncg3.jpg', price: 1600000, oldPrice: 2000000, discount: 20, colors: [{name:'زرد',hex:'#facc15'},{name:'قرمز',hex:'#ef4444'}], sizes: ['6XL','7XL','8XL'] },
    { id: 6, name: 'کیف دوشی چرم', slug: 'leather-bag', image: 'images/1WZG0tA1MgPduItmrW90LFsmqcV3tdi6aeoqW231_Ncg3.jpg', price: 2380000, oldPrice: 2790000, discount: 15, colors: [{name:'قهوه‌ای',hex:'#78350f'},{name:'مشکی',hex:'#000'}], sizes: [] },
    { id: 7, name: 'مانتو لینن روشن', slug: 'linen-coat', image: 'images/Ulk5wcZIO5cKR6Njbp1thsekzwsyTiLWmFYcwBzf_Ncg3.jpg', price: 2290000, oldPrice: 3290000, discount: 30, colors: [{name:'کرم',hex:'#f5e6d3'},{name:'سفید',hex:'#fff'}], sizes: ['S','M','L','XL'] },
    { id: 8, name: 'شومیز ساتن کرم', slug: 'satin-blouse', image: 'images/JSlsnmwdQrUZvdZCcMBMEECwwUJIgoNhdfG5Z5h4_Ncg3.jpg', price: 1640000, oldPrice: 2050000, discount: 20, colors: [{name:'کرم',hex:'#f5e6d3'},{name:'نقره‌ای',hex:'#d1d5db'}], sizes: ['S','M','L'] },
    { id: 9, name: 'کت جیر مینیمال', slug: 'suede-coat', image: 'images/images_h8zt.jpg', price: 2890000, oldPrice: null, discount: null, colors: [{name:'قهوه‌ای',hex:'#78350f'}], sizes: ['M','L','XL'] }
];

/* ═══════════ PRODUCT STORAGE (localStorage) ═══════════ */
const PRODUCTS_KEY = 'avina-products';

let PRODUCTS = (() => {
    try {
        const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
        if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch (e) {}
    return DEFAULT_PRODUCTS.map(p => ({ ...p }));
})();

function saveProducts() {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS));
}

function addProduct(data) {
    const newId = PRODUCTS.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const price = Number(data.price);
    const oldPrice = data.oldPrice ? Number(data.oldPrice) : null;
    const product = {
        id: newId,
        name: data.name.trim(),
        slug: 'product-' + newId,
        image: data.image.trim(),
        price: price,
        oldPrice: oldPrice,
        discount: (oldPrice && oldPrice > price)
            ? Math.round((1 - price / oldPrice) * 100)
            : null,
        colors: [],
        sizes: (data.sizes || '').split(',').map(s => s.trim()).filter(Boolean)
    };
    PRODUCTS.push(product);
    saveProducts();
    return product;
}

function deleteProduct(id) {
    PRODUCTS = PRODUCTS.filter(p => p.id !== id);
    saveProducts();
}

/* ═══════════ HELPERS ═══════════ */
function formatPrice(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان';
}

/* ✅ سازندهٔ کارت محصول */
function productCardHTML(p) {
    return `
        <article class="product-card">
            <a href="product.html?id=${p.id}" class="product-img-wrap">
                ${p.discount ? `<span class="product-badge">${p.discount}٪</span>` : ''}
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </a>
            <div class="product-info">
                <h3 class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
                ${p.oldPrice ? `<div class="product-old-price">${formatPrice(p.oldPrice)}</div>` : ''}
                <div class="product-price">${formatPrice(p.price)}</div>
                <button class="product-btn product-btn-primary" onclick="addToCart(${p.id})">افزودن به سبد خرید</button>
                <a href="product.html?id=${p.id}" class="product-btn product-btn-outline">مشاهده محصول</a>
            </div>
        </article>`;
}

/* ═══════════ CART ═══════════ */
const CART_KEY = 'avina-cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(id, qty = 1) {
    const found = cart.find(i => i.id === id);
    if (found) found.qty += qty;
    else cart.push({ id, qty });
    saveCart();
    showToast('✓ به سبد خرید اضافه شد');
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    if (typeof renderCartPage === 'function') renderCartPage();
    renderCartDrawer();
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    else {
        saveCart();
        if (typeof renderCartPage === 'function') renderCartPage();
        renderCartDrawer();
    }
}

function cartTotal() {
    return cart.reduce((sum, item) => {
        const p = PRODUCTS.find(x => x.id === item.id);
        return sum + (p ? p.price * item.qty : 0);
    }, 0);
}

function cartCount() {
    return cart.reduce((sum, i) => sum + i.qty, 0);
}

/* ✅ آپدیت هر دو badge (دسکتاپ + موبایل) */
function updateCartCount() {
    const count = cartCount();
    document.querySelectorAll('.cart-count').forEach(el => {
        if (count > 0) { el.textContent = count; el.classList.add('show'); }
        else el.classList.remove('show');
    });
}

/* ═══════════ DRAWERS ═══════════ */
function toggleSearch() {
    document.getElementById('searchPanel')?.classList.toggle('open');
}
function openMobile() {
    document.getElementById('mobileDrawer')?.classList.add('open');
    document.getElementById('overlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeMobile() {
    document.getElementById('mobileDrawer')?.classList.remove('open');
    document.getElementById('overlay')?.classList.remove('open');
    document.body.style.overflow = '';
}
function openCart() {
    document.getElementById('cartDrawer')?.classList.add('open');
    document.getElementById('overlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
}
function closeCart() {
    document.getElementById('cartDrawer')?.classList.remove('open');
    document.getElementById('overlay')?.classList.remove('open');
    document.body.style.overflow = '';
}
function closeAll() {
    closeMobile();
    closeCart();
    document.getElementById('searchPanel')?.classList.remove('open');
    document.getElementById('productsDropdown')?.classList.remove('open');
}

/* ═══════════ MEGA MENU (دسکتاپ) ═══════════ */
function toggleProductsMenu(e) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    document.getElementById('productsDropdown')?.classList.toggle('open');
}

/* ═══════════ DRAWER PRODUCTS (موبایل) ═══════════ */
function toggleDrawerProducts() {
    document.getElementById('drawerProducts')?.classList.toggle('open');
}

/* ═══════════ TOAST ═══════════ */
let toastTimer;
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

/* ═══════════ HEADER HIDE ON SCROLL ═══════════ */
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (!header) return;
    const y = window.scrollY;
    if (y > 80 && y > lastScrollY) header.classList.add('hide');
    else header.classList.remove('hide');
    lastScrollY = y;
});

/* ═══════════ SLIDER ═══════════ */
function initSlider() {
    const track = document.getElementById('sliderTrack');
    const dotsEl = document.getElementById('sliderDots');
    if (!track || !dotsEl) return;

    const total = track.children.length;
    let current = 0;
    let timer;

    dotsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goTo(i);
        dotsEl.appendChild(dot);
    }

    function update() {
        track.style.transform = `translateX(${current * 100}%)`;
        Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(i) {
        current = i;
        update();
        resetTimer();
    }

    window.moveSlide = (dir) => {
        current = (current + dir + total) % total;
        update();
        resetTimer();
    };

    function startTimer() {
        timer = setInterval(() => {
            current = (current + 1) % total;
            update();
        }, 5000);
    }
    function resetTimer() { clearInterval(timer); startTimer(); }

    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 50) window.moveSlide(diff < 0 ? 1 : -1);
    }, { passive: true });

    startTimer();
}

/* ═══════════ CART DRAWER ═══════════ */
function renderCartDrawer() {
    const body = document.getElementById('cartDrawer')?.querySelector('.drawer-body');
    if (!body) return;

    if (cart.length === 0) {
        body.innerHTML = `
            <div class="drawer-empty">
                <div class="drawer-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2l2.4 10.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
                </div>
                <p>سبد خرید شما خالی است</p>
                <a href="products.html">مشاهده محصولات</a>
            </div>`;
        return;
    }

    const itemsHtml = cart.map(item => {
        const p = PRODUCTS.find(x => x.id === item.id);
        if (!p) return '';
        return `
            <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #e7e5e4">
                <img src="${p.image}" style="width:60px;height:60px;object-fit:cover;border-radius:8px">
                <div style="flex:1">
                    <div style="font-size:13px;font-weight:700">${p.name}</div>
                    <div style="font-size:12px;color:#78716c;margin-top:4px">${item.qty} × ${formatPrice(p.price)}</div>
                </div>
            </div>`;
    }).join('');

    body.innerHTML = `
        ${itemsHtml}
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e7e5e4">
            <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:800">
                <span>مجموع:</span><span>${formatPrice(cartTotal())}</span>
            </div>
            <a href="cart.html" style="display:block;margin-top:12px;text-align:center;padding:12px;background:#1c1917;color:#fff;border-radius:12px;font-size:13px;font-weight:700">مشاهده سبد خرید</a>
        </div>`;
}

/* ═══════════ INIT ═══════════ */
document.addEventListener('DOMContentLoaded', () => {
    const rawPage = document.body.dataset.page || '';
    /* در product.html، در نویگیشن «محصولات» فعال بشه */
    const page = rawPage === 'product' ? 'products' : rawPage;

    const headerEl = document.getElementById('app-header');
    if (headerEl && window.HEADER_HTML) {
        headerEl.innerHTML = window.HEADER_HTML(page);
    }

    const footerEl = document.getElementById('app-footer');
    if (footerEl && window.FOOTER_HTML) {
        footerEl.innerHTML = window.FOOTER_HTML();
    }

    updateCartCount();
    initSlider();

    /* بستن مگامنو با کلیک بیرون */
    document.addEventListener('click', (e) => {
        const dd = document.getElementById('productsDropdown');
        if (dd && !dd.contains(e.target)) dd.classList.remove('open');
    });

    /* بستن با Esc */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAll();
    });
});