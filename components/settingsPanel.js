export function setupSettingsPanel() {
  const panel = document.getElementById("settings-panel");
  let currentElement = null;

  window.addEventListener("elementSelected", (e) => {
    currentElement = e.detail;
    panel.style.display = "block";
    renderPanel();
  });

  window.addEventListener("elementUnselected", () => {
    panel.style.display = "none";
    panel.innerHTML = "";
  });

  function renderPanel() {
    panel.innerHTML = "";

    const bgField = createInputField("Цвет фона", "color", currentElement.style.backgroundColor || "#ffffff", (val) => {
      currentElement.style.backgroundColor = val;
    });

    const fontSizeField = createInputField("Размер шрифта", "number", parseInt(currentElement.style.fontSize) || 16, (val) => {
      currentElement.style.fontSize = `${val}px`;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить блок";
    deleteBtn.style.marginTop = "10px";
    deleteBtn.onclick = () => {
      currentElement.remove();
      panel.style.display = "none";
    };

    panel.appendChild(bgField);
    panel.appendChild(fontSizeField);
    panel.appendChild(deleteBtn);
  }

  function createInputField(labelText, type, defaultValue, onChange) {
    const wrapper = document.createElement("div");
    wrapper.className = "settings-field";

    const label = document.createElement("label");
    label.textContent = labelText;
    const input = document.createElement("input");
    input.type = type;
    input.value = defaultValue;
    input.oninput = (e) => onChange(e.target.value);

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return wrapper;
  }
}
