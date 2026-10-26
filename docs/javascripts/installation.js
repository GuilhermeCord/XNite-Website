/* Progressive enhancement: image links still work when JavaScript is disabled. */
(() => {
  "use strict";
  if (window.xniteGuideImages) return;
  window.xniteGuideImages = true;
  let dialog;
  let opener;

  function createDialog() {
    dialog = document.createElement("dialog");
    dialog.className = "xn-guide-lightbox";
    dialog.setAttribute("aria-labelledby", "xn-guide-image-title");
    const bar = document.createElement("div");
    bar.className = "xn-guide-lightbox__bar";
    const title = document.createElement("span");
    title.id = "xn-guide-image-title";
    const close = document.createElement("button");
    close.type = "button";
    close.addEventListener("click", () => dialog.close());
    const image = document.createElement("img");
    bar.append(title, close);
    dialog.append(bar, image);
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      image.removeAttribute("src");
      if (opener && opener.isConnected) opener.focus();
      opener = null;
    });
    document.body.append(dialog);
  }

  document.addEventListener("click", event => {
    const link = event.target.closest && event.target.closest("a[data-guide-image]");
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
    event.preventDefault();
    if (!dialog) createDialog();
    opener = link;
    const thumbnail = link.querySelector("img");
    dialog.querySelector("#xn-guide-image-title").textContent = thumbnail.alt;
    const close = dialog.querySelector("button");
    close.textContent = link.dataset.closeLabel;
    close.setAttribute("aria-label", link.dataset.closeLabel);
    const image = dialog.querySelector("img");
    image.alt = thumbnail.alt;
    image.src = link.href;
    dialog.showModal();
    close.focus();
  });

  // Material's instant navigation replaces page content without reloading scripts.
  if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
      if (dialog && dialog.open) dialog.close();
    });
  }
})();
