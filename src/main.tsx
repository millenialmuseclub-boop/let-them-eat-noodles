import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { checkForOtaUpdate, markAppReady } from './lib/otaUpdater'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Fire-and-forget, after the app has already rendered — never blocks startup.
markAppReady()
checkForOtaUpdate()
