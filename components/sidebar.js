export function setupSidebar() {
  const sidebar = document.getElementById("sidebar");

  const buttons = [
    { label: "Текст", action: () => addElement("text") },
    { label: "Картинка", action: () => addElement("image") },
    { label: "Рамка", action: () => addElement("border") }
  ];

  buttons.forEach(btn => {
    const button = document.createElement("button");
    button.textContent = btn.label;
    button.style.display = "block";
    button.style.margin = "10px 0";
    button.onclick = btn.action;
    sidebar.appendChild(button);
  });
}

function addElement(type) {
  const canvas = document.getElementById("canvas");
  const el = document.createElement("div");
  el.contentEditable = true;
  el.style.border = "1px solid gray";
  el.style.padding = "10px";
  el.style.margin = "10px";

  if (type === "text") {
    el.textContent = "Новый текст";
  } else if (type === "image") {
    const img = document.createElement("img");
    img.src = "https://via.placeholder.com/150";
    img.alt = "Placeholder";
    img.style.maxWidth = "100%";
    el.appendChild(img);
  } else if (type === "border") {
    el.style.border = "3px dashed blue";
    el.textContent = "Блок с рамкой";
  }

  canvas.appendChild(el);
}
