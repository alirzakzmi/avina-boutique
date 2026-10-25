window.HEADER_HTML = function(activePage) {
    const active = (p) => activePage === p ? 'active' : '';
    return `
<header class="header" id="header">

    <!-- ═══ Desktop header ═══ -->
    <div class="container header-inner">
        <a href="index.html" class="logo">
            <div class="logo-icon">A</div>
            <div class="logo-text">
                <div class="brand">بوتیک آوینا</div>
                <div class="sub">AVINA BOUTIQUE</div>
            </div>
        </a>

        <div class="header-actions">
            <nav class="nav">
                <a href="index.html" class="nav-link ${active('index')}">صفحه اصلی</a>
                <a href="index.html#about" class="nav-link">درباره ما</a>
                <a href="index.html#contact" class="nav-link">تماس با ما</a>

                <div class="nav-dropdown" id="productsDropdown">
                    <button type="button" class="nav-link dropdown-toggle ${active('products')}" onclick="toggleProductsMenu(event)">
                        محصولات
                        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="mega-menu">
                        <div class="category-menu-grid">
                            <a href="products.html" class="category-menu-item">
                                <img src="images/X3Jjpmft25uOLNXBp2Q6zBsF0hszSvgzGrd7KL01_Ncg3.jpg" alt="زنانه">
                                <span>زنانه</span>
                            </a>
                            <a href="products.html" class="category-menu-item">
                                <img src="images/VJ2rF0NWghqEqvBr3umeZPKoNGzOimMoJ7bbcuB9_Ncg3.jpg" alt="مردانه">
                                <span>مردانه</span>
                            </a>
                            <a href="products.html" class="category-menu-item">
                                <img src="images/zrcDi24k3K2eL5Bg2qt3wT6M0H4sCE7RrWDAVB15_Ncg3.jpg" alt="بچگانه">
                                <span>بچگانه</span>
                            </a>
                            <a href="products.html" class="category-menu-item">
                                <img src="images/PCOLnMXVy24SPDFCMY4tBaPnmJijKd8RxGru4EsX_Ncg3.png" alt="اکسسوری">
                                <span>اکسسوری</span>
                            </a>
                        </div>
                        <div class="mega-menu-footer"><a href="products.html">مشاهده همه محصولات ←</a></div>
                    </div>
                </div>
            </nav>

            <a href="#" class="nav-link">ورود</a>

            <button class="icon-btn" onclick="toggleSearch()" aria-label="جستجو">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>
                </svg>
            </button>

            <button class="icon-btn" onclick="openCart()" aria-label="سبد خرید">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 4h2l2.4 10.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 8H6"/>
                    <circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>
                </svg>
                <span class="cart-count">0</span>
            </button>
        </div>
    </div>

    <!-- ═══ Mobile header ═══ -->
    <div class="mobile-header">
        <button class="icon-btn" onclick="openMobile()" aria-label="منو">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>
            </svg>
        </button>
        <a href="index.html" class="logo">
            <div class="logo-icon">A</div>
            <div class="logo-text">
                <div class="brand">بوتیک آوینا</div>
            </div>
        </a>
        <button class="icon-btn" onclick="openCart()" aria-label="سبد">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <path d="M3 4h2l2.4 10.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 8H6"/>
                <circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>
            </svg>
            <span class="cart-count">0</span>
        </button>
    </div>

    <!-- Search -->
    <div class="search-panel" id="searchPanel">
        <div class="container">
            <form action="products.html" method="GET">
                <input type="text" name="search" class="search-input" placeholder="نام محصول را جستجو کنید...">
            </form>
        </div>
    </div>
</header>

<div class="overlay" id="overlay" onclick="closeAll()"></div>

<!-- ═══ Mobile sidebar ═══ -->
<aside class="drawer drawer-mobile" id="mobileDrawer">
    <div class="drawer-header">
        <div style="display:flex;align-items:center;gap:12px;">
            <div class="logo-icon" style="width:36px;height:36px;font-size:14px;">A</div>
            <div><div style="font-size:14px;font-weight:800;">بوتیک آوینا</div><div style="font-size:9px;color:var(--text-light);letter-spacing:2px;">AVINA BOUTIQUE</div></div>
        </div>
        <button class="drawer-close" onclick="closeMobile()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12"/><path d="m18 6-12 12"/></svg>
        </button>
    </div>
    <div class="drawer-body drawer-nav">
        <a href="index.html" class="${active('index')}">صفحه اصلی</a>
        <a href="index.html#about">درباره ما</a>
        <a href="index.html#contact">تماس با ما</a>
        <a href="cart.html" class="${active('cart')}">سبد خرید</a>

        <!-- محصولات (بازشو) -->
        <div class="drawer-products" id="drawerProducts">
            <button type="button" class="drawer-products-toggle" onclick="toggleDrawerProducts()">
                <span>محصولات</span>
                <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="drawer-products-list">
                <a href="products.html">زنانه</a>
                <a href="products.html">مردانه</a>
                <a href="products.html">بچگانه</a>
                <a href="products.html">اکسسوری</a>
                <a href="products.html" class="view-all">مشاهده همه محصولات ←</a>
            </div>
        </div>

        <a href="#" class="drawer-login">ورود به حساب کاربری</a>
    </div>
</aside>

<aside class="drawer drawer-cart" id="cartDrawer">
    <div class="drawer-header">
        <div><h2>سبد خرید</h2><p style="font-size:11px;color:var(--text-light);margin-top:2px;">محصولات انتخاب‌شده</p></div>
        <button class="drawer-close" onclick="closeCart()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12"/><path d="m18 6-12 12"/></svg>
        </button>
    </div>
    <div class="drawer-body"></div>
</aside>
`;
};