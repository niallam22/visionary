import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
// combine and merge CSS class names. clsx handles conditional class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
