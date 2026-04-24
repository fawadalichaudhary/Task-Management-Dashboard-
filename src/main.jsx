import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { AppProvider } from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <AppProvider>
          <App />
        </AppProvider>
      </DndProvider>
    </BrowserRouter>
  </StrictMode>,
)
