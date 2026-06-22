/* =====================================================================
   NE Books 자사몰 개편 — Front 와이어프레임 인터랙션
   기준: 기능정의서_v1.0_260617 (Sheet 06/07/09/10)
   ※ 실제 결제연동/API/DB 없음 — 화면 검토용 더미 인터랙션만 구현
   ===================================================================== */
(function () {
  'use strict';
  var won = function (n) { return n.toLocaleString('ko-KR') + '원'; };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------- 화면 전환 (좌측 네비 / data-goto) ---------------- */
  function showScreen(key) {
    $$('.screen').forEach(function (s) { s.classList.remove('active'); });
    var el = $('#screen-' + key);
    if (el) el.classList.add('active');
    $$('.nav-item').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-screen') === key);
    });
    // 최근 본 도서 플로팅: 교재목록/상세에서만 노출 (Sheet06 R10)
    var fr = $('#floating-recent');
    if (fr) fr.classList.toggle('show', key === 'list' || key === 'view');
    window.scrollTo(0, 0);
  }
  $$('.nav-item').forEach(function (a) {
    a.addEventListener('click', function () { showScreen(a.getAttribute('data-screen')); });
  });
  // data-goto 로 화면 이동시키는 버튼/탭
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-goto]');
    if (t) { e.preventDefault(); showScreen(t.getAttribute('data-goto')); }
  });

  /* ---------------- 공통 탭 (data-tabgroup) ---------------- */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tabs .tab');
    if (!tab) return;
    var group = tab.parentElement;
    if (group.getAttribute('data-tabgroup') == null &&
        !group.id) { /* 단순 표시용 탭도 active 토글 */ }
    $$('.tab', group).forEach(function (x) { x.classList.remove('active'); });
    tab.classList.add('active');

    // 교재목록 보기유형 전환 (Sheet06 R12) : 교재구매형 ↔ E-Book·자료형
    if (group.id === 'viewtype-tabs') {
      var buy = tab.textContent.indexOf('구매형') > -1;
      $('#cards-buy').style.display = buy ? '' : 'none';
      $('#cards-data').style.display = buy ? 'none' : '';
    }

    // data-tabgroup ↔ data-tabpanelgroup 패널 전환 (교재상세·포인트/쿠폰 등 공통)
    var tg = group.getAttribute('data-tabgroup');
    if (tg) {
      var pg = document.querySelector('[data-tabpanelgroup="' + tg + '"]');
      if (pg) {
        var panels = $$('.tabpanel', pg);
        var idx = $$('.tab', group).indexOf(tab);
        panels.forEach(function (p, i) {
          var on = i === idx;
          p.classList.toggle('active', on);
          p.style.display = on ? '' : 'none';
        });
      }
    }

    // 주문/결제 배송지 탭 (Sheet10 R6~R7)
    if (group.id === 'addr-tabs') {
      var mode = tab.getAttribute('data-addr');
      handleAddrTab(mode);
    }
  });

  // .tabpanel 은 active 만 보이도록 초기화 (이후 전환은 위 핸들러가 처리)
  $$('.tabpanel').forEach(function (p) { if (!p.classList.contains('active')) p.style.display = 'none'; });

  /* ---------------- 배송지 탭 동작 (회원동일/새로입력/최근) ---------------- */
  function setAddr(v) {
    $('#addr-name').value = v.name || '';
    $('#addr-tel').value = v.tel || '';
    $('#addr-zip').value = v.zip || '';
    $('#addr-addr1').value = v.a1 || '';
    $('#addr-addr2').value = v.a2 || '';
  }
  function handleAddrTab(mode) {
    if (mode === 'same') {
      // 통합회원 주소 자동
      setAddr({ name: '홍길동', tel: '010-1234-5678', zip: '06234', a1: '서울특별시 강남구 테헤란로 …', a2: 'OO빌딩 5층' });
    } else if (mode === 'new') {
      // 빈값 신규 입력
      setAddr({});
    } else if (mode === 'recent') {
      openModal('modal-recentaddr'); // 팝업에서 선택
    }
  }

  /* ---------------- 모달 ---------------- */
  function openModal(id) { var m = $('#' + id); if (m) m.classList.add('open'); }
  function closeModal(m) { m.classList.remove('open'); }
  document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-modal]');
    if (open) { e.preventDefault(); openModal(open.getAttribute('data-modal')); return; }
    if (e.target.hasAttribute('data-close') || e.target.classList.contains('modal-overlay')) {
      var ov = e.target.closest('.modal-overlay') || e.target;
      if (ov.classList.contains('modal-overlay')) closeModal(ov);
    }
  });

  // 멀티다운로드 가드: 2개 이상 선택 시에만 팝업(개별 1개는 개별 다운로드) — Sheet07 R20~R21
  var multiBtn = $('#btn-download-multi');
  if (multiBtn) {
    multiBtn.addEventListener('click', function (e) {
      var n = $$('.dl-check:checked').length;
      if (n < 2) {
        e.stopImmediatePropagation();
        alert('자료 1개 선택 시 개별 다운로드됩니다.\n멀티 다운로드는 2개 이상 선택 시 이용 가능합니다. (Sheet07 R20)');
      }
    }, true);
  }
  // 학습자료 전체선택
  ['data-all', 'data-list-all', 'cart-all'].forEach(function (id) {
    var box = document.getElementById(id);
    if (!box) return;
    box.addEventListener('change', function () {
      var sel = id === 'cart-all' ? '.cart-check:not([disabled])' : '.dl-check';
      $$(sel, box.closest('section') || document).forEach(function (c) { c.checked = box.checked; });
      if (id === 'cart-all') recalcCart();
    });
  });

  /* ---------------- 쿠폰 선택 모달 적용 (Sheet10 R16~R17) ---------------- */
  var couponApply = $('#coupon-apply');
  if (couponApply) {
    couponApply.addEventListener('click', function () {
      var sel = $('input[name="coupon"]:checked');
      var name = sel ? sel.getAttribute('data-name') : '';
      var amt = sel ? parseInt(sel.getAttribute('data-amt'), 10) : 0;
      $('#coupon-applied').value = name || '선택된 쿠폰 없음';
      orderState.coupon = amt || 0;
      recalcOrder();
      closeModal($('#modal-coupon'));
    });
  }

  /* ---------------- 최근배송지 모달 적용 (Sheet10 R7) ---------------- */
  var raddrApply = $('#recentaddr-apply');
  if (raddrApply) {
    raddrApply.addEventListener('click', function () {
      var sel = $('input[name="raddr"]:checked');
      if (sel) {
        setAddr({
          name: sel.getAttribute('data-name'), tel: sel.getAttribute('data-tel'),
          zip: sel.getAttribute('data-zip'), a1: sel.getAttribute('data-a1'), a2: sel.getAttribute('data-a2')
        });
      }
      closeModal($('#modal-recentaddr'));
    });
  }

  /* ---------------- 포인트 사용 (Sheet10 R15) : 100P 단위, 보유 한도 ---------------- */
  var orderState = { product: 36900, discount: 2800, delivery: 2500, coupon: 0, point: 0, have: 3200, savePoint: 410 };
  var pointInput = $('#point-use');
  function applyPoint() {
    var v = parseInt(pointInput.value, 10) || 0;
    var warn = $('#point-warn');
    if (v % 100 !== 0) { warn.textContent = '※ 100P 단위로만 사용 가능합니다.'; warn.style.color = '#c0392b'; }
    else if (v > orderState.have) { warn.textContent = '※ 보유 포인트(' + orderState.have + 'P)를 초과할 수 없습니다.'; warn.style.color = '#c0392b'; }
    else { warn.textContent = '※ 100P 단위 / 유효기간이 가까운 포인트부터 차감'; warn.style.color = ''; }
    orderState.point = (v % 100 === 0 && v <= orderState.have) ? v : 0;
    recalcOrder();
  }
  if (pointInput) {
    pointInput.addEventListener('input', applyPoint);
    $('#point-all').addEventListener('click', function () {
      var usable = Math.floor(orderState.have / 100) * 100;
      pointInput.value = usable; applyPoint();
    });
  }
  function recalcOrder() {
    if (!$('#ord-total')) return;
    var s = orderState;
    var total = s.product - s.discount - s.coupon - s.point + s.delivery;
    if (total < 0) total = 0;
    $('#ord-product').textContent = won(s.product);
    $('#ord-discount').textContent = '- ' + won(s.discount);
    $('#ord-coupon').textContent = '- ' + won(s.coupon);
    $('#ord-point').textContent = '- ' + won(s.point);
    $('#ord-delivery').textContent = won(s.delivery);
    $('#ord-total').textContent = won(total);
  }
  recalcOrder();

  /* ---------------- 결제수단 선택 강조 (Sheet10 R11) ---------------- */
  var payWrap = $('#pay-methods');
  if (payWrap) {
    payWrap.addEventListener('change', function () {
      $$('.opt', payWrap).forEach(function (o) {
        o.classList.toggle('selected', !!$('input', o).checked);
      });
    });
  }
  // 쿠폰/최근배송지 opt 선택 강조 공통
  document.addEventListener('change', function (e) {
    if (e.target.matches('input[name="coupon"], input[name="raddr"]')) {
      var list = e.target.closest('.opt-list');
      $$('.opt', list).forEach(function (o) { o.classList.toggle('selected', !!$('input', o).checked); });
    }
  });

  /* ---------------- v4.0 : 주문동의 체크 시에만 결제 가능 ---------------- */
  var agree = $('#order-agree');
  var payBtn = $('#btn-pay');
  if (agree && payBtn) {
    agree.addEventListener('change', function () {
      payBtn.disabled = !agree.checked;
      var hint = $('#pay-agree-hint');
      if (hint) hint.textContent = agree.checked ? '※ 결제 가능 상태입니다.' : '※ 주문 동의 체크 시 결제가 가능합니다.';
    });
  }

  /* ---------------- 결제 실패 시나리오 (Sheet10 R22) ---------------- */
  var failBtn = $('#btn-pay-fail');
  if (failBtn) {
    failBtn.addEventListener('click', function () {
      var box = $('#pay-fail-box');
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    });
  }

  /* ---------------- 장바구니 수량/선택/삭제/합계 (Sheet09 R5~R13) ---------------- */
  function recalcCart() {
    var rows = $$('#cart-table tbody tr');
    if (!rows.length) return;
    var product = 0, list = 0, point = 0, anyFree = false, hasPaid = false;
    rows.forEach(function (tr) {
      if (tr.getAttribute('data-soldout')) return; // 품절 제외
      var chk = $('.cart-check', tr);
      if (!chk || !chk.checked) return;
      var qty = parseInt(($('.qty-input', tr) || {}).value || '1', 10);
      var price = parseInt(tr.getAttribute('data-price'), 10);
      var listP = parseInt(tr.getAttribute('data-list'), 10);
      var pt = parseInt(tr.getAttribute('data-point'), 10) * qty;
      product += price * qty;
      list += listP * qty;
      point += pt;
      if (tr.getAttribute('data-free') === '1') anyFree = true; else hasPaid = true;
      var amt = $('.cart-amount', tr);
      if (amt) amt.textContent = won(price * qty);
    });
    var discount = list - product; // 정가-판매가 차액(상품 할인)
    // 배송비 정책 (Sheet09 R9): 유료 상품만 주문 시 3만 미만 2,500 / 3만 이상 무료 / 무료상품 포함 시 전체 무료
    var delivery = 0;
    if (hasPaid && !anyFree) delivery = product >= 30000 ? 0 : 2500;
    var total = product - discount /* 이미 판매가 반영 */;
    // product 는 판매가 합계이므로 결제예상 = product + delivery
    var pay = product + delivery;
    var set = function (id, v) { var el = $('#' + id); if (el) el.textContent = v; };
    set('cart-sum-product', won(list));               // 총 상품금액(정가 합)
    set('cart-sum-discount', '- ' + won(discount));   // 상품 할인
    set('cart-sum-delivery', won(delivery));
    set('cart-sum-total', won(pay));
    set('cart-sum-point', '+ ' + point.toLocaleString('ko-KR') + 'P');
  }
  // 수량 +/- 및 입력 (최소1 최대999)
  document.addEventListener('click', function (e) {
    var tr = e.target.closest('#cart-table tbody tr');
    if (!tr) return;
    var input = $('.qty-input', tr);
    if (e.target.classList.contains('qty-plus') && input) { input.value = Math.min(999, (parseInt(input.value, 10) || 1) + 1); recalcCart(); }
    if (e.target.classList.contains('qty-minus') && input) { input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1); recalcCart(); }
    if (e.target.classList.contains('row-del')) { tr.remove(); recalcCart(); }
  });
  document.addEventListener('input', function (e) {
    if (e.target.classList.contains('qty-input')) {
      var v = parseInt(e.target.value, 10) || 1;
      if (v < 1) v = 1; if (v > 999) v = 999; e.target.value = v; recalcCart();
    }
  });
  document.addEventListener('change', function (e) {
    if (e.target.classList.contains('cart-check')) recalcCart();
  });
  // 선택/전체 삭제
  var delSel = $('#cart-del-selected');
  if (delSel) delSel.addEventListener('click', function () {
    $$('#cart-table tbody tr').forEach(function (tr) { var c = $('.cart-check', tr); if (c && c.checked) tr.remove(); });
    recalcCart();
  });
  var delAll = $('#cart-del-all');
  if (delAll) delAll.addEventListener('click', function () {
    if (confirm('장바구니를 전체 삭제하시겠습니까?')) { $$('#cart-table tbody tr').forEach(function (tr) { tr.remove(); }); recalcCart(); }
  });
  recalcCart();

  /* ---------------- 교재상세 수량 +/- ---------------- */
  document.addEventListener('click', function (e) {
    var q = $('#view-qty');
    if (!q) return;
    if (e.target.textContent === '+' && e.target.classList.contains('btn') && e.target.closest('#screen-view') && e.target.previousElementSibling === q) {
      q.value = (parseInt(q.value, 10) || 1) + 1;
    }
  });
  // 교재상세 수량 버튼(간단 처리)
  var viewQty = $('#view-qty');
  if (viewQty) {
    var minus = viewQty.previousElementSibling, plus = viewQty.nextElementSibling;
    if (minus) minus.addEventListener('click', function () { viewQty.value = Math.max(1, (parseInt(viewQty.value, 10) || 1) - 1); });
    if (plus) plus.addEventListener('click', function () { viewQty.value = (parseInt(viewQty.value, 10) || 1) + 1; });
  }

  /* ---------------- 더미 가드: 장바구니/바로구매 안내 ---------------- */
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('cart-add')) {
      // 비회원도 가능 (Sheet06 R21 / Sheet07 R9)
      alert('장바구니에 담았습니다. (비회원도 이용 가능 · 와이어프레임 더미)');
    }
  });

  /* ---------------- 초기 화면 ---------------- */
  showScreen('main');
})();
