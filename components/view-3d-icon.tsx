import { cn } from "@/lib/utils"

interface View3dIconProps {
  className?: string
}

export function View3dIcon({ className }: View3dIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-6 h-6", className)}
    >
      <path d="M12 3v18" />
      <rect x="4" y="7" width="16" height="10" rx="2" />
      <path d="m4 11 16 3" />
      <path d="m4 15 16-3" />
    </svg>
  )
}
