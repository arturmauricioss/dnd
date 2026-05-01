import { useState } from 'react'
import './Tooltip.css'

export default function Tooltip({ children, text, position = 'top' }) {
  const [show, setShow] = useState(false)

  return (
    <div 
      className="tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && text && (
        <div className={`tooltip tooltip-${position}`}>
          {text}
        </div>
      )}
    </div>
  )
}