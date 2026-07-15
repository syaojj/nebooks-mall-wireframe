/* ==========================================================================
   NE Books · 고객센터 (design_v0.6) — interactions
   Grounded in UC-CS-01,03,04,05,07~11,17
   ========================================================================== */
(function () {
  "use strict";
  var showToast = window.NEBooks.showToast;

  var NOTICES = [
    { pinned: true, badge: "필독", cat: "공통", title: "여름방학 배송 지연 안내 (7/20~8/5)", date: "2026.07.10", views: 512 },
    { pinned: false, badge: "안내", cat: "ELT", title: "NE Point 통합 정책 변경 안내", date: "2026.07.08", views: 210 },
    { pinned: false, badge: "중요", cat: "공통", title: "Bricks Reading 표지 변경 및 ISBN 안내", date: "2026.07.02", views: 388 },
    { pinned: false, badge: "안내", cat: "수험·일반", title: "여름방학 특강 교재 출간 일정 안내", date: "2026.06.28", views: 145 }
  ];

  var FAQS = [
    { cat: "주문결제", q: "무통장입금(가상계좌) 입금기한은 얼마나 되나요?", a: "입금기한은 주문일로부터 7일이며, 기한 내 미입금 시 자동으로 주문이 취소됩니다." },
    { cat: "취소환불", q: "결제완료 상태에서 취소하면 언제 환불되나요?", a: "신용카드/계좌이체/간편결제는 PG사를 통해 자동 취소되며 카드사 정책에 따라 3~5영업일 소요됩니다." },
    { cat: "배송", q: "배송비는 어떻게 계산되나요?", a: "무료배송 상품이 아닌 경우, 3만원 미만 주문 시 2,500원이 부과되며 3만원 이상 무료입니다. 도서산간 지역은 2,500원이 추가됩니다." },
    { cat: "NE Point", q: "포인트는 최소 얼마부터 사용할 수 있나요?", a: "보유 포인트 내에서 100P 단위로 사용하실 수 있습니다." },
    { cat: "교재", q: "학습자료 다운로드 권한은 어떻게 구분되나요?", a: "전체(비회원 포함) / 회원(로그인) / 교강사(교강사 인증) 3단계로 구분되어 있습니다." },
    { cat: "회원정보", q: "회원정보는 어디서 수정하나요?", a: "마이페이지 > 회원정보수정에서 NE 통합회원 시스템으로 이동해 수정하실 수 있습니다." }
  ];

  var CS_EVENTS = {
    "이벤트": [{ title: "여름방학 특가 이벤트", period: "2026.07.15 ~ 08.15" }, { title: "구매 인증 SNS 이벤트", period: "2026.07.01 ~ 07.31" }],
    "신간·개정": [{ title: "Bricks Reading 150 개정판 출시", period: "2026.07.01 ~" }],
    "세미나": [{ title: "2026 여름 교사 세미나", period: "2026.07.20 ~ 07.21" }]
  };

  var FIX_NOTICES = [
    { cat: "오탈자", title: "Bricks Reading 150 L1 p.42 정답 오류 안내", date: "2026.07.05", views: 88 },
    { cat: "문법 오류", title: "Grammar Inside 1 Unit 3 문항 정정", date: "2026.06.22", views: 65 }
  ];

  var CS_INQUIRIES = [
    { no: 3, cat: "주문·배송", title: "배송 지연 문의드립니다", date: "2026.07.09", answered: true },
    { no: 2, cat: "교재 오류신고", title: "L1 정답지 오탈자 제보", date: "2026.06.30", answered: true },
    { no: 1, cat: "일반문의", title: "부가서비스 이용 문의", date: "2026.06.20", answered: false }
  ];

  var BRANCHES = [
    { name: "서울지사", addr: "서울특별시 마포구 월드컵북로 396", tel: "02-2014-7114" },
    { name: "경기지사", addr: "경기도 성남시 분당구 판교역로 123", tel: "031-123-4567" },
    { name: "부산지사", addr: "부산광역시 해운대구 센텀중앙로 55", tel: "051-987-6543" }
  ];

  function renderNotices(badgeFilter) {
    var filtered = NOTICES.filter(function (n) { return badgeFilter === "전체" || n.badge === badgeFilter; });
    document.getElementById("noticeTableBody").innerHTML = filtered.map(function (n, i) {
      return (
        '<tr class="' + (n.pinned ? "is-pinned" : "") + '">' +
          '<td>' + (n.pinned ? "공지" : i + 1) + '</td>' +
          '<td><span class="n-tag' + (n.badge === "필독" ? " must" : "") + '">' + n.badge + '</span>' + n.cat + '</td>' +
          '<td><a class="n-title-link" href="#" data-toast="공지사항 상세로 이동합니다.">' + n.title + '</a></td>' +
          '<td>' + n.date + '</td><td>' + n.views + '</td>' +
        '</tr>'
      );
    }).join("");
  }

  document.getElementById("noticeBadgeFilter").addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (!btn) return;
    document.querySelectorAll("#noticeBadgeFilter button").forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");
    renderNotices(btn.getAttribute("data-badge"));
  });

  function renderFaq(cat) {
    var list = FAQS.filter(function (f) { return cat === "전체" || f.cat === cat; });
    document.getElementById("faqList").innerHTML = list.length
      ? list.map(function (f, i) {
          return (
            '<div class="faq-item" data-faq-idx="' + i + '">' +
              '<div class="faq-q"><span><span class="q-cat">' + f.cat + '</span><span class="q-text">' + f.q + '</span></span><span class="chevron">▾</span></div>' +
              '<div class="faq-a">' + f.a + '</div>' +
            '</div>'
          );
        }).join("")
      : '<p class="empty-inline">해당 분류의 FAQ가 없습니다.</p>';
  }

  document.getElementById("faqCats").addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (!btn) return;
    document.querySelectorAll("#faqCats button").forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");
    renderFaq(btn.getAttribute("data-faq-cat"));
  });
  document.getElementById("faqList").addEventListener("click", function (e) {
    var q = e.target.closest(".faq-q");
    if (q) q.parentElement.classList.toggle("is-open");
  });

  function renderCsEvents(sub) {
    document.getElementById("winnerBtn").style.display = sub === "이벤트" ? "" : "none";
    document.getElementById("csEventGrid").innerHTML = CS_EVENTS[sub].map(function (e) {
      return (
        '<div class="event-card">' +
          '<div class="ec-thumb"></div>' +
          '<div class="ec-body"><p class="ec-label">' + sub + '</p><p class="ec-title">' + e.title + '</p><p class="ec-period">' + e.period + '</p></div>' +
        '</div>'
      );
    }).join("");
  }
  document.getElementById("eventSubtabs").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-event-sub]");
    if (!btn) return;
    document.querySelectorAll("#eventSubtabs button[data-event-sub]").forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");
    renderCsEvents(btn.getAttribute("data-event-sub"));
  });

  document.getElementById("fixTableBody").innerHTML = FIX_NOTICES.map(function (f, i) {
    return '<tr><td>' + (i + 1) + '</td><td>' + f.cat + '</td><td><a class="n-title-link" href="#" data-toast="교재 오류정정 상세로 이동합니다.">' + f.title + '</a></td><td>' + f.date + '</td><td>' + f.views + '</td></tr>';
  }).join("");

  document.getElementById("csInquiryTableBody").innerHTML = CS_INQUIRIES.map(function (q) {
    return '<tr><td>' + q.no + '</td><td>' + q.cat + '</td><td>' + q.title + '</td><td>' + q.date + '</td><td><span class="status-pill ' + (q.answered ? "done" : "wait") + '">' + (q.answered ? "답변완료" : "답변대기") + '</span></td></tr>';
  }).join("");

  document.getElementById("branchGrid").innerHTML = BRANCHES.map(function (b) {
    return '<div class="branch-card"><p class="b-name">' + b.name + '</p><p class="b-addr">' + b.addr + '</p><p class="b-tel">' + b.tel + '</p></div>';
  }).join("");

  function switchCsTab(tab) {
    document.querySelectorAll("[data-cs-tab]").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-cs-tab") === tab); });
    document.querySelectorAll(".cs-panel").forEach(function (p) { p.classList.toggle("is-active", p.id === "cs-" + tab); });
  }
  document.body.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-cs-tab]");
    if (btn) { e.preventDefault(); switchCsTab(btn.getAttribute("data-cs-tab")); }
  });

  document.getElementById("inquirySubtabs").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-inq-sub]");
    if (!btn) return;
    document.querySelectorAll("#inquirySubtabs button").forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");
    document.querySelectorAll(".inquiry-panel").forEach(function (p) { p.classList.remove("is-active"); });
    document.getElementById("inq-" + btn.getAttribute("data-inq-sub")).classList.add("is-active");
  });

  document.getElementById("consultTypeSelect").addEventListener("change", function () {
    document.getElementById("orderLinkBox").classList.toggle("is-visible", this.value === "order");
  });

  document.getElementById("submitInquiryBtn").addEventListener("click", function () {
    if (!document.getElementById("wTitle").value.trim()) { alert("제목을 입력해주세요."); document.getElementById("wTitle").focus(); return; }
    if (!document.getElementById("wBody").value.trim()) { alert("내용을 입력해주세요."); document.getElementById("wBody").focus(); return; }
    if (!document.getElementById("wEmail").value.trim()) { alert("이메일을 입력해주세요."); document.getElementById("wEmail").focus(); return; }
    showToast("문의가 등록되었습니다. 답변대기 상태로 접수되었습니다.");
    document.getElementById("inq-write").querySelectorAll("input,textarea,select").forEach(function (el) { el.value = ""; });
  });

  document.getElementById("submitGuestInquiryBtn").addEventListener("click", function () {
    if (!document.getElementById("gName").value.trim()) { alert("이름을 입력해주세요."); document.getElementById("gName").focus(); return; }
    if (!document.getElementById("gEmail").value.trim()) { alert("이메일을 입력해주세요."); document.getElementById("gEmail").focus(); return; }
    if (!document.getElementById("gTitle").value.trim()) { alert("제목을 입력해주세요."); document.getElementById("gTitle").focus(); return; }
    if (!document.getElementById("gBody").value.trim()) { alert("내용을 입력해주세요."); document.getElementById("gBody").focus(); return; }
    if (!document.getElementById("gCaptcha").value.trim()) { alert("보안문자를 입력해주세요."); document.getElementById("gCaptcha").focus(); return; }
    if (!document.getElementById("gConsentRequired").checked) { alert("개인정보 수집·이용 동의(필수)를 체크해주세요."); return; }
    showToast("비회원 문의가 등록되었습니다.");
  });

  document.body.addEventListener("click", function (e) {
    var el = e.target.closest("[data-toast]");
    if (el) { e.preventDefault(); showToast(el.getAttribute("data-toast")); }
  });

  renderNotices("전체");
  renderFaq("전체");
  renderCsEvents("이벤트");

  var params = new URLSearchParams(window.location.search);
  var tabParam = params.get("tab");
  if (tabParam && document.getElementById("cs-" + tabParam)) {
    switchCsTab(tabParam);
  }
})();
