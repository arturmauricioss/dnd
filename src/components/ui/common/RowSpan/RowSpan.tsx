import Box from '@components/ui/basic/Box/Box';
import './RowSpan.css';

interface SpanConfig {
  content: string;
  className?: string;
}

interface RowSpanProps {
  main: string;
  rightSpans?: SpanConfig[];
}

export default function RowSpan({ main, rightSpans = [] }: RowSpanProps) {
  return (
    <Box className="row-span">
      <span className="row-span-main">{main}</span>
      {rightSpans.length > 0 && (
        <Box className="row-span-right">
          {rightSpans.map((span, index) => (
            <span
              key={index}
              className={`row-span-item ${span.className || ''}`}
            >
              {span.content}
            </span>
          ))}
        </Box>
      )}
    </Box>
  );
}
