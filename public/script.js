(() => {
  const root = document.documentElement;
  const intro = document.querySelector("[data-intro-screen]");
  const trigger = document.querySelector("[data-intro-trigger]");
  const wordmark = document.querySelector("[data-intro-wordmark]");
  const name = document.querySelector("[data-intro-name]");
  const content = document.querySelector("[data-site-content]");
  const destination = document.querySelector("[data-site-name]");

  if (!intro || !trigger || !wordmark || !name || !content || !destination) {
    root.classList.remove("has-js");
    return;
  }

  root.setAttribute("data-intro-initialized", "");
  const fullName = destination.textContent.trim();
  const storageKey = "introSeenIOSCaretV2";
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let ready = false;
  let entering = false;
  let finished = false;
  let focusHeader = false;
  let hasSeenIntro = false;
  let finishTimer;

  try {
    hasSeenIntro = window.sessionStorage.getItem(storageKey) === "true";
  } catch {
    // Browsing without storage still supports the intro.
  }

  const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

  const removeEntryListeners = (keepKeyboard = false) => {
    trigger.removeEventListener("click", revealSite);
    window.removeEventListener("pointermove", onPointerMove);
    if (!keepKeyboard) window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("wheel", onWheel);
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    entering = true;
    window.clearTimeout(finishTimer);
    removeEntryListeners();
    window.removeEventListener("resize", finish);
    motionPreference.removeEventListener("change", onMotionChange);

    try {
      window.sessionStorage.setItem(storageKey, "true");
    } catch {
      // The rest of the site never depends on storage being available.
    }

    intro.hidden = true;
    content.inert = false;
    content.removeAttribute("aria-hidden");
    content.classList.add("is-visible");
    content.classList.remove("is-entering");
    document.body.classList.add("site-entered");
    if (focusHeader) destination.closest("a").focus({ preventScroll: true });
  };

  const measureDestination = () => {
    const bounds = destination.getBoundingClientRect();
    const style = window.getComputedStyle(destination);
    wordmark.style.setProperty("--dock-top", bounds.top + "px");
    wordmark.style.setProperty("--dock-left", bounds.left + "px");
    wordmark.style.setProperty("--dock-size", style.fontSize);
    wordmark.style.setProperty("--dock-weight", style.fontWeight);
    wordmark.style.setProperty("--dock-spacing", style.letterSpacing === "normal" ? "0px" : style.letterSpacing);
    wordmark.style.setProperty("--dock-line-height", style.lineHeight);
  };

  function revealSite(event) {
    if (entering) return;
    entering = true;
    focusHeader = event?.type === "keydown" || (event?.detail === 0 && event?.type === "click");
    name.textContent = fullName;
    wordmark.classList.remove("is-typing");
    trigger.setAttribute("aria-expanded", "true");
    removeEntryListeners(true);

    // Keyboard entry is immediate so focus never spends a transition offscreen.
    if (motionPreference.matches || focusHeader) {
      finish();
      return;
    }

    content.classList.add("is-visible", "is-entering");
    document.body.classList.add("site-entered");
    measureDestination();
    window.addEventListener("resize", finish, { passive: true });
    intro.classList.add("is-docking");
    wordmark.classList.add("is-docked");
    finishTimer = window.setTimeout(finish, 660);
  }

  function onKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (!["Tab", "Enter", " ", "Escape"].includes(event.key)) return;
    event.preventDefault();
    if (entering) {
      focusHeader = true;
      finish();
      return;
    }
    revealSite(event);
  }

  function onPointerMove(event) {
    if (ready && event.pointerType !== "touch") revealSite(event);
  }

  function onWheel(event) {
    if (ready && !event.ctrlKey && Math.abs(event.deltaY) > Math.abs(event.deltaX)) revealSite(event);
  }

  function onMotionChange(event) {
    if (event.matches) finish();
  }

  const runIntro = async () => {
    // A slow or failed intro must never hide an already usable page.
    if (hasSeenIntro || motionPreference.matches || !root.classList.contains("has-js")) {
      finish();
      return;
    }

    content.inert = true;
    content.setAttribute("aria-hidden", "true");
    trigger.addEventListener("click", revealSite);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    motionPreference.addEventListener("change", onMotionChange);

    await wait(500);
    if (entering) return;
    wordmark.classList.add("is-typing");
    for (const character of fullName) {
      if (entering) return;
      name.textContent += character;
      await wait(character === " " ? 150 : 85);
    }
    wordmark.classList.remove("is-typing");
    await wait(250);
    if (entering) return;
    ready = true;
    trigger.setAttribute("aria-label", "Kevin Kiprotich. Move the pointer, tap, or press Enter to open the website.");
  };

  window.addEventListener("pagehide", finish, { once: true });
  runIntro().catch(finish);
})();
