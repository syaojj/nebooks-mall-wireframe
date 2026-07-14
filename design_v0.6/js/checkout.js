/* ==========================================================================
   NE Books · 주문/결제 (design_v0.6) — interactions
   Grounded in UC-ORD-01~10, UC-PNT-01/07, POL-ORDER (주문번호 NB+YYYYMMDD+6자리)
   ========================================================================== */
(function () {
  "use strict";
  var showToast = window.NEBooks.showToast;

  var ORDER_ITEMS = [
    { name: "Phonics Code 1 : Student Book", list: 15000, sale: 13500, qty: 1 },
    { name: "Bricks Reading 150 · L1", list: 15000, sale: 13500, qty: 2 }
  ];
  var AVAILABLE_POINTS = 3200;

  function renderItems() {
    document.getElementById("orderItems").innerHTML = ORDER_ITEMS.map(function (it) {
      return (
        '<div class="order-item-row">' +
          '<div class="thumb"><img src="assets/cover-placeholder.png" alt="' + it.name + '"></div>' +
          '<div class="info">' + it.name + '<br><span class="qty">' + it.sale.toLocaleString() + '원 · 수량 ' + it.qty + '개</span></div>' +
          '<div class="price">' + (it.sale * it.qty).toLocaleString() + '원</div>' +
        '</div>'
      );
    }).join("");
  }

  function totals() {
    var listSum = ORDER_ITEMS.reduce(function (s, i) { return s + i.list * i.qty; }, 0);
    var saleSum = ORDER_ITEMS.reduce(function (s, i) { return s + i.sale * i.qty; }, 0);
    var discount = listSum - saleSum;
    var shipping = saleSum >= 30000 ? 0 : 2500;
    return { listSum: listSum, saleSum: saleSum, discount: discount, shipping: shipping };
  }

  function recalc() {
    var t = totals();
    var beforePoint = t.saleSum + t.shipping;
    var pointInput = document.getElementById("pointInput");
    var pointUsed = Math.min(parseInt(pointInput.value, 10) || 0, AVAILABLE_POINTS, beforePoint);
    pointUsed = Math.floor(pointUsed / 100) * 100;
    pointInput.value = pointUsed;

    var total = beforePoint - pointUsed;
    var reward = Math.round(t.listSum * 0.05);

    document.getElementById("sumSubtotal").textContent = t.listSum.toLocaleString() + "원";
    document.getElementById("sumDiscount").textContent = "-" + t.discount.toLocaleString() + "원";
    document.getElementById("sumPointUsed").textContent = "-" + pointUsed.toLocaleString() + "원";
    document.getElementById("sumShipping").textContent = t.shipping === 0 ? "무료" : t.shipping.toLocaleString() + "원";
    document.getElementById("sumTotal").textContent = total.toLocaleString() + "원";
    document.getElementById("sumReward").textContent = "적립 예정 포인트 " + reward.toLocaleString() + "P";
    document.getElementById("payBtn").textContent = total.toLocaleString() + "원 결제하기";
    return total;
  }

  function alertField(id, msg) {
    var el = document.getElementById(id);
    alert(msg);
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus();
  }

  function wireAddrTabs() {
    var fields = {
      same: { name: "홍길동", phone: "010-1234-5678", address: "서울특별시 마포구 월드컵북로 396" },
      new: { name: "", phone: "", address: "" },
      recent: { name: "홍길동", phone: "010-1234-5678", address: "서울특별시 강남구 테헤란로 123 (최근 배송지)" }
    };
    document.querySelectorAll("#addrTabs button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("#addrTabs button").forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var tab = btn.getAttribute("data-addr-tab");
        if (tab === "recent") showToast("최근 배송지 3건 팝업을 엽니다 (샘플: 강남구 테헤란로).");
        var f = fields[tab];
        document.getElementById("addrName").value = f.name;
        document.getElementById("addrPhone").value = f.phone;
        document.getElementById("addrAddress").value = f.address;
      });
    });
  }

  function wirePayMethods() {
    document.querySelectorAll('#payMethods input[name="pay"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        document.querySelectorAll("#payMethods label").forEach(function (l) { l.classList.remove("is-active"); });
        radio.closest("label").classList.add("is-active");
        document.getElementById("vbankNote").classList.toggle("is-visible", radio.value === "vbank");
      });
    });
  }

  function wirePoints() {
    document.getElementById("pointInput").addEventListener("change", recalc);
    document.getElementById("pointAllBtn").addEventListener("click", function () {
      document.getElementById("pointInput").value = AVAILABLE_POINTS;
      recalc();
    });
    document.getElementById("pointClearBtn").addEventListener("click", function () {
      document.getElementById("pointInput").value = 0;
      recalc();
    });
  }

  function wireTerms() {
    var modal = document.getElementById("termsModal");
    document.getElementById("viewTermsBtn").addEventListener("click", function () { modal.classList.add("is-open"); });
    document.getElementById("closeTermsBtn").addEventListener("click", function () { modal.classList.remove("is-open"); });
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.classList.remove("is-open"); });
  }

  function makeOrderNumber() {
    var seq = String(Math.floor(Math.random() * 900000) + 100000);
    return "NB20260714" + seq;
  }

  function wirePay() {
    document.getElementById("payBtn").addEventListener("click", function () {
      if (!document.getElementById("addrName").value.trim()) { alertField("addrName", "이름을 입력해주세요."); return; }
      if (!document.getElementById("addrPhone").value.trim()) { alertField("addrPhone", "휴대폰을 입력해주세요."); return; }
      if (!document.getElementById("addrAddress").value.trim()) { alertField("addrAddress", "주소를 입력해주세요."); return; }
      if (!document.getElementById("agreeCheck").checked) {
        alert("주문 동의 체크박스를 확인해주세요.");
        document.getElementById("agreeCheck").focus();
        return;
      }

      var total = recalc();
      var payMethod = document.querySelector('#payMethods input[name="pay"]:checked').value;
      var payLabel = { card: "신용카드", transfer: "계좌이체", vbank: "무통장입금(가상계좌)" }[payMethod];
      var order = {
        orderNumber: makeOrderNumber(),
        payMethod: payMethod,
        payLabel: payLabel,
        total: total,
        items: ORDER_ITEMS,
        address: {
          name: document.getElementById("addrName").value,
          phone: document.getElementById("addrPhone").value,
          address: document.getElementById("addrAddress").value,
          request: document.getElementById("addrRequest").value
        },
        reward: document.getElementById("sumReward").textContent,
        createdAt: "2026-07-14"
      };
      try { localStorage.setItem("nebooks_last_order", JSON.stringify(order)); } catch (err) {}
      window.location.href = "order-complete.html";
    });
  }

  renderItems();
  recalc();
  wireAddrTabs();
  wirePayMethods();
  wirePoints();
  wireTerms();
  wirePay();
})();
