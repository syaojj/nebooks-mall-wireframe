/* ==========================================================================
   NE Books · 교재상세 (design_v0.6) — interactions
   Grounded in UC-INFO-05/06/07/08/09/10/11/12/13/14/15/16, UC-BUY-01~03/13,
   UC-MAT-01~04/10/11, UC-CS-13
   ========================================================================== */
(function () {
  "use strict";
  var showToast = window.NEBooks.showToast;

  var ICON_OUTLINE_HEART =
    '<svg class="icon-outline" viewBox="0 0 22 22" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M17.5833 13.0833C18.9492 11.745 20.3333 10.1408 20.3333 8.04167C20.3333 6.70453 19.8022 5.42217 18.8567 4.47667C17.9112 3.53117 16.6288 3 15.2917 3C13.6783 3 12.5417 3.45833 11.1667 4.83333C9.79167 3.45833 8.655 3 7.04167 3C5.70453 3 4.42217 3.53117 3.47667 4.47667C2.53117 5.42217 2 6.70453 2 8.04167C2 10.1408 3.38417 11.745 4.75 13.0833L11.1667 19.5L17.5833 13.0833Z" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';
  var ICON_FILLED_HEART =
    '<svg class="icon-filled" viewBox="0 0 22 22" width="22" height="22" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M17.5833 13.0833C18.9492 11.745 20.3333 10.1408 20.3333 8.04167C20.3333 6.70453 19.8022 5.42217 18.8567 4.47667C17.9112 3.53117 16.6288 3 15.2917 3C13.6783 3 12.5417 3.45833 11.1667 4.83333C9.79167 3.45833 8.655 3 7.04167 3C5.70453 3 4.42217 3.53117 3.47667 4.47667C2.53117 5.42217 2 6.70453 2 8.04167C2 10.1408 3.38417 11.745 4.75 13.0833L11.1667 19.5L17.5833 13.0833Z" fill="#e83828" stroke="#e83828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var SERIES_DATA = {
    seriesScroller: [
      { name: "Bricks Reading 150 · L1", price: 13500, list: 15000 },
      { name: "Bricks Reading 150 · L2", price: 13500, list: 15000 },
      { name: "Bricks Reading 150 · L3", price: 13500, list: 15000 },
      { name: "Bricks Reading 150 · L4", price: 13500, list: 15000 },
      { name: "Bricks Reading 150 · L5", price: 13500, list: 15000 },
      { name: "Bricks Reading 150 · L6", price: 13500, list: 15000 }
    ],
    nextScroller: [
      { name: "Bricks Reading 200 · L1", price: 14500, list: 16000 },
      { name: "Bricks Reading 200 · L2", price: 14500, list: 16000 },
      { name: "Bricks Reading 200 · L3", price: 14500, list: 16000 },
      { name: "Bricks Reading 200 · L4", price: 14500, list: 16000 }
    ],
    relatedScroller: [
      { name: "Phonics Code 1 : Student Book", price: 13500, list: 15000 },
      { name: "사이트 워드가 된다 1", price: 12500, list: 14000 },
      { name: "Grammar Inside 1", price: 13000, list: 14500 },
      { name: "Grammar Ten 1", price: 13000, list: 14500 }
    ]
  };

  var REVIEWS = [
    { stars: 5, title: "아이가 독해를 어려워했는데 도움이 많이 됐어요", body: "지문 난이도가 적절하고 단어 정리가 잘 되어 있어 자기주도 학습에 좋습니다.", author: "김**", date: "2026.06.21" },
    { stars: 5, title: "아이가 독해를 어려워했는데 도움이 많이 됐어요", body: "지문 난이도가 적절하고 단어 정리가 잘 되어 있어 자기주도 학습에 좋습니다.", author: "이**", date: "2026.06.20" },
    { stars: 4, title: "무난하게 잘 쓰고 있습니다", body: "레벨 대비 난이도가 적당하고 구성이 깔끔합니다.", author: "박**", date: "2026.06.18" }
  ];

  var wished = false;
  var qty = 1;
  var UNIT_PRICE = 13500;

  function renderShareWish() {
    var el = document.getElementById("detailShareWish");
    el.innerHTML =
      '<div class="share-popover icon-btn" id="detailShare">' +
        '<button class="share-toggle" aria-label="공유"><img src="assets/icon-share.svg" alt=""></button>' +
        '<div class="share-menu">' +
          '<button id="shareKakao">카카오톡 공유</button>' +
          '<button id="shareUrl">URL 복사</button>' +
        '</div>' +
      '</div>' +
      '<button class="wish-btn' + (wished ? " is-wished" : "") + '" id="detailWish">' +
        ICON_OUTLINE_HEART + ICON_FILLED_HEART +
        '<span class="wish-count">찜 ' + (128 + (wished ? 1 : 0)) + '</span>' +
      '</button>';
  }

  function renderScroller(id, items) {
    var el = document.getElementById(id);
    el.innerHTML = items.map(function (it) {
      return (
        '<div class="series-card">' +
          '<div class="thumb">' +
            '<input type="checkbox" class="select-cb" checked>' +
            '<img src="assets/cover-placeholder.png" alt="' + it.name + '">' +
            '<button class="add-cart-mini" data-mini-cart="' + it.name + '"><img src="assets/icon-cart.svg" alt="" style="width:16px;height:16px;"></button>' +
          '</div>' +
          '<div class="info">' +
            '<p class="brand">Phonics</p>' +
            '<p class="name">' + it.name + '</p>' +
            '<p class="price"><span class="list">' + it.list.toLocaleString() + '원</span>' + it.price.toLocaleString() + '원</p>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  function renderReviews() {
    var el = document.getElementById("reviewList");
    el.innerHTML = REVIEWS.map(function (r) {
      return (
        '<div class="review-item">' +
          '<div>' +
            '<p class="stars">' + "★★★★★".slice(0, r.stars) + '<span style="color:var(--gray-e5)">' + "★★★★★".slice(r.stars) + '</span></p>' +
            '<p class="r-title">' + r.title + '</p>' +
            '<p class="r-body">' + r.body + '</p>' +
          '</div>' +
          '<div class="r-meta">' + r.author + '<br>' + r.date + '</div>' +
        '</div>'
      );
    }).join("");
  }

  function updatePrice() {
    var total = UNIT_PRICE * qty;
    document.getElementById("qtyInput").value = qty;
    document.getElementById("qtyInputSide").value = qty;
    document.getElementById("totalPrice").textContent = total.toLocaleString() + "원";
  }

  function wireQty(minusId, plusId, inputId) {
    document.getElementById(minusId).addEventListener("click", function () {
      qty = Math.max(1, qty - 1);
      updatePrice();
    });
    document.getElementById(plusId).addEventListener("click", function () {
      qty = Math.min(999, qty + 1);
      updatePrice();
    });
    document.getElementById(inputId).addEventListener("change", function (e) {
      var v = parseInt(e.target.value, 10);
      qty = isNaN(v) || v < 1 ? 1 : Math.min(999, v);
      updatePrice();
    });
  }

  function wireTabs() {
    var tabs = document.querySelectorAll("#detailTabs button");
    var sections = Array.prototype.map.call(tabs, function (t) {
      return document.getElementById("tab-" + t.getAttribute("data-tab"));
    });

    tabs.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        sections[i].scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    var tabsBar = document.getElementById("detailTabs");
    var tabsBarOffset = tabsBar.offsetTop;

    window.addEventListener("scroll", function () {
      var scrollPos = window.scrollY + 90;
      var activeIdx = 0;
      sections.forEach(function (sec, i) {
        if (sec.offsetTop <= scrollPos) activeIdx = i;
      });
      tabs.forEach(function (t, i) { t.classList.toggle("is-active", i === activeIdx); });
    });
  }

  function wireEvents() {
    document.body.addEventListener("click", function (e) {
      if (e.target.closest("#addCartBtn") || e.target.closest("#addCartBtnSide")) {
        var badge = document.getElementById("cartBadge");
        badge.textContent = String(Number(badge.textContent) + qty);
        if (confirm("상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")) {
          window.location.href = "cart.html";
        }
        return;
      }
      if (e.target.closest("#buyNowBtn") || e.target.closest("#buyNowBtnSide")) {
        window.location.href = "checkout.html";
        return;
      }
      if (e.target.closest("#previewBtn")) { showToast("미리보기 뷰어를 엽니다 (UC-INFO-16)."); return; }
      if (e.target.closest("#tutorGoBtn")) { showToast("NE Tutor 교재상세로 이동합니다 (SSO 연동)."); return; }
      if (e.target.closest("[data-dl]")) { showToast(e.target.closest("[data-dl]").getAttribute("data-dl") + " 다운로드를 시작합니다."); return; }
      if (e.target.closest("#selectDlBtn")) { showToast("선택한 자료의 멀티 다운로드 팝업을 엽니다."); return; }
      if (e.target.closest("#allDlBtn")) { showToast("전체 학습자료 멀티 다운로드 팝업을 엽니다."); return; }
      if (e.target.closest("#expandSpecBtn")) { showToast("상품상세 이미지를 펼칩니다."); return; }
      if (e.target.closest("[data-mini-cart]")) { showToast(e.target.closest("[data-mini-cart]").getAttribute("data-mini-cart") + "을(를) 장바구니에 담았습니다."); return; }

      var shareToggle = e.target.closest(".share-toggle");
      if (shareToggle) {
        e.stopPropagation();
        shareToggle.closest(".share-popover").classList.toggle("is-open");
        return;
      }
      if (e.target.closest("#shareKakao")) { showToast("카카오톡 공유 창을 엽니다."); return; }
      if (e.target.closest("#shareUrl")) { showToast("URL이 복사되었습니다."); return; }
      if (e.target.closest("#detailWish")) {
        wished = !wished;
        renderShareWish();
        return;
      }
      if (e.target.closest("#writeReviewBtn")) {
        document.getElementById("reviewForm").classList.toggle("is-open");
        return;
      }
      if (e.target.closest("#cancelReviewBtn")) {
        document.getElementById("reviewForm").classList.remove("is-open");
        return;
      }
      if (e.target.closest("#submitReviewBtn")) {
        showToast("후기가 등록되었습니다. 500P가 적립됩니다.");
        document.getElementById("reviewForm").classList.remove("is-open");
        return;
      }
      if (!e.target.closest(".share-popover")) {
        document.querySelectorAll(".share-popover.is-open").forEach(function (p) { p.classList.remove("is-open"); });
      }
    });

    var starEls = document.querySelectorAll("#starPicker span");
    document.getElementById("starPicker").addEventListener("click", function (e) {
      // simple 5-star click zones based on character index approximation
      var rect = e.currentTarget.getBoundingClientRect();
      var ratio = (e.clientX - rect.left) / rect.width;
      var n = Math.max(1, Math.ceil(ratio * 5));
      var full = "★★★★★".slice(0, n);
      var empty = "★★★★★".slice(n);
      e.currentTarget.innerHTML = full + '<span style="color:var(--gray-e5)">' + empty + '</span>';
    });
  }

  renderShareWish();
  Object.keys(SERIES_DATA).forEach(function (id) { renderScroller(id, SERIES_DATA[id]); });
  renderReviews();
  wireQty("qtyMinus", "qtyPlus", "qtyInput");
  wireQty("qtyMinusSide", "qtyPlusSide", "qtyInputSide");
  wireTabs();
  wireEvents();
})();
