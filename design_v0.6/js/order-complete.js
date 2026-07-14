/* ==========================================================================
   NE Books · 주문완료 (design_v0.6) — interactions
   Grounded in UC-ORD-11 (주문완료 안내), UC-ORD-13 (이동), UC-ORD-14 (비정상 접근 차단)
   ========================================================================== */
(function () {
  "use strict";

  var raw = null;
  try { raw = localStorage.getItem("nebooks_last_order"); } catch (err) {}

  if (!raw) {
    document.querySelector(".complete-hero").innerHTML =
      '<div class="check" style="color:var(--gray-a9);">!</div>' +
      '<h1>주문 정보를 찾을 수 없습니다.</h1>' +
      '<p>정상적인 주문 절차를 통해서만 이 화면에 접근할 수 있습니다. (UC-ORD-14 비정상 접근 차단)</p>';
    document.querySelector(".complete-cols").style.display = "none";
    document.querySelector(".complete-actions").innerHTML =
      '<a class="btn btn-primary" href="index.html">홈으로</a>';
    return;
  }

  var order = JSON.parse(raw);
  var payDetail = { card: "", transfer: "", vbank: "" };

  document.getElementById("orderNoDisplay").textContent = "주문번호 " + order.orderNumber;

  document.getElementById("addressInfo").innerHTML =
    '<span class="label">받는분</span><span>' + order.address.name + ' / ' + order.address.phone + '</span>' +
    '<span class="label">주소</span><span>' + order.address.address + '</span>' +
    '<span class="label">요청사항</span><span>' + (order.address.request || "-") + '</span>';

  var paymentRows =
    '<span class="label">주문번호</span><span>' + order.orderNumber + '</span>' +
    '<span class="label">결제수단</span><span>' + order.payLabel + '</span>' +
    '<span class="label">결제일시</span><span>' + order.createdAt + '</span>';

  if (order.payMethod === "vbank") {
    paymentRows +=
      '<span class="label">입금자명</span><span>' + order.address.name + ' (입금기한: 2026.07.21)</span>' +
      '<span class="label">입금은행</span><span>[국민은행] 123456-78-901234 NE능률(주)</span>';
  }
  document.getElementById("paymentInfo").innerHTML = paymentRows;

  var t = order.items.reduce(function (acc, i) {
    acc.listSum += i.list * i.qty;
    acc.saleSum += i.sale * i.qty;
    return acc;
  }, { listSum: 0, saleSum: 0 });
  var shipping = t.saleSum >= 30000 ? 0 : 2500;

  document.getElementById("amountBox").innerHTML =
    '<div class="row"><span>총 상품금액</span><span class="v">' + t.listSum.toLocaleString() + '원</span></div>' +
    '<div class="row"><span>상품 할인금액</span><span class="v">-' + (t.listSum - t.saleSum).toLocaleString() + '원</span></div>' +
    '<div class="row"><span>포인트 사용</span><span class="v">-' + Math.max(0, (t.saleSum + shipping - order.total)).toLocaleString() + '원</span></div>' +
    '<div class="row"><span>배송비</span><span class="v">' + (shipping === 0 ? "무료" : shipping.toLocaleString() + "원") + '</span></div>' +
    '<div class="divider"></div>' +
    '<div class="row total"><span>총 결제금액</span><span class="v">' + order.total.toLocaleString() + '원</span></div>' +
    '<p class="reward-note">' + order.reward + '</p>';
})();
