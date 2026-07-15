/* ==========================================================================
   NE Books · 마이페이지 (design_v0.6) — interactions
   Grounded in UC-CS-14/15, UC-ORD-15/16, UC-BUY-14/15, UC-PNT-01/04/05, UC-CS-13
   ========================================================================== */
(function () {
  "use strict";
  var showToast = window.NEBooks.showToast;

  var ORDERS = [
    { no: "NB20260710000042", items: ["Phonics Code 1 : Student Book"], amount: 13500, status: "결제완료" },
    { no: "NB20260705000031", items: ["Bricks Reading 150 · L1", "Grammar Inside 1"], amount: 27900, status: "배송중" },
    { no: "NB20260628000019", items: ["Grammar Ten 1"], amount: 13000, status: "배송완료" },
    { no: "NB20260615000008", items: ["사이트 워드가 된다 1"], amount: 12500, status: "구매확정" }
  ];
  var STATUS_ACTIONS = {
    "결제완료": ['<button data-cancel-pay>결제취소</button>'],
    "배송중": ['<button data-track>배송조회</button>'],
    "배송완료": ['<button data-track>배송조회</button>', '<button data-confirm-buy>구매확정</button>', '<button class="danger" data-return>반품/환불</button>'],
    "구매확정": []
  };
  var STATUS_CLASS = { "결제완료": "done", "배송중": "wait", "배송완료": "done", "구매확정": "done" };

  var WISH_ITEMS = [
    { name: "Phonics Code 1 : Student Book", list: 15000, sale: 13500 },
    { name: "Grammar Inside 1", list: 14500, sale: 13000 },
    { name: "천일문 Grammar", list: 16000, sale: 14400 }
  ];

  var POINT_HISTORY = [
    { date: "2026.07.10", type: "적립", desc: "교재 구매 적립", pt: "+675P", balance: "3,200P" },
    { date: "2026.06.21", type: "적립", desc: "후기 작성 적립", pt: "+500P", balance: "2,525P" },
    { date: "2026.06.05", type: "사용", desc: "주문 결제 시 사용", pt: "-1,000P", balance: "2,025P" },
    { date: "2026.05.01", type: "소멸", desc: "유효기간 만료", pt: "-120P", balance: "3,025P" }
  ];

  var INQUIRIES = [
    { no: 3, cat: "주문·배송", title: "배송 지연 문의드립니다", date: "2026.07.09", answered: true },
    { no: 2, cat: "교재 오류신고", title: "L1 정답지 오탈자 제보", date: "2026.06.30", answered: true },
    { no: 1, cat: "일반문의", title: "부가서비스 이용 문의", date: "2026.06.20", answered: false }
  ];

  var REVIEWS = [
    { stars: 5, title: "아이가 독해를 어려워했는데 도움이 많이 됐어요", book: "Bricks Reading 150 · L1", date: "2026.06.21" },
    { stars: 4, title: "무난하게 잘 쓰고 있습니다", book: "Grammar Inside 1", date: "2026.06.10" }
  ];

  var EVENTS = [
    { label: "세미나", title: "2026 여름 교사 세미나", period: "2026.07.20 ~ 07.21" }
  ];

  function renderMini(id, items) {
    var el = document.getElementById(id);
    if (items.length === 0) { el.innerHTML = '<p class="empty-inline">최근 본 항목이 없습니다</p>'; return; }
    el.innerHTML = items.map(function (it) {
      return (
        '<a class="mi-card" href="detail.html">' +
          '<div class="thumb"><img src="assets/cover-placeholder.png" alt=""></div>' +
          '<p>' + it + '</p>' +
        '</a>'
      );
    }).join("");
  }

  function renderOrders() {
    document.getElementById("orderTableBody").innerHTML = ORDERS.map(function (o, idx) {
      var itemLabel = o.items.length > 1 ? o.items[0] + " 외 " + (o.items.length - 1) + "건" : o.items[0];
      var actions = (STATUS_ACTIONS[o.status] || []).join("");
      return (
        '<tr>' +
          '<td>' + o.no + '</td>' +
          '<td><a href="#" data-order-detail="' + idx + '" style="color:var(--black);">' + itemLabel + '</a></td>' +
          '<td>' + o.amount.toLocaleString() + '원 <button style="font-size:11px;color:var(--gray-a9);" data-receipt>영수증</button></td>' +
          '<td><span class="status-pill ' + (STATUS_CLASS[o.status] || "") + '">' + o.status + '</span></td>' +
          '<td><div class="row-actions">' + actions + '</div></td>' +
        '</tr>'
      );
    }).join("");
  }

  function openOrderDetail(idx) {
    var o = ORDERS[idx];
    var panel = document.getElementById("orderDetailPanel");
    panel.innerHTML =
      '<a class="back-link" href="#" id="orderDetailBack">&lt; 목록으로</a>' +
      '<p class="co-section-title">주문상세 · ' + o.no + '</p>' +
      '<div class="info-grid">' +
        '<span class="label">주문상품</span><span>' + o.items.join(", ") + '</span>' +
        '<span class="label">결제금액</span><span>' + o.amount.toLocaleString() + '원</span>' +
        '<span class="label">주문상태</span><span><span class="status-pill ' + (STATUS_CLASS[o.status] || "") + '">' + o.status + '</span></span>' +
        '<span class="label">배송지</span><span>홍길동 / 010-1234-5678 / 서울특별시 마포구 월드컵북로 396</span>' +
      '</div>';
    panel.classList.add("is-open");
    document.getElementById("orderTable").style.display = "none";
    document.getElementById("orderDetailBack").addEventListener("click", function (e) {
      e.preventDefault();
      panel.classList.remove("is-open");
      document.getElementById("orderTable").style.display = "";
    });
  }

  function renderWish() {
    var grid = document.getElementById("wishGrid");
    if (WISH_ITEMS.length === 0) { grid.innerHTML = '<p class="empty-inline">찜한 교재가 없습니다</p>'; return; }
    grid.innerHTML = WISH_ITEMS.map(function (w, idx) {
      return (
        '<div class="wish-card">' +
          '<button class="remove-x" data-wish-remove="' + idx + '">✕</button>' +
          '<a class="thumb" href="detail.html"><img src="assets/cover-placeholder.png" alt=""></a>' +
          '<p class="name">' + w.name + '</p>' +
          '<p class="price">' + w.sale.toLocaleString() + '원</p>' +
          '<button class="btn btn-outline" data-wish-cart="' + idx + '">장바구니</button>' +
        '</div>'
      );
    }).join("");
  }

  function renderPoints() {
    document.getElementById("pointTableBody").innerHTML = POINT_HISTORY.map(function (p) {
      return '<tr><td>' + p.date + '</td><td>' + p.type + '</td><td>' + p.desc + '</td><td>' + p.pt + '</td><td>' + p.balance + '</td></tr>';
    }).join("");
  }

  function renderInquiries() {
    document.getElementById("inquiryTableBody").innerHTML = INQUIRIES.map(function (q) {
      return '<tr><td>' + q.no + '</td><td>' + q.cat + '</td><td>' + q.title + '</td><td>' + q.date + '</td><td><span class="status-pill ' + (q.answered ? "done" : "wait") + '">' + (q.answered ? "답변완료" : "답변대기") + '</span></td></tr>';
    }).join("");
  }

  function renderReviews() {
    document.getElementById("myReviewList").innerHTML = REVIEWS.map(function (r) {
      return (
        '<div class="review-item">' +
          '<div>' +
            '<p class="stars">' + "★★★★★".slice(0, r.stars) + '<span style="color:var(--gray-e5)">' + "★★★★★".slice(r.stars) + '</span></p>' +
            '<p class="r-title">' + r.title + '</p>' +
            '<p class="r-body">' + r.book + '</p>' +
          '</div>' +
          '<div class="r-meta">' + r.date + '</div>' +
        '</div>'
      );
    }).join("");
  }

  function renderEvents() {
    var grid = document.getElementById("myEventGrid");
    if (EVENTS.length === 0) { grid.innerHTML = '<p class="empty-inline">신청한 이벤트/세미나가 없습니다</p>'; return; }
    grid.innerHTML = EVENTS.map(function (e) {
      return (
        '<div class="event-card">' +
          '<div class="ec-thumb"></div>' +
          '<div class="ec-body">' +
            '<p class="ec-label">' + e.label + '</p>' +
            '<p class="ec-title">' + e.title + '</p>' +
            '<p class="ec-period">' + e.period + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  function switchTab(tab) {
    document.querySelectorAll("[data-mp-tab]").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-mp-tab") === tab); });
    document.querySelectorAll(".mypage-panel").forEach(function (p) { p.classList.toggle("is-active", p.id === "mp-" + tab); });
  }

  document.getElementById("mypageNav").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-mp-tab]");
    if (btn) switchTab(btn.getAttribute("data-mp-tab"));
  });

  document.body.addEventListener("click", function (e) {
    var goto = e.target.closest("[data-mp-goto]");
    if (goto) { switchTab(goto.getAttribute("data-mp-goto")); return; }

    var orderDetail = e.target.closest("[data-order-detail]");
    if (orderDetail) { e.preventDefault(); openOrderDetail(Number(orderDetail.getAttribute("data-order-detail"))); return; }

    if (e.target.closest("[data-receipt]")) { showToast("결제 영수증(PG 확인 페이지)을 엽니다."); return; }
    if (e.target.closest("[data-cancel-pay]")) { showToast("결제취소 사유 선택 레이어를 엽니다."); return; }
    if (e.target.closest("[data-track]")) { showToast("스윗트래커 배송조회 팝업을 엽니다."); return; }
    if (e.target.closest("[data-confirm-buy]")) { showToast("구매가 확정되었습니다. 포인트가 적립됩니다."); return; }
    if (e.target.closest("[data-return]")) { showToast("반품/환불 신청 — 1:1문의로 이동합니다."); return; }

    var wishRemove = e.target.closest("[data-wish-remove]");
    if (wishRemove) {
      WISH_ITEMS.splice(Number(wishRemove.getAttribute("data-wish-remove")), 1);
      renderWish();
      return;
    }
    var wishCart = e.target.closest("[data-wish-cart]");
    if (wishCart) { showToast("장바구니에 담았습니다."); return; }
    if (e.target.id === "wishClearBtn") {
      if (WISH_ITEMS.length === 0) return;
      if (confirm("찜 내역을 전체 삭제하겠습니까?")) { WISH_ITEMS.length = 0; renderWish(); }
      return;
    }

    if (e.target.id === "profileGoBtn") { showToast("NE 통합회원 정보수정 화면으로 이동합니다 (외부 SSO)."); return; }
    if (e.target.id === "logoutBtn") {
      if (confirm("로그아웃 하시겠습니까?")) window.location.href = "index.html";
      return;
    }
  });

  renderMini("recentMaterials", ["Bricks Reading 150 · L1 워크시트", "Phonics Code 1 정답지"]);
  renderMini("recentWish", WISH_ITEMS.map(function (w) { return w.name; }));
  renderMini("recentViewed", ["Grammar Ten 1", "천일문 Grammar"]);
  renderOrders();
  renderWish();
  renderPoints();
  renderInquiries();
  renderReviews();
  renderEvents();

  var params = new URLSearchParams(window.location.search);
  var tabParam = params.get("tab");
  if (tabParam && document.getElementById("mp-" + tabParam)) {
    switchTab(tabParam);
    if (tabParam === "orders" && params.get("view") === "detail") openOrderDetail(0);
  }
})();
