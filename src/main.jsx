import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import About from './About.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div class="contentdiv">
      <h1 id="heading">TicketVerse</h1>
    </div>
    <div class="contentdiv1">
      <h2 id="desc">Your Front Row Seat to Every Adventure!</h2>
    </div>
    <About />
  </StrictMode>
)
