/* ==========================================================================
   NE Books · 교재목록 (design_v0.6) — interactions
   Behavior grounded in:
   - UC-FIND-05 필터 조회 / UC-FIND-06 목록유형 전환 / UC-FIND-07 판매중 교재만 보기
   - UC-FIND-08 정렬(6종, 기본 최신순) / UC-FIND-09 페이징 / UC-FIND-10 Empty
   - UC-INFO-01/02/04/15/17, UC-BUY-01/02/05/13, UC-MAT-01~11
   This is a front-end-only design implementation: actions that would require
   a real backend (cart/order/auth/download) surface a toast instead of a
   fake page navigation.
   ========================================================================== */

(function () {
  "use strict";

  var ICON_OUTLINE_HEART =
    '<svg class="icon-outline" viewBox="0 0 22 22" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M17.5833 13.0833C18.9492 11.745 20.3333 10.1408 20.3333 8.04167C20.3333 6.70453 19.8022 5.42217 18.8567 4.47667C17.9112 3.53117 16.6288 3 15.2917 3C13.6783 3 12.5417 3.45833 11.1667 4.83333C9.79167 3.45833 8.655 3 7.04167 3C5.70453 3 4.42217 3.53117 3.47667 4.47667C2.53117 5.42217 2 6.70453 2 8.04167C2 10.1408 3.38417 11.745 4.75 13.0833L11.1667 19.5L17.5833 13.0833Z" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';
  var ICON_FILLED_HEART =
    '<svg class="icon-filled" viewBox="0 0 22 22" width="22" height="22" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M17.5833 13.0833C18.9492 11.745 20.3333 10.1408 20.3333 8.04167C20.3333 6.70453 19.8022 5.42217 18.8567 4.47667C17.9112 3.53117 16.6288 3 15.2917 3C13.6783 3 12.5417 3.45833 11.1667 4.83333C9.79167 3.45833 8.655 3 7.04167 3C5.70453 3 4.42217 3.53117 3.47667 4.47667C2.53117 5.42217 2 6.70453 2 8.04167C2 10.1408 3.38417 11.745 4.75 13.0833L11.1667 19.5L17.5833 13.0833Z" fill="#e83828" stroke="#e83828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var PRODUCTS = [
    {
      id: 1, badge: "HOT", status: "onsale",
      category: "Coursebook", level: "유치~초등(저)", lexile: "Lexile® 400L~500L",
      title: "Phonics Code 1 : Student Book",
      desc: "파닉스 기초인 Blending과 Decoding에 충실한 학습 설계로 스스로 읽는 힘을 키우는 파닉스 교재",
      hashtags: ["#사이트워드", "#초등", "#파닉스", "#리딩"],
      price: { list: 15000, sale: 13500, discount: 10, reward: 5 },
      wish: 128,
      filterLevel: "초등", filterType: "메인교재", filterBrand: "NE능률",
      materials: [
        { type: "mobile", label: "모바일학습" },
        { type: "mp3round", label: "MP3음원" },
        { type: "all", label: "전체 다운", count: 12 },
        { type: "answer", label: "정답", count: 2 },
        { type: "mp3", label: "MP3", count: 5 },
        { type: "wordlist", label: "Word List", count: 5 }
      ],
      teacherLink: true
    },
    {
      id: 2, badge: "NEW", status: "onsale",
      category: "Coursebook", level: "유치~초등(저)", lexile: "Lexile® 400L",
      title: "Phonics Code 2 : Student Book",
      desc: "파닉스 기초인 Blending과 Decoding에 충실한 학습 설계로 스스로 읽는 힘을 키우는 파닉스 교재",
      hashtags: ["#사이트워드", "#유아", "#파닉스", "#리딩"],
      price: { list: 15000, sale: 13500, discount: 10, reward: 5 },
      wish: 128,
      filterLevel: "유아", filterType: "메인교재", filterBrand: "NE.Build & Grow",
      materials: [
        { type: "mobile", label: "모바일학습" },
        { type: "mp3round", label: "MP3음원" },
        { type: "all", label: "전체 다운", count: 12 },
        { type: "answer", label: "정답", count: 2 },
        { type: "mp3", label: "MP3", count: 5 },
        { type: "wordlist", label: "Word List", count: 3 }
      ],
      teacherLink: true
    },
    {
      id: 3, badge: "", status: "onsale",
      category: "Coursebook", level: "유치~초등(저)", lexile: "Lexile® 400L",
      title: "Phonics Code 1 : Student Book",
      desc: "파닉스 기초인 Blending과 Decoding에 충실한 학습 설계로 스스로 읽는 힘을 키우는 파닉스 교재",
      hashtags: ["#사이트워드", "#중등", "#파닉스", "#리딩"],
      price: { list: 15000, sale: 13500, discount: 10, reward: 5 },
      wish: 128,
      filterLevel: "중등", filterType: "Word Book", filterBrand: "OXFORD",
      materials: [
        { type: "mobile", label: "모바일학습" },
        { type: "mp3round", label: "MP3음원" },
        { type: "all", label: "전체 다운", count: 12 },
        { type: "answer", label: "정답", count: 2 },
        { type: "mp3", label: "MP3", count: 5 },
        { type: "wordlist", label: "Word List", count: 5 }
      ],
      teacherLink: true
    },
    {
      id: 4, badge: "", status: "soldout",
      category: "Coursebook", level: "유치~초등(저)", lexile: "Lexile® 400L",
      title: "Phonics Code 1 : Student Book",
      desc: "파닉스 기초인 Blending과 Decoding에 충실한 학습 설계로 스스로 읽는 힘을 키우는 파닉스 교재",
      hashtags: ["#사이트워드", "#고등", "#파닉스", "#리딩"],
      price: { list: 15000, sale: 13500, discount: 10, reward: 5 },
      wish: 128,
      filterLevel: "고등", filterType: "Tests", filterBrand: "NE능률",
      materials: [
        { type: "mobile", label: "모바일학습" },
        { type: "mp3round", label: "MP3음원" },
        { type: "all", label: "전체 다운", count: 12 },
        { type: "answer", label: "정답", count: 2 },
        { type: "mp3", label: "MP3", count: 5 },
        { type: "wordlist", label: "Word List", count: 5 }
      ],
      teacherLink: true
    }
  ];

  var MATERIAL_ICON = {
    mobile: "assets/icon-material-round.png",
    mp3round: "assets/icon-material-round.png",
    all: "assets/icon-dl-all.svg",
    answer: "assets/icon-dl-answer.svg",
    mp3: "assets/icon-dl-mp3.svg",
    wordlist: "assets/icon-dl-wordlist.svg"
  };

  var wishState = {}; // id -> boolean

  function badgeHtml(p) {
    if (p.status === "soldout") return '<span class="card-badge badge-soldout">일시품절</span>';
    if (p.badge === "HOT") return '<span class="card-badge badge-hot">HOT</span>';
    if (p.badge === "NEW") return '<span class="card-badge badge-new">NEW</span>';
    return "";
  }

  function tagsHtml(p) {
    return (
      '<span class="tag tag-brand-logo"><img src="assets/logo-ne-badge.svg" alt=""></span>' +
      '<span class="tag tag-category">' + p.category + '</span>' +
      '<span class="tag tag-level">' + p.level + '</span>' +
      '<span class="tag tag-lexile">' + p.lexile + '</span>'
    );
  }

  function actionsTopHtml(p) {
    var wished = !!wishState[p.id];
    return (
      '<div class="card-actions-top">' +
        '<div class="share-popover icon-btn" data-share="' + p.id + '">' +
          '<button class="share-toggle" aria-label="공유"><img src="assets/icon-share.svg" alt=""></button>' +
          '<div class="share-menu">' +
            '<button data-share-kakao="' + p.id + '">카카오톡 공유</button>' +
            '<button data-share-url="' + p.id + '">URL 복사</button>' +
          '</div>' +
        '</div>' +
        '<button class="wish-btn' + (wished ? " is-wished" : "") + '" data-wish="' + p.id + '">' +
          ICON_OUTLINE_HEART + ICON_FILLED_HEART +
          '<span class="wish-count">찜 ' + (p.wish + (wished ? 1 : 0)) + '</span>' +
        '</button>' +
      '</div>'
    );
  }

  function priceBlockHtml(p) {
    return (
      '<div class="price-block">' +
        '<div class="price-badges">' +
          '<div class="price-badge discount"><span class="dot">할</span><span class="pct">' + p.price.discount + '%</span></div>' +
          '<div class="price-badge reward"><span class="dot">적</span><span class="pct">' + p.price.reward + '%</span></div>' +
        '</div>' +
        '<div class="price-values">' +
          '<span class="list-price">' + p.price.list.toLocaleString() + '원</span>' +
          '<span class="sale-price">' + p.price.sale.toLocaleString() + '</span><span class="won">원</span>' +
        '</div>' +
      '</div>'
    );
  }

  function buyButtonsHtml(p) {
    if (p.status === "soldout") {
      return (
        '<div class="card-buttons">' +
          '<button class="btn btn-outline" disabled>장바구니</button>' +
          '<button class="btn btn-soldout" data-soldout="' + p.id + '">일시품절</button>' +
        '</div>'
      );
    }
    return (
      '<div class="card-buttons">' +
        '<button class="btn btn-outline" data-cart="' + p.id + '">장바구니</button>' +
        '<button class="btn btn-primary" data-buy="' + p.id + '">바로구매</button>' +
      '</div>'
    );
  }

  function renderBuyCard(p) {
    return (
      '<article class="product-card" data-id="' + p.id + '" data-status="' + p.status + '" ' +
        'data-level="' + p.filterLevel + '" data-type="' + p.filterType + '" data-brand="' + p.filterBrand + '">' +
        '<a class="card-thumb" href="detail.html">' +
          badgeHtml(p) +
          '<img class="cover" src="assets/cover-placeholder.png" alt="' + p.title + '">' +
        '</a>' +
        '<div class="card-body">' +
          '<div class="card-title-block">' +
            '<div class="card-tags">' + tagsHtml(p) + '</div>' +
            '<a class="card-title" href="detail.html">' + p.title + '</a>' +
            '<p class="card-desc">' + p.desc + '</p>' +
          '</div>' +
          '<div class="card-hashtags">' + p.hashtags.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div>' +
        '</div>' +
        '<div class="card-side">' +
          actionsTopHtml(p) +
          priceBlockHtml(p) +
          buyButtonsHtml(p) +
        '</div>' +
      '</article>'
    );
  }

  function materialChipHtml(p, m) {
    var iconSrc = MATERIAL_ICON[m.type];
    var iconCls = (m.type === "mobile" || m.type === "mp3round") ? "round" : "";
    var countHtml = m.count != null ? '<span class="m-count">(' + m.count + ')</span>' : "";
    return (
      '<button class="material-chip" data-material="' + p.id + '" data-mtype="' + m.type + '" data-mlabel="' + m.label + '">' +
        '<img class="' + iconCls + '" src="' + iconSrc + '" alt="">' +
        '<span class="m-label">' + m.label + '</span>' + countHtml +
      '</button>'
    );
  }

  function renderEbookCard(p) {
    var materialsHtml = p.materials.map(function (m) { return materialChipHtml(p, m); }).join("");
    var teacherBtn = p.teacherLink
      ? '<button class="teacher-btn" data-teacher="' + p.id + '"><img src="assets/logo-netutor-badge.svg" alt="NE Tutor"><span>선생님 자료<br>바로가기</span></button>'
      : "";
    return (
      '<article class="product-card" data-id="' + p.id + '" data-status="' + p.status + '" ' +
        'data-level="' + p.filterLevel + '" data-type="' + p.filterType + '" data-brand="' + p.filterBrand + '">' +
        '<a class="card-thumb" href="detail.html">' +
          badgeHtml(p) +
          '<img class="cover" src="assets/cover-placeholder.png" alt="' + p.title + '">' +
        '</a>' +
        '<div class="card-body">' +
          '<div class="card-title-block">' +
            '<div class="card-tags">' + tagsHtml(p) + '</div>' +
            '<a class="card-title" href="detail.html">' + p.title + '</a>' +
            '<p class="card-desc">' + p.desc + '</p>' +
          '</div>' +
          '<div class="card-materials">' + materialsHtml + '</div>' +
        '</div>' +
        '<div class="card-side">' +
          actionsTopHtml(p) +
          teacherBtn +
        '</div>' +
      '</article>'
    );
  }

  function showToast(msg) {
    var toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  function renderLists() {
    document.getElementById("listBuy").innerHTML = PRODUCTS.map(renderBuyCard).join("");
    document.getElementById("listEbook").innerHTML = PRODUCTS.map(renderEbookCard).join("");
  }

  function applyFilters() {
    var checkedByGroup = { level: [], type: [], brand: [] };
    document.querySelectorAll(".filter-group").forEach(function (group) {
      var key = group.getAttribute("data-filter-group");
      group.querySelectorAll('input[type="checkbox"]:checked').forEach(function (cb) {
        checkedByGroup[key].push(cb.value);
      });
    });
    var onsaleOnly = document.getElementById("onsaleOnly").checked;

    var visibleCount = 0;
    document.querySelectorAll(".product-card").forEach(function (card) {
      var level = card.getAttribute("data-level");
      var type = card.getAttribute("data-type");
      var brand = card.getAttribute("data-brand");
      var status = card.getAttribute("data-status");

      var levelOk = checkedByGroup.level.length === 0 || checkedByGroup.level.indexOf(level) !== -1;
      var typeOk = checkedByGroup.type.length === 0 || checkedByGroup.type.indexOf(type) !== -1;
      var brandOk = checkedByGroup.brand.length === 0 || checkedByGroup.brand.indexOf(brand) !== -1;
      var saleOk = !onsaleOnly || status === "onsale";

      var visible = levelOk && typeOk && brandOk && saleOk;
      card.style.display = visible ? "" : "none";
      if (visible) visibleCount++;
    });

    var activeTab = document.querySelector(".product-list.is-active");
    var activeCardCount = activeTab ? activeTab.querySelectorAll('.product-card:not([style*="display: none"])').length : visibleCount;
    document.getElementById("emptyState").classList.toggle("is-visible", activeCardCount === 0);
  }

  function switchTab(tab) {
    document.querySelectorAll(".product-list").forEach(function (list) {
      list.classList.toggle("is-active", list.getAttribute("data-tab") === tab);
    });
    document.querySelectorAll(".type-tab").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-tab-btn") === tab);
    });
    applyFilters();
  }

  function closeAllPopovers() {
    document.querySelectorAll(".share-popover.is-open").forEach(function (p) { p.classList.remove("is-open"); });
    document.getElementById("sortSelect").classList.remove("is-open");
  }

  function wireEvents() {
    document.querySelectorAll("[data-tab-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () { switchTab(btn.getAttribute("data-tab-btn")); });
    });

    document.getElementById("onsaleOnly").addEventListener("change", applyFilters);
    document.querySelectorAll(".filter-option input[type=checkbox]").forEach(function (cb) {
      cb.addEventListener("change", applyFilters);
    });

    var sortSelect = document.getElementById("sortSelect");
    document.getElementById("sortBtn").addEventListener("click", function (e) {
      e.stopPropagation();
      sortSelect.classList.toggle("is-open");
    });
    sortSelect.querySelectorAll(".sort-menu button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.getElementById("sortLabel").textContent = btn.getAttribute("data-sort");
        sortSelect.querySelectorAll(".sort-menu button").forEach(function (b) { b.classList.remove("is-selected"); });
        btn.classList.add("is-selected");
        sortSelect.classList.remove("is-open");
        showToast(btn.getAttribute("data-sort") + " 기준으로 정렬되었습니다.");
      });
    });

    document.body.addEventListener("click", function (e) {
      var shareToggle = e.target.closest(".share-toggle");
      if (shareToggle) {
        e.stopPropagation();
        var pop = shareToggle.closest(".share-popover");
        var wasOpen = pop.classList.contains("is-open");
        closeAllPopovers();
        if (!wasOpen) pop.classList.add("is-open");
        return;
      }

      var kakaoBtn = e.target.closest("[data-share-kakao]");
      if (kakaoBtn) { showToast("카카오톡 공유 창을 엽니다."); closeAllPopovers(); return; }

      var urlBtn = e.target.closest("[data-share-url]");
      if (urlBtn) {
        showToast("URL이 복사되었습니다.");
        closeAllPopovers();
        return;
      }

      var wishBtn = e.target.closest(".wish-btn");
      if (wishBtn) {
        var id = wishBtn.getAttribute("data-wish");
        wishState[id] = !wishState[id];
        renderLists();
        applyFilters();
        return;
      }

      var cartBtn = e.target.closest("[data-cart]");
      if (cartBtn) {
        var badge = document.getElementById("cartBadge");
        badge.textContent = String(Number(badge.textContent) + 1);
        if (confirm("상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")) {
          window.location.href = "cart.html";
        }
        return;
      }

      var buyBtn = e.target.closest("[data-buy]");
      if (buyBtn) { window.location.href = "checkout.html"; return; }

      var soldoutBtn = e.target.closest("[data-soldout]");
      if (soldoutBtn) { showToast("일시품절 상품입니다. 재입고 알림 신청 기능은 추후 제공됩니다."); return; }

      var teacherBtn = e.target.closest("[data-teacher]");
      if (teacherBtn) { showToast("NE Tutor 교재상세로 이동합니다 (SSO 연동, 비로그인 시에도 이동)."); return; }

      var materialBtn = e.target.closest("[data-material]");
      if (materialBtn) {
        var label = materialBtn.getAttribute("data-mlabel");
        showToast(label + " 다운로드를 시작합니다.");
        return;
      }

      var pageBtn = e.target.closest(".page-btn[data-page]");
      if (pageBtn) {
        document.querySelectorAll(".page-btn[data-page]").forEach(function (b) { b.classList.remove("is-active"); });
        pageBtn.classList.add("is-active");
        if (pageBtn.getAttribute("data-page") !== "1") {
          showToast("이 데모에는 1페이지 상품 데이터만 포함되어 있습니다.");
        }
        return;
      }

      var navBtn = e.target.closest("#pagePrev, #pageNext");
      if (navBtn) {
        var pageBtns = Array.prototype.slice.call(document.querySelectorAll(".page-btn[data-page]"));
        var activeIdx = pageBtns.findIndex(function (b) { return b.classList.contains("is-active"); });
        var nextIdx = navBtn.id === "pagePrev" ? Math.max(0, activeIdx - 1) : Math.min(pageBtns.length - 1, activeIdx + 1);
        pageBtns[nextIdx].click();
        return;
      }

      if (!e.target.closest(".share-popover")) closeAllPopovers();
      if (!e.target.closest(".sort-select")) sortSelect.classList.remove("is-open");
    });

  }

  renderLists();
  wireEvents();
  applyFilters();
})();
