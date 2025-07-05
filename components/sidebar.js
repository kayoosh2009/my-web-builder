import { undo, redo } from './canvas.js';

export function setupToolbar() {
  document.getElementById('btn-undo').onclick = undo;
  document.getElementById('btn-redo').onclick = redo;

  document.getElementById('btn-download').onclick = () => {
    const html = document.documentElement.outerHTML;
    const css = document.querySelector('style')?.textContent || '';

    const zip = new JSZip();
    zip.file("index.html", html);
    zip.file("style.css", css);

    zip.generateAsync({ type: 'blob' }).then(content => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = "site.zip";
      a.click();
    });
  };

  const preview = document.getElementById('preview-mode');
  preview.onchange = (e) => {
    if (e.target.value === 'mobile') {
      document.body.classList.add('mobile-preview');
    } else {
      document.body.classList.remove('mobile-preview');
    }
  };
}
