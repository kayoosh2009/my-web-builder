export function setupSidebar() {
  const sidebar = document.getElementById("sidebar");

  const title = document.createElement("h2");
  title.textContent = "Инструменты";
  sidebar.appendChild(title);

  const buttons = [
    { label: "Добавить текст", action: () => addBlock("text") },
    { label: "Добавить изображение", action: () => addBlock("image") },
    { label: "Добавить рамку", action: () => addBlock("border") }
  ];

  buttons.forEach(btn => {
    const button = document.createElement("button");
    button.textContent = btn.label;
    button.onclick = btn.action;
    sidebar.appendChild(button);
  });
}

function addBlock(type) {
  const canvas = document.getElementById("canvas");
  const block = document.createElement("div");
  block.contentEditable = true;
  block.style.border = "1px solid #999";
  block.style.padding = "10px";
  block.style.marginBottom = "10px";
  block.style.background = "#fff";

  if (type === "text") {
    block.textContent = "Введите текст...";
  } else if (type === "image") {
    const img = document.createElement("img");
    img.src = "https://via.placeholder.com/200x100";
    img.alt = "Картинка";
    img.style.maxWidth = "100%";
    block.innerHTML = "";
    block.appendChild(img);
  } else if (type === "border") {
    block.textContent = "Блок с рамкой";
    block.style.border = "3px dashed #007bff";
  }

  canvas.appendChild(block);
}
