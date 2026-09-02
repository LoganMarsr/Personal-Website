/* Logan Marshall — portfolio interactions
   Mobile nav, CAD-render lightbox, scroll reveals. */
(function () {
  "use strict";

  /* ---- mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "CLOSE" : "MENU";
    });
  }

  /* ---- lightbox for project renders ---- */
  var box = document.getElementById("lightbox");
  if (box) {
    var boxImg = box.querySelector("img");
    var boxCap = box.querySelector(".lightbox-caption");
    var lastFocus = null;

    function open(src, alt, caption) {
      lastFocus = document.activeElement;
      boxImg.src = src;
      boxImg.alt = alt || "";
      boxCap.textContent = caption || "";
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      box.querySelector(".lightbox-close").focus();
    }
    function close() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      boxImg.removeAttribute("src");
      if (lastFocus) lastFocus.focus();
    }

    document.querySelectorAll(".shot").forEach(function (shot) {
      var img = shot.querySelector("img");
      var tag = shot.querySelector(".shot-tag");
      if (!img) return;
      shot.setAttribute("role", "button");
      shot.setAttribute("tabindex", "0");
      shot.setAttribute("aria-label", "Enlarge: " + (img.alt || "project image"));
      function fire() {
        open(img.currentSrc || img.src, img.alt, tag ? tag.textContent : "");
      }
      shot.addEventListener("click", fire);
      shot.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fire();
        }
      });
    });

    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("lightbox-close")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("is-open")) close();
    });
  }

  /* ---- gentle project framing (projects page) ----
     Settles onto a project only when a scroll has ALREADY come to rest
     near one, so ordinary scrolling is never fought. The project just
     departed is excluded as a target until the reader has moved well
     clear of it, which is what stops the pull-back loop that CSS
     scroll-snap's `proximity` mode produces at this section size. */
  var root = document.documentElement;
  if (root.classList.contains("snap-projects")) {
    var items = [].slice.call(document.querySelectorAll(".project"));
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var NEAR = 260;      // settle only inside this distance
    var MIN_MOVE = 8;    // ignore sub-pixel tidying
    var lastId = null;
    var quietUntil = 0;
    var settleTimer;

    var active = function () {
      return items.length &&
        !motion.matches &&
        window.innerWidth > 900 &&
        window.innerHeight >= 760 &&
        !document.querySelector(".lightbox.is-open");
    };

    var idealFor = function (el) {
      var nav = document.querySelector(".navbar");
      var pad = nav ? nav.getBoundingClientRect().height : 0;
      var docTop = el.getBoundingClientRect().top + window.scrollY;
      var slack = Math.max(0, window.innerHeight - pad - el.offsetHeight);
      return Math.round(docTop - pad - slack / 2);
    };

    var settle = function () {
      if (!active() || Date.now() < quietUntil) return;
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (y <= 2 || y >= max - 2) { lastId = null; return; }

      // once well clear of the last target, allow returning to it
      if (lastId) {
        var prev = document.getElementById(lastId);
        if (!prev || Math.abs(idealFor(prev) - y) > NEAR * 2) lastId = null;
      }

      var best = null, bestDist = Infinity;
      items.forEach(function (el) {
        if (el.id && el.id === lastId) return;
        var d = Math.abs(idealFor(el) - y);
        if (d < bestDist) { bestDist = d; best = el; }
      });
      if (!best || bestDist > NEAR || bestDist < MIN_MOVE) return;

      lastId = best.id;
      quietUntil = Date.now() + 700;
      window.scrollTo({
        top: Math.max(0, Math.min(max, idealFor(best))),
        behavior: "smooth"
      });
    };

    window.addEventListener("scroll", function () {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 150);
    }, { passive: true });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
