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
      boxImg.src = "";
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
