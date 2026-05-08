import type { PageProps } from '@types'
import './Page.css'

export default function Page({ children, className = '' }: PageProps) {
  return <div className={`page container ${className}`}>{children}</div>
}