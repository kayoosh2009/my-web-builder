let activeElement = null;

export function setupCanvas() {
  const canvas = document.getElementById("canvas");

  canvas.addEventListener("click", (e) => {
    if (e.target.closest("#canvas > div")) {
      setActiveElement(e.target.closest("#canvas > div"));
    } else {
      clearActiveElement();
    }
  });
}

function setActiveElement(el) {
  clearActiveElement();
  activeElement = el;
  el.classList.add("active");

  const event = new CustomEvent("elementSelected", {
    detail: el,
  });
  window.dispatchEvent(event);
}

function clearActiveElement() {
  if (activeElement) activeElement.classList.remove("active");
  activeElement = null;
  window.dispatchEvent(new Event("elementUnselected"));
}

