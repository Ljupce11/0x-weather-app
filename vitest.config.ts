import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Allows you to use globals like describe, it, etc.
    environment: 'jsdom', // Use jsdom for testing React components
    setupFiles: './setupTests.ts', // Optional setup file for custom configurations
  },
});