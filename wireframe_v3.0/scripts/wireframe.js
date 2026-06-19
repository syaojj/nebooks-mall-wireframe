// =====================================================
//  NAVIGATION
// =====================================================
function show(id, el) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-a').forEach(a => a.classList.remove('active'));
  document.getElementById('s-' + id).classList.add('active');
  if (el) el.classList.add('active');
}

// =====================================================
//  SHARED COMPONENTS
// =====================================================

// D1gCo3 Header (2-row, 120px) + Utility Bar
function header(activeGnb) {
  const gnbItems = ['ELT','초/중등교재','고등교재','교과서및자습서','수험/일반','수학','국어','학습자료실'];
  return `
<div class="util-bar">
  <div class="util-links">
    ${['NE능률','교사','영어수학교재','ELT교재','영자신문','아이엘린지','유아교육'].map(l=>`<span class="util-link">${l}</span>`).join('')}
  </div>
  <span class="util-signup">통합회원가입</span>
</div>
<header class="hd">
  <div class="hd-r1">
    <div class="hd-logo">NE<b>_Books</b></div>
    <div class="hd-search">
      <svg viewBox="0 0 24 24" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input class="hd-search-input" type="text" placeholder="교재명, 시리즈, 저자를 검색하세요" readonly>
    </div>
    <div class="hd-icons">
      <button class="hd-icon">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        로그인
      </button>
      <button class="hd-icon">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        찜
      </button>
      <button class="hd-icon">
        <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        장바구니
      </button>
    </div>
  </div>
  <div class="hd-r2">
    ${gnbItems.map(g => `<div class="gnb${g===activeGnb?' on':''}">${g}</div>`).join('')}
  </div>
</header>`;
}

// VxZSA Book Card (240×340)
function bookCard(title, series, price, origPrice, badge) {
  const badgeClass = badge === 'BEST' ? 'bk-badge best' : badge === 'SALE' ? 'bk-badge sale' : 'bk-badge';
  return `
<div class="bk">
  <div class="bk-img">
    <div class="bk-img-ph"></div>
    ${badge ? `<span class="${badgeClass}">${badge}</span>` : ''}
  </div>
  <div class="bk-meta">
    <div class="bk-series">${series}</div>
    <div class="bk-title">${title}</div>
    <div class="bk-price">${price}${origPrice ? `<span class="bk-orig">${origPrice}</span>` : ''}</div>
  </div>
</div>`;
}

// Footer
function footer() {
  return `
<footer class="footer">
  <div>
    <div class="ft-logo">NE<span>_Books</span></div>
    <div class="ft-corp">
      (주)NE능률 &nbsp;|&nbsp; 대표이사 : 이수진 &nbsp;|&nbsp; 사업자등록번호 : 000-00-00000<br>
      서울특별시 마포구 월드컵북로 396 (상암동, 누리꿈스퀘어 비즈니스타워 20F)<br>
      고객센터 : 1588-0000 &nbsp;|&nbsp; 평일 09:00~18:00 &nbsp;|&nbsp; 이메일 : nebooks@neungyule.com
    </div>
  </div>
  <div>
    <div class="ft-links">
      <a href="#">이용약관</a>
      <a href="#">개인정보처리방침</a>
      <a href="#">고객센터</a>
      <a href="#">회사소개</a>
      <a href="#">제휴/입점문의</a>
    </div>
  </div>
</footer>`;
}

// Breadcrumb
function breadcrumb(items) {
  return `<div class="breadcrumb">${items.map((it,i) =>
    i === items.length-1
      ? `<span class="bc-cur">${it}</span>`
      : `<span>${it}</span><span class="bc-sep">›</span>`
  ).join('')}</div>`;
}

// Filter Group
function filterGroup(title, options) {
  return `
<div class="fg">
  <div class="fg-title">${title} <span>∧</span></div>
  <div class="fg-opts">
    ${options.map((o,i) => `
    <label class="fg-opt">
      <span class="fg-check${i===0?' on':''}"></span>${o}
    </label>`).join('')}
  </div>
</div>`;
}

