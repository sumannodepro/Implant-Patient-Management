import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './aws-exports.js';

// Polyfills for Buffer and process
import { Buffer } from 'buffer';
import process from 'process';

// Manually define global if not already set
if (typeof global === 'undefined') {
  global = globalThis; // Assign globalThis to global
}

global.Buffer = Buffer;
global.process = process;

// Configure AWS Amplify
Amplify.configure(amplifyconfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
