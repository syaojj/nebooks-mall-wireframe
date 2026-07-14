/* ==========================================================================
   NE Books · 메인(홈) (design_v0.6) — interactions
   Grounded in UC-PROMO-01~10, UC-PROMO-12
   ========================================================================== */
(function () {
  "use strict";
  var showToast = window.NEBooks.showToast;

  var BESTSELLERS = [
    { badge: "HOT", tag: "중1·문법", name: "Grammar Inside 1", list: 14500, price: 13000, pct: 10 },
    { badge: "NEW", tag: "초5·리딩", name: "Bricks Reading 150 · L1", list: 15000, price: 13500, pct: 10 },
    { badge: "", tag: "고1·독해", name: "천일문 Grammar", list: 16000, price: 14400, pct: 10 },
    { badge: "HOT", tag: "초3·파닉스", name: "Phonics Code 1", list: 15000, price: 13500, pct: 10 }
  ];
  var COURSE_BOOKS = [
    { badge: "HOT", tag: "초3·파닉스", name: "Phonics Code 1", list: 15000, price: 13500, pct: 10 },
    { badge: "", tag: "초3·파닉스", name: "Phonics Code 2", list: 15000, price: 13500, pct: 10 },
    { badge: "", tag: "초4·파닉스", name: "Phonics Code 3", list: 15000, price: 13500, pct: 10 },
    { badge: "NEW", tag: "초4·파닉스", name: "Phonics Code 4", list: 15000, price: 13500, pct: 10 }
  ];
  var CURATIONS = [
    { label: "이벤트", title: "여름방학 특가 이벤트", desc: "ELT 전 교재 최대 20%", a: "#e83828", b: "#ff8a65" },
    { label: "신간·개정", title: "Bricks Reading 개정판 출시", desc: "더 쉬워진 어휘 구성", a: "#2f74d1", b: "#1d2b5c" },
    { label: "세미나", title: "2026 여름 교사 세미나", desc: "온라인 사전 신청 중", a: "#4d4e4d", b: "#1d1717" },
    { label: "큐레이션", title: "선생님이 뽑은 이달의 교재", desc: "현직 교사 추천 리스트", a: "#1d2b5c", b: "#2f74d1" }
  ];
  var NOTICES = [
    { badge: "필독", title: "여름방학 배송 지연 안내 (7/20~8/5)", date: "2026.07.10" },
    { badge: "안내", title: "NE Point 통합 정책 변경 안내", date: "2026.07.08" },
    { badge: "중요", title: "Bricks Reading 표지 변경 및 ISBN 안내", date: "2026.07.02" }
  ];

  function bookCardHtml(b) {
    var badgeHtml = b.badge
      ? '<span class="badge-hot-mini" style="background:' + (b.badge === "HOT" ? "var(--red)" : "var(--blue-lexile)") + ';color:#fff;">' + b.badge + '</span>'
      : "";
    return (
      '<div class="promo-book-card">' +
        '<a class="thumb" href="detail.html"><img src="assets/cover-placeholder.png" alt="' + b.name + '"></a>' +
        '<div class="info">' +
          '<div class="tag-row">' + badgeHtml + '<span style="background:var(--gray-f3);color:var(--gray-666);">' + b.tag + '</span></div>' +
          '<a class="name" href="detail.html" style="color:var(--black);">' + b.name + '</a>' +
          '<p class="price"><span class="list">' + b.list.toLocaleString() + '원</span><span class="pct">' + b.pct + '%</span>' + b.price.toLocaleString() + '원</p>' +
          '<div class="actions">' +
            '<button class="btn btn-outline" data-toast="상세보기로 이동합니다.">상세보기</button>' +
            '<button class="btn btn-primary" data-toast="' + b.name + '을(를) 장바구니에 담았습니다.">장바구니</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  document.getElementById("bestsellerGrid").innerHTML = BESTSELLERS.map(bookCardHtml).join("");
  document.getElementById("courseGrid").innerHTML = COURSE_BOOKS.map(bookCardHtml).join("");

  document.getElementById("curationGrid").innerHTML = CURATIONS.map(function (c) {
    return (
      '<a class="curation-card" href="#" data-toast="' + c.title + ' 상세로 이동합니다." style="--curation-a:' + c.a + ';--curation-b:' + c.b + ';">' +
        '<div class="cc-bg"></div>' +
        '<div class="cc-content">' +
          '<span class="cc-label">' + c.label + '</span>' +
          '<p class="cc-title">' + c.title + '</p>' +
          '<p class="cc-desc">' + c.desc + '</p>' +
        '</div>' +
      '</a>'
    );
  }).join("");

  document.getElementById("noticeStrip").innerHTML = NOTICES.map(function (n) {
    return (
      '<li>' +
        '<span class="n-badge">' + n.badge + '</span>' +
        '<a class="n-title" href="cs.html" style="color:var(--black);">' + n.title + '</a>' +
        '<span class="n-date">' + n.date + '</span>' +
      '</li>'
    );
  }).join("");

  /* Hero carousel */
  var track = document.getElementById("heroTrack");
  var keywordBtns = document.querySelectorAll("#heroKeywords button");
  var slideCount = track.children.length;
  var current = 0;
  var timer;

  function goToSlide(i) {
    current = i;
    track.style.transform = "translateX(-" + (100 * i) + "%)";
    keywordBtns.forEach(function (b, idx) { b.classList.toggle("is-active", idx === i); });
  }
  function nextSlide() { goToSlide((current + 1) % slideCount); }
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 5000);
  }
  keywordBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      goToSlide(Number(btn.getAttribute("data-slide")));
      resetTimer();
    });
  });
  resetTimer();

  /* Promo tabs */
  document.querySelectorAll("#promoTabs button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("#promoTabs button").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      document.querySelectorAll(".promo-panel").forEach(function (p) { p.classList.remove("is-active"); });
      document.getElementById("panel-" + btn.getAttribute("data-panel")).classList.add("is-active");
    });
  });

  /* Bundle add */
  document.getElementById("courseBundleBtn").addEventListener("click", function () {
    var n = document.querySelectorAll("#courseGrid .promo-book-card").length;
    if (confirm("선택한 " + n + "권을 장바구니에 담겠습니까? 담긴 후 장바구니로 이동하시겠습니까?")) {
      window.location.href = "cart.html";
    }
  });
  document.getElementById("bundleAddBtn").addEventListener("click", function () {
    document.getElementById("courseBundleBtn").click();
  });

  /* Reco popup */
  var recoModal = document.getElementById("recoModal");
  document.getElementById("recoFab").addEventListener("click", function () { recoModal.classList.add("is-open"); });
  document.getElementById("recoCloseBtn").addEventListener("click", function () { recoModal.classList.remove("is-open"); });
  document.getElementById("recoStartBtn").addEventListener("click", function () {
    recoModal.classList.remove("is-open");
    showToast("맞춤형 교재추천 설문을 시작합니다.");
  });
  recoModal.addEventListener("click", function (e) { if (e.target === recoModal) recoModal.classList.remove("is-open"); });

  /* generic data-toast links */
  document.body.addEventListener("click", function (e) {
    var el = e.target.closest("[data-toast]");
    if (el) {
      e.preventDefault();
      showToast(el.getAttribute("data-toast"));
    }
  });
})();