// =====================================================
//  SCREEN 1: 메인 화면
// =====================================================
document.getElementById('frame-main').innerHTML = `
${header('ELT')}

<div class="evt-section">
  <div class="evt-head">
    <div class="evt-tabs">
      ${[{t:'이벤트',on:false},{t:'신간',on:true},{t:'세미나',on:false}].map(e=>`<div class="evt-tab${e.on?' on':''}">${e.t}</div>`).join('')}
    </div>
    <span class="evt-more">전체보기 →</span>
  </div>
  <div class="evt-cards">
    ${[
      {title:'2024 겨울 특별 이벤트',sub:'12.01 ~ 12.31',badge:'evt-badge-evt',lbl:'이벤트'},
      {title:'신간 Grammar Power',sub:'2024 신간 출시',badge:'evt-badge-new',lbl:'신간'},
      {title:'영어교육 세미나 2024',sub:'2024.12.15 온라인',badge:'evt-badge-sem',lbl:'세미나'},
      {title:'학습자료 무료 제공',sub:'로그인 후 다운로드',badge:'evt-badge-free',lbl:'FREE'},
    ].map(c=>`
    <div class="evt-card">
      <div class="evt-card-img">
        <span class="evt-card-badge ${c.badge}">${c.lbl}</span>
      </div>
      <div class="evt-card-body">
        <div class="evt-card-title">${c.title}</div>
        <div class="evt-card-sub">${c.sub}</div>
      </div>
    </div>`).join('')}
  </div>
</div>

<div class="hero-tab-bar">
  ${['ELT','영어','수학','국어'].map((t,i)=>`<div class="hero-tab-btn${i===1?' on':''}">${t}</div>`).join('')}
</div>

<div class="hero">
  <div class="hero-l">
    <div class="hero-eyebrow">2024 신간 출시</div>
    <div class="hero-h1">2024 NEW<br>Grammar Power<br>Series</div>
    <div class="hero-desc">체계적인 문법 학습으로<br>영어 실력을 완성하세요.</div>
    <div class="hero-cta">
      <button class="btn btn-primary">자세히 보기</button>
      <button class="btn btn-outline">시리즈 전체보기</button>
    </div>
  </div>
  <div class="hero-r">
    <div class="hero-book">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      Book Image 300×400
    </div>
  </div>
</div>

<div class="qnav">
  ${[
    {label:'영어', icon:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'},
    {label:'수학', icon:'<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'},
    {label:'국어', icon:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'},
    {label:'과학', icon:'<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>'},
    {label:'사회', icon:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'},
    {label:'한국사', icon:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'},
    {label:'제2외국어', icon:'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>'},
    {label:'기타', icon:'<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>'},
  ].map(q => `
  <div class="qnav-item">
    <div class="qnav-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8">${q.icon}</svg>
    </div>
    <span class="qnav-label">${q.label}</span>
  </div>`).join('')}
</div>

<div class="band">
  <div class="band-title">추천 교재 <small>맞춤 추천</small></div>
  <div class="card-row">
    ${bookCard('Grammar Power Level 1','Grammar Power','13,500원','15,000원','NEW')}
    ${bookCard('Reading Expert 2','Reading Expert','12,600원','14,000원','BEST')}
    ${bookCard('Grammar Zone 기초','Grammar Zone','11,700원','13,000원','')}
    ${bookCard('Listening Power 1','Listening Power','12,150원','13,500원','SALE')}
  </div>
</div>

<div class="dual-banner">
  <div class="db-item">
    <div class="db-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    </div>
    <div>
      <div class="db-h3">NE 튜터 학습 서비스</div>
      <div class="db-p">AI 기반 맞춤형 영어 학습을<br>경험하세요</div>
    </div>
  </div>
  <div class="db-item">
    <div class="db-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
    </div>
    <div>
      <div class="db-h3">Waffle 앱 연동</div>
      <div class="db-p">모바일에서도 이어서<br>학습하세요</div>
    </div>
  </div>
</div>

<div class="band">
  <div class="band-title">베스트셀러 <small>이달의 인기 교재</small></div>
  <div class="card-row">
    ${bookCard('Grammar Inside Level 1','Grammar Inside','12,600원','14,000원','BEST')}
    ${bookCard('Reading Expert 3','Reading Expert','13,500원','15,000원','BEST')}
    ${bookCard('Grammar Power Advanced','Grammar Power','16,200원','18,000원','NEW')}
    ${bookCard('수능특강 영어','수능특강','9,000원','10,000원','')}
  </div>
</div>

<div class="band white">
  <div class="band-title">신규 출시 <small>이번 달 신간</small></div>
  <div class="card-row">
    ${bookCard('Grammar Power Level 2','Grammar Power','13,500원','15,000원','NEW')}
    ${bookCard('Listening Power 2','Listening Power','12,150원','13,500원','NEW')}
    ${bookCard('Reading Expert 1','Reading Expert','11,700원','13,000원','NEW')}
    ${bookCard('Grammar Inside 기초','Grammar Inside','11,700원','13,000원','NEW')}
  </div>
</div>

${footer()}
`;

// =====================================================
//  SCREEN 2: 교재목록
// =====================================================
document.getElementById('frame-list').innerHTML = `
${header('ELT')}
${breadcrumb(['홈','교재탐색','영어'])}

<div class="list-layout">
  <aside class="filter-sb">
    <div class="sb-head">필터 <span class="sb-reset">초기화</span></div>
    ${filterGroup('카테고리', ['ELT','Grammar','Reading','Listening','Vocabulary'])}
    ${filterGroup('학년', ['초등','중학교','고등학교','일반/성인'])}
    ${filterGroup('과목', ['영어','수학','국어','과학'])}
    ${filterGroup('출판사', ['NE능률','천재교육','비상교육','금성출판사'])}
    <div class="fg">
      <div class="fg-title">가격 <span>∧</span></div>
      <div class="fg-opts" style="padding-bottom:16px">
        <div style="display:flex;gap:8px;align-items:center;font-size:13px">
          <input style="width:90px;border:1px solid var(--ne-border);border-radius:6px;padding:6px 10px;font-size:13px" value="0" readonly>
          <span>~</span>
          <input style="width:90px;border:1px solid var(--ne-border);border-radius:6px;padding:6px 10px;font-size:13px" value="50,000" readonly>
        </div>
      </div>
    </div>
  </aside>

  <div class="product-area">
    <div class="series-row">
      <div class="chip on">전체</div>
      <div class="chip">Grammar Power</div>
      <div class="chip">Grammar Inside</div>
      <div class="chip">Reading Expert</div>
      <div class="chip">Listening Power</div>
      <div class="chip">Grammar Zone</div>
    </div>

    <div class="toolbar">
      <div class="toolbar-count">총 <strong>124</strong>개 교재</div>
      <div class="toolbar-r">
        <select class="sort-sel"><option>추천순</option><option>판매량순</option><option>신상품순</option><option>낮은가격순</option></select>
        <div class="view-tgl">
          <button class="view-btn on" title="그리드">⊞</button>
          <button class="view-btn" title="리스트">≡</button>
        </div>
      </div>
    </div>

    <div class="bk-grid">
      ${bookCard('Grammar Power Level 1','Grammar Power','13,500원','15,000원','NEW')}
      ${bookCard('Grammar Power Level 2','Grammar Power','13,500원','15,000원','')}
      ${bookCard('Grammar Power Level 3','Grammar Power','13,500원','15,000원','')}
      ${bookCard('Grammar Inside Level 1','Grammar Inside','12,600원','14,000원','BEST')}
      ${bookCard('Grammar Inside Level 2','Grammar Inside','12,600원','14,000원','')}
      ${bookCard('Reading Expert 1','Reading Expert','11,700원','13,000원','')}
      ${bookCard('Reading Expert 2','Reading Expert','12,600원','14,000원','BEST')}
      ${bookCard('Reading Expert 3','Reading Expert','13,500원','15,000원','')}
    </div>

    <div class="pagination">
      <div class="pg-btn">‹</div>
      <div class="pg-btn on">1</div>
      <div class="pg-btn">2</div>
      <div class="pg-btn">3</div>
      <div class="pg-btn">4</div>
      <div class="pg-btn">5</div>
      <div class="pg-btn">›</div>
    </div>
  </div>
</div>

${footer()}
`;

