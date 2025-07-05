let selected = null;
let offsetX, offsetY;
let undoStack = [], redoStack = [];
let isResizing = false;

export function setupCanvas() {
  const canvas = document.getElementById('canvas');

  // Автозагрузка проекта
  const saved = localStorage.getItem('autosave');
  if (saved) canvas.innerHTML = saved;

  canvas.addEventListener('mousedown', e => {
    if (e.target.classList.contains('block')) {
      selected = e.target;

      if (e.offsetX > selected.clientWidth - 10 && e.offsetY > selected.clientHeight - 10) {
        isResizing = true;
      } else {
        const rect = selected.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      }
      selected.classList.add('active');
      saveState();
    } else {
      deselectAll();
    }
  });

  document.addEventListener('mousemove', e => {
    if (selected && isResizing) {
      selected.style.width = `${e.clientX - selected.offsetLeft}px`;
      selected.style.height = `${e.clientY - selected.offsetTop}px`;
    } else if (selected) {
      const grid = 20;
      const x = Math.round((e.clientX - offsetX) / grid) * grid;
      const y = Math.round((e.clientY - offsetY) / grid) * grid;
      selected.style.left = `${x}px`;
      selected.style.top = `${y}px`;
      updateGuides(selected);
    }
  });

  document.addEventListener('mouseup', () => {
    if (selected) {
      selected.classList.remove('active');
      selected = null;
      isResizing = false;
      clearGuides();
    }
  });

  canvas.addEventListener('click', e => {
    if (e.target.classList.contains('block')) {
      showSettings(e.target);
    } else {
      document.getElementById('settings-panel').style.display = 'none';
    }
  });

  // Двойной клик для редактирования текста
  canvas.addEventListener('dblclick', e => {
    if (e.target.classList.contains('block')) {
      const input = document.createElement('textarea');
      input.value = e.target.innerText;
      input.style.position = 'absolute';
      input.style.left = `${e.target.offsetLeft}px`;
      input.style.top = `${e.target.offsetTop}px`;
      input.style.width = `${e.target.offsetWidth}px`;
      input.style.height = `${e.target.offsetHeight}px`;
      input.style.zIndex = 999;
      document.body.appendChild(input);
      input.focus();

      input.onblur = () => {
        e.target.innerText = input.value;
        input.remove();
      };
    }
  });

  // Клавиша дублирования: Ctrl+D
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'd' && selected) {
      const clone = selected.cloneNode(true);
      clone.style.left = `${selected.offsetLeft + 20}px`;
      clone.style.top = `${selected.offsetTop + 20}px`;
      canvas.appendChild(clone);
    }
  });

  // Автосохранение каждые 3 секунды
  setInterval(() => {
    localStorage.setItem('autosave', canvas.innerHTML);
  }, 3000);
}

function deselectAll() {
  document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
}

function showSettings(el) {
  const panel = document.getElementById('settings-panel');
  panel.style.display = 'block';
  panel.innerHTML = '';

  const props = [
    { name: 'Фон', prop: 'backgroundColor' },
    { name: 'Шрифт', prop: 'fontFamily' },
    { name: 'Размер шрифта', prop: 'fontSize' },
    { name: 'Жирность', prop: 'fontWeight' },
    { name: 'Цвет текста', prop: 'color' },
    { name: 'Выравнивание текста', prop: 'textAlign' },
    { name: 'Отступ', prop: 'padding' },
    { name: 'Граница', prop: 'border' },
    { name: 'Скругление', prop: 'borderRadius' },
    { name: 'Тень блока', prop: 'boxShadow' },
    { name: 'Z-index', prop: 'zIndex' },
  ];

  props.forEach(({ name, prop }) => {
    const field = document.createElement('div');
    field.className = 'settings-field';
    const label = document.createElement('label');
    label.textContent = name;
    const input = document.createElement('input');
    input.value = el.style[prop] || '';
    input.oninput = () => el.style[prop] = input.value;
    field.appendChild(label);
    field.appendChild(input);
    panel.appendChild(field);
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Удалить';
  delBtn.onclick = () => el.remove();
  panel.appendChild(delBtn);
}

function saveState() {
  const canvas = document.getElementById('canvas');
  undoStack.push(canvas.innerHTML);
  redoStack = [];
}

export function undo() {
  const canvas = document.getElementById('canvas');
  if (undoStack.length) {
    redoStack.push(canvas.innerHTML);
    canvas.innerHTML = undoStack.pop();
  }
}

export function redo() {
  const canvas = document.getElementById('canvas');
  if (redoStack.length) {
    undoStack.push(canvas.innerHTML);
    canvas.innerHTML = redoStack.pop();
  }
}

function updateGuides(el) {
  clearGuides();
  const canvas = document.getElementById('canvas');
  const rect = el.getBoundingClientRect();

  const guideV = document.createElement('div');
  guideV.className = 'guide-line v';
  guideV.style.left = `${rect.left}px`;
  canvas.appendChild(guideV);

  const guideH = document.createElement('div');
  guideH.className = 'guide-line h';
  guideH.style.top = `${rect.top}px`;
  canvas.appendChild(guideH);
}

function clearGuides() {
  document.querySelectorAll('.guide-line').forEach(g => g.remove());
}
