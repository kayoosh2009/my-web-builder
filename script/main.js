import { setupSidebar } from '../components/sidebar.js';
import { setupCanvas } from '../components/canvas.js';
import { setupSettingsPanel } from '../components/settingsPanel.js';
import { setupToolbar } from '../components/toolbar.js';

document.addEventListener('DOMContentLoaded', () => {
  setupSidebar();
  setupCanvas();
  setupSettingsPanel();
  setupToolbar();
});