// =====================================================
//  SCREEN 2-2: E-Book/자료
// =====================================================
document.getElementById('frame-ebook').innerHTML = `
${header('ELT')}
${breadcrumb(['홈','교재탐색','E-Book/자료'])}

<div style="background:#fff;padding:20px 48px 0">
  <h2 style="font-family:var(--font-mono);font-size:22px;font-weight:700;margin-bottom:16px">E-Book / 자료</h2>
  <div class="ebook-tabs">
    <div class="ebook-tab on">E-Book</div>
    <div class="ebook-tab">학습자료</div>
  </div>
</div>

<div class="list-layout" style="padding:28px 48px;background:#F2F3F0;gap:28px">
  <aside class="filter-sb">
    <div class="sb-head">필터 <span class="sb-reset">초기화</span></div>
    ${filterGroup('카테고리', ['ELT','Grammar','Reading','Vocabulary'])}
    ${filterGroup('학년', ['초등','중학교','고등학교'])}
    ${filterGroup('자료유형', ['E-Book','MP3','PDF','동영상'])}
  </aside>

  <div class="product-area">
    <div class="toolbar">
      <div class="toolbar-count">총 <strong>38</strong>개 자료</div>
      <div class="toolbar-r">
        <select class="sort-sel"><option>최신순</option><option>교재명순</option></select>
      </div>
    </div>

    <div class="ebook-list">
      ${[
        {title:'Grammar Power Level 1 E-Book',series:'Grammar Power',price:'8,100원',tags:['E-Book','ELT','고등']},
        {title:'Grammar Power Level 2 E-Book',series:'Grammar Power',price:'8,100원',tags:['E-Book','ELT','고등']},
        {title:'Reading Expert 1 E-Book',series:'Reading Expert',price:'7,200원',tags:['E-Book','ELT','중학교']},
        {title:'Grammar Inside Level 1 E-Book',series:'Grammar Inside',price:'7,200원',tags:['E-Book','ELT','중학교']},
        {title:'Listening Power 1 학습자료',series:'Listening Power',price:'무료',tags:['MP3','ELT','중학교'],free:true},
      ].map(e => `
      <div class="ebook-row">
        <div class="ebook-thumb"></div>
        <div class="ebook-info">
          <div class="ebook-series">${e.series}</div>
          <div class="ebook-title">${e.title}</div>
          <div class="ebook-tags">${e.tags.map(t=>`<span class="ebook-tag">${t}</span>`).join('')}</div>
        </div>
        <div class="ebook-actions">
          <div class="${e.free?'ebook-free':'ebook-price'}">${e.price}</div>
          <button class="ebook-btn${e.free?' ghost':''}">${e.free?'다운로드':'구매하기'}</button>
        </div>
      </div>`).join('')}
    </div>

    <div class="pagination" style="margin-top:24px">
      <div class="pg-btn">‹</div>
      <div class="pg-btn on">1</div>
      <div class="pg-btn">2</div>
      <div class="pg-btn">›</div>
    </div>
  </div>
</div>

${footer()}
`;

// =====================================================
//  SCREEN 3: 교재상세
// =====================================================
document.getElementById('frame-detail').innerHTML = `
${header('ELT')}
${breadcrumb(['홈','교재탐색','영어','Grammar Power Level 1'])}

<div class="detail-layout">
  <div class="detail-imgs">
    <div class="detail-main-img">
      <div class="ph" style="width:100px;height:130px;border-style:solid;border-color:#D1D5DB">460×580</div>
    </div>
    <div class="thumb-row">
      <div class="thumb on"></div>
      <div class="thumb"></div>
      <div class="thumb"></div>
      <div class="thumb"></div>
    </div>
  </div>

  <div class="detail-buy">
    <div class="series-tag">Grammar Power</div>
    <div class="detail-title">Grammar Power<br>Level 1</div>
    <div class="detail-author">NE능률 영어교육연구소 저 · NE능률</div>
    <div class="svc-chips">
      <span class="svc-lbl">부가서비스</span>
      ${['Answer Key','MP3','Test Sheet','Lesson Plans','Word Lists'].map(s=>`<span class="svc-chip">${s}</span>`).join('')}
    </div>
    <div class="divider"></div>
    <div class="rating-row">
      <span class="stars">★★★★★</span>
      <span style="font-size:14px;font-weight:700">4.8</span>
      <span class="rating-count">(리뷰 128개)</span>
    </div>
    <div class="price-block">
      <div class="price-lbl">판매가</div>
      <div class="price-main">
        <span class="price-disc">10%</span>
        <span class="price-val">13,500원</span>
        <span class="price-orig">15,000원</span>
      </div>
    </div>
    <div class="qty-row">
      <span class="qty-lbl">수량</span>
      <div class="qty-ctrl">
        <button class="qty-btn">−</button>
        <span class="qty-val">1</span>
        <button class="qty-btn">+</button>
      </div>
    </div>
    <div class="cta-row">
      <button class="cta-buy">바로 구매하기</button>
      <button class="cta-cart">장바구니 담기</button>
    </div>
    <div class="wish-row">
      <svg viewBox="0 0 24 24"><path d="M5 3a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z"/></svg>
      ☆ 책갈피 추가
    </div>
    <div class="ship-box">
      <strong>배송 정보</strong><br>
      무료배송 (3만원 이상) · 2~3일 이내 출고<br>
      도서산간 추가배송비 발생
    </div>
  </div>
</div>

<div class="tab-sec">
  <div class="tab-bar">
    <div class="tab on">교재 소개</div>
    <div class="tab">목차</div>
    <div class="tab">학습자료 다운로드</div>
    <div class="tab">리뷰 <span class="tab-count">128</span></div>
  </div>
  <div class="tab-content">
    <table class="toc-tbl">
      <thead><tr><th>Unit</th><th>제목</th><th>학습 내용</th><th>페이지</th></tr></thead>
      <tbody>
        ${[
          ['Unit 01','명사와 관사','가산/불가산 명사, 정관사/부정관사','p.12'],
          ['Unit 02','대명사','인칭대명사, 소유대명사, 재귀대명사','p.24'],
          ['Unit 03','동사의 시제','현재/과거/미래/진행/완료','p.36'],
          ['Unit 04','조동사','can, may, must, should, will','p.52'],
          ['Unit 05','수동태','수동태의 개념과 형태','p.64'],
          ['Unit 06','to부정사','명사/형용사/부사적 용법','p.76'],
          ['Unit 07','동명사','동명사의 역할과 관용 표현','p.90'],
          ['Unit 08','분사','현재분사, 과거분사, 분사구문','p.104'],
        ].map(r => `<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>

