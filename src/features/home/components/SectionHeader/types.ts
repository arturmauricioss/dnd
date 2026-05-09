export interface IconProps {
  className?: string
}

export interface SectionHeaderProps {
  icon: (props: IconProps) => React.ReactNode
  children: React.ReactNode
  active?: boolean
  className?: string
}