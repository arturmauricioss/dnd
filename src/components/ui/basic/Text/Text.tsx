interface TextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Text({
  children,
  size = 'md',
  className = '',
}: TextProps) {
  return <span className={`text text-${size} ${className}`}>{children}</span>;
}
