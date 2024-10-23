import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
