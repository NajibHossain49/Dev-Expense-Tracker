import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DevExpenseTracker from './DevExpenseTracker.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DevExpenseTracker />
  </StrictMode>,
)
