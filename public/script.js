(() => {
  const intro = document.querySelector("[data-intro-screen]");
  const trigger = document.querySelector("[data-intro-trigger]");
  const wordmark = document.querySelector("[data-intro-wordmark]");
  const name = document.querySelector("[data-intro-name]");
  const content = document.querySelector("[data-site-content]");

  if (!intro || !trigger || !wordmark || !name || !content) {
    return;
  }

  const fullName = "Kevin Kiprotich";
  const introStorageKey = "introSeenIOSCaretV2";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ready = false;
  let entering = false;

  const hasSeenIntro = (() => {
    try {
      return window.sessionStorage.getItem(introStorageKey) === "true";
    } catch {
      return false;
    }
  })();

  content.setAttribute("aria-hidden", "true");

  const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

  const finish = (focusHeader = false) => {
    try {
      window.sessionStorage.setItem(introStorageKey, "true");
    } catch {
      // The intro still works when browser storage is unavailable.
    }

    intro.hidden = true;
    content.classList.remove("is-entering");

    if (focusHeader) {
      content.querySelector(".site-name")?.focus({ preventScroll: true });
    }
  };

  const revealSite = async (event) => {
    if (!ready || entering) {
      return;
    }

    const focusHeader = event?.type === "keydown";
    entering = true;
    trigger.disabled = true;
    trigger.setAttribute("aria-expanded", "true");
    trigger.removeEventListener("click", revealSite);
    window.removeEventListener("pointermove", revealSite);
    window.removeEventListener("pointerdown", revealSite);
    window.removeEventListener("keydown", revealSite);

    content.removeAttribute("aria-hidden");
    content.classList.add("is-visible", "is-entering");
    document.body.classList.add("site-entered");

    if (reducedMotion) {
      finish(focusHeader);
      return;
    }

    intro.classList.add("is-docking");
    wordmark.classList.add("is-docked");
    await wait(750);
    finish(focusHeader);
  };

  const makeReady = () => {
    ready = true;
    intro.classList.add("is-ready");
    trigger.setAttribute(
      "aria-label",
      "Kevin Kiprotich. Move the pointer, tap, or press a key to open the website."
    );
    trigger.addEventListener("click", revealSite, { once: true });
    window.addEventListener("pointermove", revealSite, { once: true, passive: true });
    window.addEventListener("pointerdown", revealSite, { once: true, passive: true });
    window.addEventListener("keydown", revealSite, { once: true });
  };

  const runIntro = async () => {
    if (hasSeenIntro) {
      intro.hidden = true;
      content.removeAttribute("aria-hidden");
      content.classList.add("is-visible");
      document.body.classList.add("site-entered");
      return;
    }

    if (reducedMotion) {
      name.textContent = fullName;
      wordmark.classList.remove("is-typing");
      makeReady();
      return;
    }

    wordmark.classList.add("is-typing");
    await wait(700);

    for (const character of fullName) {
      name.textContent += character;
      await wait(character === " " ? 150 : 85);
    }

    wordmark.classList.remove("is-typing");
    await wait(350);
    makeReady();
  };

  runIntro();
})();
