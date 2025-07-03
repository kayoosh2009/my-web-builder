import { setupSidebar } from '../components/sidebar.js';
import { setupCanvas } from '../components/canvas.js';
import { setupSettingsPanel } from '../components/settingsPanel.js';

document.addEventListener('DOMContentLoaded', () => {
  setupSidebar();
  setupCanvas();
  setupSettingsPanel();
});

