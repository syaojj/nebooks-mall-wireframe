/* =====================================================================
   NE Books 자사몰 개편 — Front 와이어프레임 v2.0 인터랙션
   NE Design.md v0.11.5-alpha 적용 (Scenario C)
   - v1 PoC 로직 보존(audit-first retrofit). 셀렉터만 .nb-* 로 정합.
   - 실제 결제연동/API/DB 없음 — 화면 검토용 더미 인터랙션.
   ===================================================================== */
(function () {
  'use strict';
  var won = function (n) { return n.toLocaleString('ko-KR') + '원'; };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------- 아이콘 (approved Lucide subset · inline SVG · currentColor) ----------------
     DESIGN.md icon_system.approved_icons 안의 이름만 사용. stroke=currentColor 유지.
     장바구니/공유 아이콘은 approved 목록에 없어 텍스트 라벨로 처리(stop-and-report). */
  var ICONS = {
    'search':        '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'x':             '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'plus':          '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'minus':         '<path d="M5 12h14"/>',
    'chevron-left':  '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'heart':         '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z"/>',
    'download':      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    'external-link': '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    'info':          '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'circle-check':  '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'
  };
  function renderIcons() {
    $$('.nb-ico[data-ic]').forEach(function (el) {
      var name = el.getAttribute('data-ic');
      if (!ICONS[name]) return; // 미승인 아이콘은 렌더하지 않음(텍스트 라벨 유지)
      el.innerHTML = '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
    });
  }
  renderIcons();

  /* ---------------- 화면 전환 (좌측 네비 / data-goto) ---------------- */
  function showScreen(key) {
    $$('.nb-screen').forEach(function (s) { s.classList.remove('active'); });
    var el = $('#screen-' + key);
    if (el) el.classList.add('active');
    $$('.nb-sidebar .nb-nav-item').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-screen') === key);
    });
    // 최근 본 도서 플로팅: 교재목록/상세에서만 (Sheet06 R10)
    var fr = $('#floating-recent');
    if (fr) fr.classList.toggle('show', key === 'list' || key === 'view');
    window.scrollTo(0, 0);
  }
  $$('.nb-sidebar .nb-nav-item').forEach(function (a) {
    a.addEventListener('click', function () { showScreen(a.getAttribute('data-screen')); });
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-goto]');
    if (t) { e.preventDefault(); showScreen(t.getAttribute('data-goto')); }
  });

  /* ---------------- 공통 탭 (data-tabgroup) ---------------- */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.nb-tabs .nb-tab');
    if (!tab) return;
    var group = tab.parentElement;
    $$('.nb-tab', group).forEach(function (x) { x.classList.remove('active'); });
    tab.classList.add('active');

    // 교재목록 보기유형 전환 (Sheet06 R12)
    if (group.id === 'viewtype-tabs') {
      var buy = tab.textContent.indexOf('구매형') > -1;
      $('#cards-buy').style.display = buy ? '' : 'none';
      $('#cards-data').style.display = buy ? 'none' : '';
    }

    // 교재상세 상세 탭 패널 전환
    if (group.getAttribute('data-tabgroup') === 'viewdetail') {
      var panels = $$('[data-tabpanelgroup="viewdetail"] .nb-tabpanel');
      var idx = $$('.nb-tab', group).indexOf(tab);
      panels.forEach(function (p, i) {
        var on = i === idx;
        p.classList.toggle('active', on);
        p.style.display = on ? '' : 'none';
      });
    }

    // 주문/결제 배송지 탭 (Sheet10 R6~R7)
    if (group.id === 'addr-tabs') {
      handleAddrTab(tab.getAttribute('data-addr'));
    }
  });
  // tabpanel 초기화: active만 표시
  $$('.nb-tabpanel').forEach(function (p) { if (!p.classList.contains('active')) p.style.display = 'none'; });

  /* ---------------- 배송지 탭 동작 ---------------- */
  function setAddr(v) {
    $('#addr-name').value = v.name || '';
    $('#addr-tel').value = v.tel || '';
    $('#addr-zip').value = v.zip || '';
    $('#addr-addr1').value = v.a1 || '';
    $('#addr-addr2').value = v.a2 || '';
  }
  function handleAddrTab(mode) {
    if (mode === 'same') {
      setAddr({ name: '홍길동', tel: '010-1234-5678', zip: '06234', a1: '서울특별시 강남구 테헤란로 …', a2: 'OO빌딩 5층' });
    } else if (mode === 'new') {
      setAddr({});
    } else if (mode === 'recent') {
      openModal('modal-recentaddr');
    }
  }

  /* ---------------- 모달 (PoC 최소 구현 · focus-trap/scroll-lock deferred) ---------------- */
  function openModal(id) { var m = $('#' + id); if (m) m.classList.add('open'); }
  function closeModal(m) { m.classList.remove('open'); }
  document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-modal]');
    if (open) { e.preventDefault(); openModal(open.getAttribute('data-modal')); return; }
    if (e.target.closest('[data-close]')) {
      var ov = e.target.closest('.nb-modal-overlay');
      if (ov) closeModal(ov);
      return;
    }
    if (e.target.classList.contains('nb-modal-overlay')) closeModal(e.target);
  });

  // 멀티다운로드 가드: 2개 이상 선택 시에만 팝업 (Sheet07 R20~R21)
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
  // 전체선택 토글
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
    if (v % 100 !== 0) { warn.textContent = '※ 100P 단위로만 사용 가능합니다.'; warn.style.color = 'var(--ne-status-danger)'; }
    else if (v > orderState.have) { warn.textContent = '※ 보유 포인트(' + orderState.have + 'P)를 초과할 수 없습니다.'; warn.style.color = 'var(--ne-status-danger)'; }
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

  /* ---------------- 결제수단 / 옵션 선택 강조 ---------------- */
  document.addEventListener('change', function (e) {
    if (e.target.matches('#pay-methods input[name="pay"]')) {
      $$('.nb-opt', $('#pay-methods')).forEach(function (o) { o.classList.toggle('selected', !!$('input', o).checked); });
    }
    if (e.target.matches('input[name="coupon"], input[name="raddr"]')) {
      var list = e.target.closest('.nb-opt-list');
      $$('.nb-opt', list).forEach(function (o) { o.classList.toggle('selected', !!$('input', o).checked); });
    }
  });

  /* ---------------- 결제 실패 시나리오 (Sheet10 R22) ---------------- */
  var failBtn = $('#btn-pay-fail');
  if (failBtn) {
    failBtn.addEventListener('click', function () {
      var box = $('#pay-fail-box');
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    });
  }

  /* ---------------- 수량 스테퍼 (장바구니 + 교재상세 공통) ---------------- */
  document.addEventListener('click', function (e) {
    var stepper = e.target.closest('.nb-stepper');
    if (!stepper) return;
    var input = $('.qty-input', stepper);
    if (!input) return;
    var v = parseInt(input.value, 10) || 1;
    if (e.target.closest('.qty-plus')) v = Math.min(999, v + 1);
    else if (e.target.closest('.qty-minus')) v = Math.max(1, v - 1);
    else return;
    input.value = v;
    if (stepper.closest('#cart-table')) recalcCart();
  });

  /* ---------------- 장바구니 (Sheet09 R5~R13) ---------------- */
  function recalcCart() {
    var rows = $$('#cart-table tbody tr');
    if (!rows.length) return;
    var product = 0, list = 0, point = 0, anyFree = false, hasPaid = false;
    rows.forEach(function (tr) {
      if (tr.getAttribute('data-soldout')) return;
      var chk = $('.cart-check', tr);
      if (!chk || !chk.checked) return;
      var qty = parseInt(($('.qty-input', tr) || {}).value || '1', 10);
      var price = parseInt(tr.getAttribute('data-price'), 10);
      var listP = parseInt(tr.getAttribute('data-list'), 10);
      product += price * qty;
      list += listP * qty;
      point += parseInt(tr.getAttribute('data-point'), 10) * qty;
      if (tr.getAttribute('data-free') === '1') anyFree = true; else hasPaid = true;
      var amt = $('.cart-amount', tr);
      if (amt) amt.textContent = won(price * qty);
    });
    var discount = list - product;
    // 배송비 (Sheet09 R9): 유료만 주문 시 3만 미만 2,500 / 3만↑ 무료 / 무료상품 포함 시 전체 무료
    var delivery = 0;
    if (hasPaid && !anyFree) delivery = product >= 30000 ? 0 : 2500;
    var pay = product + delivery;
    var set = function (id, v) { var el = $('#' + id); if (el) el.textContent = v; };
    set('cart-sum-product', won(list));
    set('cart-sum-discount', '- ' + won(discount));
    set('cart-sum-delivery', won(delivery));
    set('cart-sum-total', won(pay));
    set('cart-sum-point', '+ ' + point.toLocaleString('ko-KR') + 'P');
  }
  document.addEventListener('input', function (e) {
    if (e.target.classList.contains('qty-input') && e.target.closest('#cart-table')) {
      var v = parseInt(e.target.value, 10) || 1;
      if (v < 1) v = 1; if (v > 999) v = 999; e.target.value = v; recalcCart();
    }
  });
  document.addEventListener('change', function (e) {
    if (e.target.classList.contains('cart-check')) recalcCart();
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('.row-del')) {
      var tr = e.target.closest('#cart-table tbody tr');
      if (tr) { tr.remove(); recalcCart(); }
    }
  });
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

  /* ---------------- 장바구니 담기 더미 안내 ---------------- */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.cart-add')) {
      alert('장바구니에 담았습니다. (비회원도 이용 가능 · 와이어프레임 더미)');
    }
  });

  /* ---------------- 초기 화면 ---------------- */
  showScreen('main');
})();
