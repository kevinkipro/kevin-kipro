(() => {
  const page = document.querySelector(".motion-page");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!page || reducedMotion) {
    return;
  }

  let offset = 0;
  let velocity = 0;
  let animationFrame = 0;

  const render = () => {
    velocity += -offset * 0.12;
    velocity *= 0.72;
    offset += velocity;

    if (Math.abs(offset) < 0.02 && Math.abs(velocity) < 0.02) {
      offset = 0;
      velocity = 0;
      page.style.removeProperty("--rubber-band-y");
      page.classList.remove("is-rubber-banding");
      animationFrame = 0;
      return;
    }

    page.style.setProperty("--rubber-band-y", `${offset.toFixed(2)}px`);
    animationFrame = window.requestAnimationFrame(render);
  };

  const push = (direction, delta) => {
    const impulse = Math.min(Math.abs(delta) * 0.045, 4.5);

    offset = Math.max(-16, Math.min(16, offset + direction * impulse));
    velocity += direction * Math.min(impulse * 0.32, 1.2);
    page.classList.add("is-rubber-banding");

    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(render);
    }
  };

  window.addEventListener(
    "wheel",
    (event) => {
      const scrollingElement = document.scrollingElement;
      const maxScroll = Math.max(0, scrollingElement.scrollHeight - window.innerHeight);
      const atTop = window.scrollY <= 0;
      const atBottom = window.scrollY >= maxScroll - 1;

      if (event.deltaY < 0 && atTop) {
        push(1, event.deltaY);
      } else if (event.deltaY > 0 && atBottom) {
        push(-1, event.deltaY);
      }
    },
    { passive: true }
  );
})();
