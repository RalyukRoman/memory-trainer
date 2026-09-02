import '@/global.css';
import {Platform} from "react-native";

export const FONTS = Platform.select({
  ios: {
    SANS: 'system-ui',
    SERIF: 'ui-serif',
    ROUNDED: 'ui-rounded',
    MONO: 'ui-monospace',
  },
  default: {
    SANS: 'normal',
    SERIF: 'serif',
    ROUNDED: 'normal',
    MONO: 'monospace',
  },
  web: {
    SANS: 'var(--font-display)',
    SERIF: 'var(--font-serif)',
    ROUNDED: 'var(--font-rounded)',
    MONO: 'var(--font-mono)',
  },
});