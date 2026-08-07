import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './routes/index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import ErrorBoundary from './component/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>

)
