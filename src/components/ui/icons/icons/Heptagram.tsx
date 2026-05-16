interface HeptagramProps {
  className?: string;
}

function getHeptagramPath(cx: number, cy: number, radius: number): string {
  const points = [];
  for (let i = 0; i < 7; i++) {
    const angle = (i * 360) / 7 - 90;
    const x = cx + radius * Math.cos((angle * Math.PI) / 180);
    const y = cy + radius * Math.sin((angle * Math.PI) / 180);
    points.push({ x, y });
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < 7; i++) {
    const nextIndex = (i * 3) % 7;
    path += ` L ${points[nextIndex].x} ${points[nextIndex].y}`;
  }
  path += ' Z';

  return path;
}

export default function Heptagram({ className }: HeptagramProps) {
  return (
    <svg className={className} viewBox="0 0 300 300">
      <path d={getHeptagramPath(150, 150, 140)} />
    </svg>
  );
}
