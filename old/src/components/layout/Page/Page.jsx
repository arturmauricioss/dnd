import { useState } from 'react'
import './Page.css'

export default function Page({ children, title }) {
  return (
    <div className="page">
      {children}
    </div>
  )
}