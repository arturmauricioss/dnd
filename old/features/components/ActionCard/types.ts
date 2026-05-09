export interface IconProps {
  className?: string
}

export interface ActionCardProps {
  icon: (props: IconProps) => React.ReactNode
  label: string
  description?: string
  onClick?: () => void
  className?: string
}