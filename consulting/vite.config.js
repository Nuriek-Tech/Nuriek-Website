import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Edits can arrive from outside the OS file watcher (synced folders); poll so they always show up.
    watch: { usePolling: true, interval: 500 },
  },
});
