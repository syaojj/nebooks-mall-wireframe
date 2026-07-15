/* ==========================================================================
   NE Books · shared header/footer interactions (used by every page)
   ========================================================================== */
window.NEBooks = (function () {
  "use strict";

  function showToast(msg) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  function wireHeader() {
    var searchBtn = document.getElementById("searchSubmit");
    var searchInput = document.getElementById("searchInput");
    if (searchBtn && searchInput) {
      searchBtn.addEventListener("click", function () {
        var q = searchInput.value.trim();
        showToast(q ? ('"' + q + '" 검색 결과 화면은 이번 구현 범위에 포함되어 있지 않습니다.') : "검색어를 입력해 주세요.");
      });
      searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") searchBtn.click();
      });
    }

    var hamburgerBtn = document.getElementById("hamburgerBtn");
    if (hamburgerBtn) hamburgerBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showToast("이 메뉴의 오버레이 화면은 별도로 구현됩니다 (UC-FIND-04).");
    });

    var layerLogoutBtn = document.getElementById("headerLayerLogoutBtn");
    if (layerLogoutBtn) layerLogoutBtn.addEventListener("click", function () {
      if (confirm("로그아웃 하시겠습니까?")) window.location.href = "index.html";
    });

    function closeAllLayers(except) {
      document.querySelectorAll(".icon-group.has-layer.is-open").forEach(function (el) {
        if (el !== except) el.classList.remove("is-open");
      });
    }

    document.querySelectorAll(".icon-group.has-layer > .icon-group-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var group = link.closest(".icon-group.has-layer");
        var wasOpen = group.classList.contains("is-open");
        closeAllLayers();
        if (!wasOpen) group.classList.add("is-open");
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".icon-group.has-layer")) closeAllLayers();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllLayers();
    });
  }

  document.addEventListener("DOMContentLoaded", wireHeader);

  return { showToast: showToast };
})();
