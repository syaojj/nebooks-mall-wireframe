/* ==========================================================================
   NE Books · 장바구니 (design_v0.6) — interactions
   Grounded in UC-BUY-06~12, POL-DELIVERY, POL-POINT
   ========================================================================== */
(function () {
  "use strict";
  var showToast = window.NEBooks.showToast;

  var CART = [
    { id: 1, name: "Phonics Code 1 : Student Book", list: 15000, sale: 13500, pct: 10, qty: 1, status: "onsale", checked: true },
    { id: 2, name: "Bricks Reading 150 · L1", list: 15000, sale: 13500, pct: 10, qty: 2, status: "onsale", checked: true },
    { id: 3, name: "Grammar Inside 1", list: 16000, sale: 14400, pct: 10, qty: 1, status: "soldout", checked: true }
  ];

  function itemHtml(it) {
    return (
      '<div class="cart-item" data-id="' + it.id + '">' +
        '<input class="cb" type="checkbox" data-check="' + it.id + '"' + (it.checked ? " checked" : "") + '>' +
        '<a class="thumb" href="detail.html"><img src="assets/cover-placeholder.png" alt="' + it.name + '"></a>' +
        '<div class="info">' +
          '<p class="name"><a href="detail.html">' + it.name + '</a>' + (it.status === "soldout" ? '<span class="soldout-flag">일시품절</span>' : '') + '</p>' +
          '<p class="meta"><span class="list">' + it.list.toLocaleString() + '원</span><span class="pct">' + it.pct + '%</span>' + it.sale.toLocaleString() + '원</p>' +
          '<p class="point">적립 예정 ' + Math.round(it.list * 0.05 * it.qty).toLocaleString() + 'P</p>' +
        '</div>' +
        '<div class="qty-col qty-stepper" style="width:110px;">' +
          '<button data-qty-minus="' + it.id + '" aria-label="수량 감소">−</button>' +
          '<input type="text" value="' + it.qty + '" data-qty-input="' + it.id + '" style="flex:1;">' +
          '<button data-qty-plus="' + it.id + '" aria-label="수량 증가">+</button>' +
        '</div>' +
        '<p class="line-total">' + (it.sale * it.qty).toLocaleString() + '원</p>' +
        '<button class="remove-btn" data-remove="' + it.id + '" aria-label="삭제">✕</button>' +
      '</div>'
    );
  }

  function render() {
    document.getElementById("cartItems").innerHTML = CART.map(itemHtml).join("");
    document.getElementById("cartEmpty").classList.toggle("is-visible", CART.length === 0);
    document.getElementById("cartItems").style.display = CART.length === 0 ? "none" : "";
    document.querySelector(".cart-select-bar").style.display = CART.length === 0 ? "none" : "flex";
    document.getElementById("totalItemCount").textContent = CART.length;
    document.getElementById("selectAll").checked = CART.length > 0 && CART.every(function (i) { return i.checked; });
    recalc();
  }

  function recalc() {
    var selected = CART.filter(function (i) { return i.checked; });
    document.getElementById("selectedCount").textContent = selected.length;

    var listSum = selected.reduce(function (s, i) { return s + i.list * i.qty; }, 0);
    var saleSum = selected.reduce(function (s, i) { return s + i.sale * i.qty; }, 0);
    var discount = listSum - saleSum;
    var shipping = selected.length === 0 ? 0 : (saleSum >= 30000 ? 0 : 2500);
    var total = saleSum + shipping;
    var reward = Math.round(listSum * 0.05);

    document.getElementById("sumSubtotal").textContent = listSum.toLocaleString() + "원";
    document.getElementById("sumDiscount").textContent = "-" + discount.toLocaleString() + "원";
    document.getElementById("sumShipping").textContent = shipping === 0 ? "무료" : shipping.toLocaleString() + "원";
    document.getElementById("sumTotal").textContent = total.toLocaleString() + "원";
    document.getElementById("sumReward").textContent = "적립 예정 포인트 " + reward.toLocaleString() + "P";

    var cartBadge = document.getElementById("cartBadge");
    if (cartBadge) cartBadge.textContent = String(CART.reduce(function (s, i) { return s + i.qty; }, 0));
  }

  function goToOrder(items) {
    if (items.length === 0) { showToast("주문할 상품을 선택해 주세요."); return; }
    if (items.some(function (i) { return i.status === "soldout"; })) {
      showToast("일시품절된 상품이 있어 주문이 불가합니다.");
      return;
    }
    window.location.href = "checkout.html";
  }

  document.body.addEventListener("click", function (e) {
    var check = e.target.closest("[data-check]");
    if (check) {
      var id = Number(check.getAttribute("data-check"));
      CART.find(function (i) { return i.id === id; }).checked = check.checked;
      recalc();
      return;
    }
    var minus = e.target.closest("[data-qty-minus]");
    if (minus) {
      var it1 = CART.find(function (i) { return i.id === Number(minus.getAttribute("data-qty-minus")); });
      it1.qty = Math.max(1, it1.qty - 1);
      render();
      return;
    }
    var plus = e.target.closest("[data-qty-plus]");
    if (plus) {
      var it2 = CART.find(function (i) { return i.id === Number(plus.getAttribute("data-qty-plus")); });
      it2.qty = Math.min(999, it2.qty + 1);
      render();
      return;
    }
    var remove = e.target.closest("[data-remove]");
    if (remove) {
      if (confirm("이 상품을 삭제하시겠습니까?")) {
        var id2 = Number(remove.getAttribute("data-remove"));
        CART = CART.filter(function (i) { return i.id !== id2; });
        render();
      }
      return;
    }
    if (e.target.id === "bulkDeleteBtn") {
      var selectedIds = CART.filter(function (i) { return i.checked; }).map(function (i) { return i.id; });
      if (selectedIds.length === 0) { showToast("삭제할 상품을 선택해 주세요."); return; }
      if (confirm("선택한 상품을 삭제하시겠습니까?")) {
        CART = CART.filter(function (i) { return selectedIds.indexOf(i.id) === -1; });
        render();
      }
      return;
    }
    if (e.target.id === "orderSelectedBtn") { goToOrder(CART.filter(function (i) { return i.checked; })); return; }
    if (e.target.id === "orderAllBtn") { goToOrder(CART.slice()); return; }
  });

  document.body.addEventListener("change", function (e) {
    if (e.target.id === "selectAll") {
      CART.forEach(function (i) { i.checked = e.target.checked; });
      render();
    }
    var qtyInput = e.target.closest("[data-qty-input]");
    if (qtyInput) {
      var id3 = Number(qtyInput.getAttribute("data-qty-input"));
      var v = parseInt(qtyInput.value, 10);
      var it3 = CART.find(function (i) { return i.id === id3; });
      it3.qty = isNaN(v) || v < 1 ? 1 : Math.min(999, v);
      render();
    }
  });

  render();
})();
