(function () {
  const hero = document.querySelector(".hero");
  const apply = document.getElementById("apply");
  const body = document.body;

  if (hero) {
    new IntersectionObserver(
      ([entry]) => body.classList.toggle("is-scrolled-past-hero", !entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    ).observe(hero);
  }

  if (apply) {
    new IntersectionObserver(
      ([entry]) => body.classList.toggle("is-at-apply", entry.isIntersecting),
      { threshold: 0.15 }
    ).observe(apply);
  }
})();