${footer()}
`;

// =====================================================
//  SCREEN 4: 장바구니 (v3.0 — 테이블 형식)
// =====================================================
const cartItems3 = [
  {title:'Grammar Power Level 1',series:'Grammar Power',orig:'15,000원',sale:'13,500원',pct:'10%할인+800P',qty:1,amount:'13,500원'},
  {title:'Reading Expert 2',series:'Reading Expert',orig:'14,000원',sale:'12,600원',pct:'10%할인+700P',qty:1,amount:'12,600원'},
  {title:'수능특강 영어 (2025)',series:'수능특강',orig:'10,000원',sale:'9,000원',pct:'10%할인',qty:1,amount:'9,000원'},
];
document.getElementById('frame-cart').innerHTML = `
${header('ELT')}

<div class="step-bar">
  <div class="step-bar-title">장바구니</div>
  <div class="step-indicator">
    <div class="step">
      <div class="step-circ on">1</div>
      <span class="step-lbl on">장바구니</span>
    </div>
    <span class="step-sep">›</span>
    <div class="step">
      <div class="step-circ">2</div>
      <span class="step-lbl">주문/결제</span>
    </div>
    <span class="step-sep">›</span>
    <div class="step">
      <div class="step-circ">3</div>
      <span class="step-lbl">주문/결제 완료</span>
    </div>
  </div>
</div>

<div class="cart-area">
  <table class="cart-tbl">
    <thead>
      <tr>
        <th class="ct-th" style="width:44px"><input type="checkbox" checked></th>
        <th class="ct-th left">상품</th>
        <th class="ct-th" style="width:110px">정가</th>
        <th class="ct-th" style="width:140px">판매가</th>
        <th class="ct-th" style="width:100px">수량</th>
        <th class="ct-th" style="width:120px">주문금액</th>
        <th class="ct-th" style="width:120px">주문/삭제</th>
      </tr>
    </thead>
    <tbody>
      ${cartItems3.map(it => `
      <tr>
        <td class="ct-td"><input type="checkbox" checked></td>
        <td class="ct-td">
          <div class="ct-prod">
            <div class="ct-book-img"></div>
            <div>
              <div class="ct-series">${it.series}</div>
              <div class="ct-title">${it.title}</div>
            </div>
          </div>
        </td>
        <td class="ct-td"><span class="ct-orig">${it.orig}</span></td>
        <td class="ct-td">
          <div class="ct-sale">${it.sale}</div>
          <div class="ct-pct">(${it.pct})</div>
        </td>
        <td class="ct-td">
          <div class="ct-qty">
            <button class="ct-qbtn">−</button>
            <span class="ct-qval">${it.qty}</span>
            <button class="ct-qbtn">+</button>
          </div>
        </td>
        <td class="ct-td"><span class="ct-amount">${it.amount}</span></td>
        <td class="ct-td">
          <div class="ct-actions">
            <button class="ct-order-btn">주문하기</button>
            <button class="ct-del-btn">삭제하기</button>
          </div>
        </td>
      </tr>`).join('')}
    </tbody>
  </table>

  <div class="cart-notes">
    <p>* 포인트는 주문/결제 페이지에서 적용 가능합니다.</p>
    <p>* 총 주문금액이 3만원 미만일 경우, 배송비가 부과됩니다. (도서산간 지역의 경우 2,500원 추가)</p>
  </div>

  <div class="cart-sum-bar">
    <div class="csb-col">
      <div class="csb-lbl">총 주문금액</div>
      <div class="csb-val">35,100원</div>
    </div>
    <span class="csb-sep">+</span>
    <div class="csb-col">
      <div class="csb-lbl">배송비</div>
      <div class="csb-val">0원 (무료배송)</div>
    </div>
    <span class="csb-sep">=</span>
    <div class="csb-col">
      <div class="csb-lbl">총 결제금액</div>
      <div class="csb-val hi">35,100원</div>
    </div>
  </div>

  <div class="cart-act-row">
    <button class="btn btn-ghost">선택상품 삭제</button>
    <button class="btn btn-outline btn-sm" style="padding:10px 20px;font-size:14px">선택상품 주문</button>
    <button class="btn btn-black" style="padding:10px 28px;font-size:14px">전체상품 주문</button>
  </div>
