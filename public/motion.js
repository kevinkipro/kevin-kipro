(() => {
  const page = document.querySelector(".motion-page");
  const platform = navigator.userAgentData?.platform || navigator.platform;

  // Apple browsers already provide their own edge resistance and rebound.
  if (!page || /Mac|iPhone|iPad|iPod/i.test(platform)) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let offset = 0;
  let velocity = 0;
  let animationFrame = 0;
  let previousTime = 0;

  const reset = () => {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    previousTime = 0;
    offset = 0;
    velocity = 0;
    page.style.removeProperty("--rubber-band-y");
    page.classList.remove("is-rubber-banding");
  };

  const render = (time) => {
    const elapsed = Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;

    // Solve the damped spring by elapsed time, independent of refresh rate.
    const stiffness = 420;
    const damping = 13;
    const frequency = Math.sqrt(stiffness - damping * damping);
    const decay = Math.exp(-damping * elapsed);
    const cosine = Math.cos(frequency * elapsed);
    const sine = Math.sin(frequency * elapsed);
    const nextOffset = decay * (
      offset * cosine + ((velocity + damping * offset) / frequency) * sine
    );
    velocity = decay * (
      velocity * cosine - ((damping * velocity + stiffness * offset) / frequency) * sine
    );
    offset = nextOffset;

    if (Math.abs(offset) < 0.02 && Math.abs(velocity) < 1) {
      reset();
      return;
    }

    page.style.setProperty("--rubber-band-y", `${offset.toFixed(2)}px`);
    animationFrame = window.requestAnimationFrame(render);
  };

  const push = (direction, delta) => {
    const impulse = Math.min(Math.abs(delta) * 0.045, 4.5);

    offset = Math.max(-16, Math.min(16, offset + direction * impulse));
    velocity = Math.max(-72, Math.min(72, velocity + direction * impulse * 16));
    page.classList.add("is-rubber-banding");

    if (!animationFrame) {
      previousTime = performance.now();
      animationFrame = window.requestAnimationFrame(render);
    }
  };

  const isNestedScroll = (event) => {
    for (const element of event.composedPath()) {
      if (element === document.scrollingElement) {
        break;
      }
      if (!(element instanceof Element)) {
        continue;
      }

      const maxScroll = element.scrollHeight - element.clientHeight;
      if (maxScroll <= 1) {
        continue;
      }
      const style = window.getComputedStyle(element);
      if (!/^(auto|scroll|overlay)$/.test(style.overflowY)) {
        continue;
      }
      if (
        (event.deltaY < 0 && element.scrollTop > 1) ||
        (event.deltaY > 0 && element.scrollTop < maxScroll - 1) ||
        /^(contain|none)$/.test(style.overscrollBehaviorY)
      ) {
        return true;
      }
    }
    return false;
  };

  const onWheel = (event) => {
    if (
      reducedMotion.matches || event.defaultPrevented || event.ctrlKey || event.shiftKey ||
      !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY) || isNestedScroll(event)
    ) {
      return;
    }

    const scrollingElement = document.scrollingElement;
    if (!scrollingElement) {
      return;
    }
    const maxScroll = Math.max(0, scrollingElement.scrollHeight - scrollingElement.clientHeight);
    let delta = event.deltaY;
    if (event.deltaMode === 1) {
      delta *= parseFloat(window.getComputedStyle(page).lineHeight) || 20;
    } else if (event.deltaMode === 2) {
      delta *= window.innerHeight;
    }

    if (delta < 0 && scrollingElement.scrollTop <= 1) {
      push(1, delta);
    } else if (delta > 0 && scrollingElement.scrollTop >= maxScroll - 1) {
      push(-1, delta);
    }
  };

  const start = () => {
    window.addEventListener("wheel", onWheel, { passive: true });
    reducedMotion.addEventListener("change", reset);
  };

  window.addEventListener("pagehide", () => {
    reset();
    window.removeEventListener("wheel", onWheel);
    reducedMotion.removeEventListener("change", reset);
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      start();
    }
  });

  start();
})();
