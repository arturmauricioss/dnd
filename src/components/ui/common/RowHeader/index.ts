export interface IconProps {
  className?: string
}

export interface RowHeaderProps {
  icon: (props: IconProps) => React.ReactNode
  children: React.ReactNode
  active?: boolean
  className?: string
}