</div>

${footer()}
`;

// =====================================================
//  SCREEN 5: 주문/결제
// =====================================================
document.getElementById('frame-checkout').innerHTML = `
${header('ELT')}

<div class="step-bar">
  <div class="step-bar-title">주문 / 결제</div>
  <div class="step-indicator">
    <div class="step">
      <div class="step-circ" style="background:#E5E7EB;color:#9CA3AF">1</div>
      <span class="step-lbl">장바구니</span>
    </div>
    <span class="step-sep">›</span>
    <div class="step">
      <div class="step-circ on">2</div>
      <span class="step-lbl on">주문/결제</span>
    </div>
    <span class="step-sep">›</span>
    <div class="step">
      <div class="step-circ">3</div>
      <span class="step-lbl">주문/결제 완료</span>
    </div>
  </div>
</div>

<div class="checkout-layout">
  <div class="checkout-l">
    <div class="ck-card">
      <div class="ck-head">주문자 정보</div>
      <div class="ck-body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-lbl">이름</label>
            <input class="form-in" value="홍길동" readonly>
          </div>
          <div class="form-group">
            <label class="form-lbl">휴대폰</label>
            <input class="form-in" value="010-1234-5678" readonly>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-lbl">이메일</label>
            <input class="form-in" value="hong@example.com" readonly>
          </div>
        </div>
      </div>
    </div>

    <div class="ck-card">
      <div class="ck-head">배송지 정보</div>
      <div class="ck-body">
        <div class="form-row" style="margin-bottom:10px">
          <div class="form-group">
            <label class="form-lbl">배송지명</label>
            <input class="form-in" value="집" readonly>
          </div>
          <div class="form-group">
            <label class="form-lbl">받는 분</label>
            <input class="form-in" value="홍길동" readonly>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group" style="flex:0 0 120px">
            <label class="form-lbl">우편번호</label>
            <div style="display:flex;gap:8px">
              <input class="form-in" value="04001" style="flex:1" readonly>
              <button class="btn btn-ghost btn-sm">검색</button>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-lbl">주소</label>
            <input class="form-in" value="서울특별시 마포구 월드컵북로 396" readonly>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-lbl">상세주소</label>
            <input class="form-in" placeholder="상세주소 입력">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-lbl">배송 메모</label>
            <select class="form-in"><option>문 앞에 놓아주세요</option><option>직접 입력</option></select>
          </div>
        </div>
      </div>
    </div>

    <div class="ck-card">
      <div class="ck-head">주문 상품 목록</div>
      <div class="ck-body">
        ${[
          {title:'Grammar Power Level 1',meta:'NE능률 · 1권',price:'13,500원'},
          {title:'Reading Expert 2',meta:'NE능률 · 1권',price:'12,600원'},
          {title:'수능특강 영어 (2024)',meta:'EBS · 2권',price:'18,000원'},
        ].map(it => `
        <div class="ck-order-item">
          <div class="ck-oi-img"></div>
          <div>
            <div class="ck-oi-title">${it.title}</div>
            <div class="ck-oi-meta">${it.meta}</div>
            <div class="ck-oi-price">${it.price}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <div class="ck-card">
      <div class="ck-head">할인 적용</div>
      <div class="ck-body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-lbl">쿠폰</label>
            <select class="form-in"><option>쿠폰을 선택하세요 (보유 2장)</option></select>
          </div>
          <div class="form-group">
            <label class="form-lbl">포인트</label>
            <div style="display:flex;gap:8px">
              <input class="form-in" placeholder="0" style="flex:1">
              <button class="btn btn-ghost btn-sm">전액 사용</button>
            </div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--ne-secondary)">보유 포인트: 1,200P</div>
      </div>
    </div>

    <div class="ck-card">
      <div class="ck-head">결제 수단</div>
      <div class="ck-body">
        <div class="pay-methods">
          <div class="pay-m on">신용/체크카드</div>
          <div class="pay-m">무통장입금</div>
          <div class="pay-m">카카오페이</div>
          <div class="pay-m">네이버페이</div>
          <div class="pay-m">토스페이</div>
        </div>
      </div>
    </div>
  </div>

  <div class="checkout-r">
    <div class="checkout-sum">
      <div class="sum-head">결제 요약</div>
      <div class="sum-body">
        <div class="sum-row"><span class="sum-label">상품금액</span><span class="sum-val">44,100원</span></div>
        <div class="sum-row"><span class="sum-label">배송비</span><span class="sum-val free">무료</span></div>
        <div class="sum-row"><span class="sum-label">쿠폰 할인</span><span class="sum-val" style="color:var(--ne-primary)">-3,000원</span></div>
        <div class="sum-row"><span class="sum-label">포인트 사용</span><span class="sum-val" style="color:var(--ne-primary)">-100P</span></div>
        <div class="sum-divider"></div>
        <div class="sum-total"><span>최종 결제금액</span><span class="sum-amount">41,000원</span></div>
      </div>
    </div>
    <div class="tos-box">
      <label><input class="tos-check" type="checkbox" checked> 주문 내용을 확인하였으며 이용약관에 동의합니다.</label><br>
      <label><input class="tos-check" type="checkbox" checked> 개인정보 수집 및 이용에 동의합니다.</label>
    </div>
    <button class="pay-btn">41,000원 결제하기</button>
  </div>
</div>

${footer()}
`;

// =====================================================
//  SCREEN 6: 마이페이지
// =====================================================
document.getElementById('frame-mypage').innerHTML = `
${header('ELT')}

<div class="mypage-layout">
  <aside class="mypage-sb">
    <div class="member-card">
      <div class="member-av"></div>
      <div class="member-name">홍길동</div>
      <span class="member-grade">GOLD</span>
    </div>
    <div class="menu-list">
      <div class="menu-sec">주문 관리</div>
      <div class="menu-item on">
        <svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        주문 내역
      </div>
      <div class="menu-item">
        <svg viewBox="0 0 24 24"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        배송 조회
      </div>
      <div class="menu-section"></div>
      <div class="menu-sec">혜택</div>
      <div class="menu-item">
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        포인트
        <span class="menu-badge">1,200P</span>
      </div>
      <div class="menu-item">
        <svg viewBox="0 0 24 24"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
        쿠폰
        <span class="menu-badge">2장</span>
      </div>
      <div class="menu-sec">관심</div>
      <div class="menu-item">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        찜
        <span class="menu-badge">12</span>
      </div>
      <div class="menu-sec">계정</div>
      <div class="menu-item">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        회원정보 수정
      </div>
    </div>
  </aside>

  <div class="mypage-content">
    <div class="db-card">
      <div class="db-head">주문 현황 <a href="#">전체보기</a></div>
      <div class="os-row">
        <div class="os-item"><div class="os-num">2</div><div class="os-lbl">입금대기</div></div>
        <div class="os-item"><div class="os-num">1</div><div class="os-lbl">배송준비</div></div>
        <div class="os-item"><div class="os-num hi">3</div><div class="os-lbl">배송중</div></div>
        <div class="os-item"><div class="os-num">8</div><div class="os-lbl">배송완료</div></div>
        <div class="os-item"><div class="os-num">0</div><div class="os-lbl">교환/반품</div></div>
      </div>
    </div>

    <div class="db-card">
      <div class="db-head">최근 주문 내역 <a href="#">전체보기</a></div>
      ${[
        {title:'Grammar Power Level 1',meta:'2024.06.15 · 주문번호 202406150001',price:'13,500원',badge:'배송완료',bc:'ob-done'},
        {title:'Reading Expert 2',meta:'2024.06.10 · 주문번호 202406100002',price:'12,600원',badge:'배송완료',bc:'ob-done'},
        {title:'수능특강 영어 (2024)',meta:'2024.06.18 · 주문번호 202406180001',price:'18,000원',badge:'배송중',bc:'ob-ship'},
      ].map(o => `
      <div class="order-row">
        <div class="order-img"></div>
        <div class="order-info">
          <div class="order-title">${o.title}</div>
          <div class="order-meta">${o.meta}</div>
        </div>
        <div>${o.price}</div>
        <span class="obadge ${o.bc}">${o.badge}</span>
      </div>`).join('')}
    </div>

    <div style="display:flex;gap:16px">
      <div class="db-card" style="flex:1">
        <div class="db-head">포인트 <a href="#">내역보기</a></div>
        <div class="pts-row">
          <div>
            <div class="pts-val">1,200P</div>
            <div class="pts-label">사용 가능 포인트</div>
          </div>
          <button class="pts-btn">포인트 사용 안내</button>
        </div>
      </div>
      <div class="db-card" style="flex:1">
        <div class="db-head">쿠폰 <a href="#">등록하기</a></div>
        <div class="pts-row">
          <div>
            <div class="pts-val" style="color:var(--ne-heading)">2장</div>
            <div class="pts-label">보유 쿠폰 수</div>
          </div>
          <button class="pts-btn">쿠폰 사용 안내</button>
        </div>
      </div>
    </div>

    <div class="guide-box">
      <strong>구매 확정 안내</strong><br>
      배송 완료 후 7일이 지나면 자동으로 구매 확정이 됩니다.<br>
      구매 확정 시 적립금이 지급되며, 교환/반품이 불가합니다.
    </div>
  </div>
</div>

${footer()}
`;

// =====================================================
//  SCREEN 7: 찜
// =====================================================
document.getElementById('frame-wish').innerHTML = `
${header('ELT')}

<div class="wish-ph">
  <div class="wish-title-row">
    <h1 class="wish-h1">찜한 교재</h1>
    <span class="wish-badge">12</span>
  </div>
  <div class="wish-toolbar">
    <select class="wish-sort"><option>최근 찜 순</option><option>교재명 순</option><option>낮은가격 순</option></select>
  </div>
</div>

<div class="wish-content">
  <div class="state-note">
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    호버 상태에서 장바구니 담기 버튼이 표시됩니다.
  </div>

  <div class="wish-section-label">일반 상태 (4개)</div>
  <div class="wish-grid">
    ${[
      {title:'Grammar Power Level 1',series:'Grammar Power',price:'13,500원',badge:'NEW'},
      {title:'Reading Expert 2',series:'Reading Expert',price:'12,600원',badge:'BEST'},
      {title:'Grammar Inside Level 1',series:'Grammar Inside',price:'12,600원',badge:''},
      {title:'Listening Power 1',series:'Listening Power',price:'12,150원',badge:'SALE'},
    ].map(b => `
    <div class="wish-card">
      ${bookCard(b.title,b.series,b.price,'',b.badge)}
      <button class="wish-remove" title="찜 해제">×</button>
    </div>`).join('')}
  </div>

  <div class="wish-section-label">호버 상태 예시</div>
  <div class="hover-row">
    <div class="hr-img"></div>
    <div class="hr-info">
      <div class="hr-title">Grammar Power Level 2</div>
      <div class="hr-meta">Grammar Power · NE능률</div>
      <div class="hr-price">13,500원</div>
    </div>
    <div class="hr-actions">
      <button class="btn btn-black btn-sm">장바구니 담기</button>
      <button class="btn btn-ghost btn-sm">바로 구매하기</button>
    </div>
  </div>

  <div class="wish-section-label" style="margin-top:32px">빈 상태</div>
  <div class="wish-empty">
    <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    찜한 교재가 없습니다.<br>
    <span style="font-size:13px">마음에 드는 교재에 하트를 눌러보세요!</span>
  </div>
</div>

${footer()}
`;

// =====================================================
//  SCREEN 8: 학습자료실
// =====================================================
document.getElementById('frame-study').innerHTML = `
${header('학습자료실')}

<div class="data-ph">
  <div class="data-title">학습자료실</div>
  <div class="data-subtitle">교재별 MP3, PDF, 동영상 자료를 다운로드하세요</div>
</div>

<div class="perm-banner">
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  일부 자료는 교재 구매 후 다운로드할 수 있습니다.
  <a href="#" style="margin-left:8px;color:#1E40AF;font-weight:700">구매하러 가기</a>
</div>

<div class="data-layout">
  <aside class="data-sb">
    <div class="sb-search">
      <input type="text" placeholder="교재명 검색">
    </div>
    ${filterGroup('카테고리', ['ELT','Grammar','Reading','Listening'])}
    ${filterGroup('자료 유형', ['MP3','PDF','동영상','기타'])}
    ${filterGroup('학습 대상', ['초등','중학교','고등학교','일반/성인'])}
  </aside>

  <div class="data-content">
    <div class="data-toolbar">
      <div class="toolbar-count">총 <strong>8</strong>개 자료</div>
      <div class="toolbar-r">
        <select class="sort-sel"><option>최신순</option><option>교재명순</option><option>자료유형순</option></select>
      </div>
    </div>

    <table class="data-tbl">
      <thead>
        <tr>
          <th style="width:40%">자료명</th>
          <th style="width:15%">유형</th>
          <th style="width:20%">교재</th>
          <th style="width:12%">용량</th>
          <th style="width:13%">다운로드</th>
        </tr>
      </thead>
      <tbody>
        ${[
          {name:'Grammar Power Level 1 Unit 1-10 MP3',type:'MP3',ft:'ft-mp3',book:'Grammar Power L1',size:'28MB',free:true},
          {name:'Grammar Power Level 1 정답 및 해설 PDF',type:'PDF',ft:'ft-pdf',book:'Grammar Power L1',size:'12MB',free:false},
          {name:'Grammar Power Level 1 Unit 11-20 MP3',type:'MP3',ft:'ft-mp3',book:'Grammar Power L1',size:'30MB',free:true},
          {name:'Reading Expert 2 학습활동지 PDF',type:'PDF',ft:'ft-pdf',book:'Reading Expert 2',size:'8MB',free:false},
          {name:'Grammar Power Level 1 교사용 지도서 PDF',type:'PDF',ft:'ft-pdf',book:'Grammar Power L1',size:'45MB',free:false},
          {name:'Grammar Power 해설 강의 영상 (Unit 1)',type:'Video',ft:'ft-video',book:'Grammar Power L1',size:'340MB',free:false},
          {name:'Grammar Power Level 1 수업 계획서 PDF',type:'PDF',ft:'ft-pdf',book:'Grammar Power L1',size:'3MB',free:false},
          {name:'Grammar Power Level 1 어휘 MP3',type:'MP3',ft:'ft-mp3',book:'Grammar Power L1',size:'15MB',free:true},
        ].map(r => `
        <tr>
          <td>${r.name}</td>
          <td><span class="ft-badge ${r.ft}">${r.type}</span></td>
          <td style="font-size:12px;color:var(--ne-secondary)">${r.book}</td>
          <td style="color:var(--ne-secondary)">${r.size}</td>
          <td>${r.free
            ? `<button class="dl-btn">다운로드</button>`
            : `<button class="dl-btn" style="background:#9CA3AF" title="구매 후 이용 가능">잠금</button>`
          }</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>

${footer()}
`;


// =====================================================
//  SCREEN 9: 주문/결제완료 (v3.0)
// =====================================================
document.getElementById('frame-complete').innerHTML = `
${header('ELT')}

<div class="step-bar">
  <div class="step-bar-title">주문/결제 완료</div>
  <div class="step-indicator">
    <div class="step">
      <div class="step-circ" style="background:#E5E7EB;color:#9CA3AF">1</div>
      <span class="step-lbl">장바구니</span>
    </div>
    <span class="step-sep">›</span>
    <div class="step">
      <div class="step-circ" style="background:#E5E7EB;color:#9CA3AF">2</div>
      <span class="step-lbl">주문/결제</span>
    </div>
    <span class="step-sep">›</span>
    <div class="step">
      <div class="step-circ on">3</div>
      <span class="step-lbl on">주문/결제 완료</span>
    </div>
  </div>
</div>

<div class="complete-wrap">
  <div class="complete-card">
    <div class="complete-icon">✓</div>
    <div class="complete-title">주문이 완료되었습니다</div>
    <div class="complete-sub">주문해 주셔서 감사합니다. 주문 내역은 마이페이지에서 확인하실 수 있습니다.</div>

    <div class="complete-divider"></div>

    <div class="ci-row"><span class="ci-key">주문번호</span><span class="ci-val" style="font-family:var(--font-mono)">NE-20260619-00123</span></div>
    <div class="ci-row"><span class="ci-key">주문일시</span><span class="ci-val">2026.06.19 14:32:07</span></div>
    <div class="ci-row"><span class="ci-key">배송 예정</span><span class="ci-val">2026.06.23 (월) ~ 2026.06.25 (수)</span></div>
    <div class="ci-row"><span class="ci-key">결제수단</span><span class="ci-val">신용카드 (KB카드)</span></div>

    <div class="complete-divider"></div>

    <table class="complete-tbl">
      <thead>
        <tr>
          <th>상품명</th>
          <th style="width:60px;text-align:center">수량</th>
          <th style="width:100px;text-align:right">금액</th>
        </tr>
      </thead>
      <tbody>
        ${[
          {title:'Grammar Power Level 1', qty:1, price:'13,500원'},
          {title:'Reading Expert 2', qty:1, price:'12,600원'},
          {title:'수능특강 영어 (2025)', qty:1, price:'9,000원'},
        ].map(r=>`
        <tr>
          <td>${r.title}</td>
          <td style="text-align:center">${r.qty}</td>
          <td style="text-align:right;font-family:var(--font-mono);font-weight:600">${r.price}</td>
        </tr>`).join('')}
      </tbody>
    </table>

    <div class="complete-total-row">
      <span>총 결제금액</span>
      <span class="complete-total-amount">35,100원</span>
    </div>

    <div class="complete-actions">
      <button class="btn btn-outline">주문 내역 확인</button>
      <button class="btn btn-black">쇼핑 계속하기</button>
    </div>
  </div>
</div>

${footer()}
`;

// =====================================================
//  SCREEN 10: 고객센터 (v3.0)
// =====================================================
const faqData = [
  {q:'교재 배송은 얼마나 걸리나요?', a:'주문 후 1~3 영업일 이내 출고되며, 출고 후 1~2일 이내 배송됩니다. (도서산간 지역 추가 소요)', open:true},
  {q:'결제 취소/환불은 어떻게 하나요?', a:'마이페이지 > 주문내역에서 주문 취소가 가능합니다. 배송 완료 후에는 1:1 문의를 이용해 주세요.', open:false},
  {q:'포인트는 어떻게 사용하나요?', a:'주문/결제 페이지에서 보유 포인트를 확인하고 결제 시 사용하실 수 있습니다. 최소 1,000P 이상 보유 시 사용 가능합니다.', open:false},
  {q:'쿠폰 사용 방법을 알려주세요.', a:'주문/결제 페이지의 할인 적용 섹션에서 쿠폰을 선택하여 사용하세요. 일부 쿠폰은 중복 적용이 제한됩니다.', open:false},
  {q:'학습자료는 어디서 다운로드하나요?', a:'교재 상세 페이지의 [학습자료 다운로드] 탭에서 다운로드하실 수 있습니다. 일부 자료는 로그인 후 이용 가능합니다.', open:false},
];
document.getElementById('frame-cscenter').innerHTML = `
${header('ELT')}

${breadcrumb(['홈','고객센터'])}

<div class="cs-page-hd">
  <div class="cs-page-title">고객센터</div>
  <div class="cs-page-sub">궁금하신 점을 빠르게 해결해 드립니다.</div>
</div>

<div class="cs-layout">
  <div class="cs-main">
    <div class="cs-card">
      <div class="faq-tabs">
        ${['자주 묻는 질문','배송','교환/반품','결제','회원'].map((t,i)=>`<div class="faq-tab${i===0?' on':''}">${t}</div>`).join('')}
      </div>
      ${faqData.map(f=>`
      <div class="faq-item">
        <div class="faq-q"><span class="faq-q-pre">Q.</span>${f.q} <span style="margin-left:auto;color:var(--ne-muted);font-weight:400">${f.open?'∧':'∨'}</span></div>
        ${f.open?`<div class="faq-a"><span style="color:var(--ne-heading);font-weight:700;margin-right:8px">A.</span>${f.a}</div>`:''}
      </div>`).join('')}
    </div>

    <div class="cs-card">
      <div class="cs-head">공지사항</div>
      ${[
        {date:'2026.06.19', title:'NE Books 자사몰 개편 오픈 안내', isNew:true},
        {date:'2026.06.15', title:'6월 교재 업데이트 및 신간 출시 안내', isNew:true},
        {date:'2026.06.10', title:'개인정보처리방침 개정 안내', isNew:false},
        {date:'2026.05.30', title:'2025 수능특강 구매 이벤트 종료 안내', isNew:false},
        {date:'2026.05.20', title:'포인트 적립 정책 변경 안내', isNew:false},
      ].map(n=>`
      <div class="notice-item">
        <span class="notice-date">${n.date}</span>
        <span class="notice-title">${n.title}</span>
        ${n.isNew?'<span class="notice-new">NEW</span>':''}
      </div>`).join('')}
    </div>
  </div>

  <div class="cs-side">
    <div class="cs-card">
      <div class="cs-head">1:1 문의</div>
      <div class="cs-body">
        <p style="font-size:13px;color:var(--ne-secondary);margin-bottom:16px;line-height:1.6">로그인 후 문의를 남겨주시면 빠르게 답변 드립니다. 평균 응답 시간: 1 영업일 이내</p>
        <button class="btn btn-black btn-full">1:1 문의하기</button>
      </div>
    </div>

    <div class="cs-card">
      <div class="cs-head">고객센터 정보</div>
      <div class="cs-body" style="padding-top:8px;padding-bottom:8px">
        <div class="cs-info-row">
          <div class="cs-info-icon">📞</div>
          <div>
            <div class="cs-info-key">전화 문의</div>
            <div class="cs-info-val">1833-8368</div>
          </div>
        </div>
        <div class="cs-info-row">
          <div class="cs-info-icon">🕐</div>
          <div>
            <div class="cs-info-key">운영 시간</div>
            <div class="cs-info-val">평일 09:00 – 18:00</div>
          </div>
        </div>
        <div class="cs-info-row">
          <div class="cs-info-icon">✉️</div>
          <div>
            <div class="cs-info-key">이메일</div>
            <div class="cs-info-val">nebooks@neungyule.com</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

${footer()}
`;
