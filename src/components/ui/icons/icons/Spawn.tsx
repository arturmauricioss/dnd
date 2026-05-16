import type { IconProps } from '@components/ui/icons/types';

export default function Spawn({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q117 0 221 61.5T760-660q-50-61-120-96.5T480-720q-166 0-279 85.5T120-480q0 134 85.5 227T480 80q109 0 190-53.5T768-96q43 0 84.5-4.5T920-120q0-50-17-97t-51.5-87q-52-47-127-91.5T480-480q0 117 53 197.5T680-160q-75 45-143 61.5T480-80Z" />
    </svg>
  );
}
