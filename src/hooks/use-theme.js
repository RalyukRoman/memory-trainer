import { COLORS } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();

  const theme = scheme === 'dark'
    ? 'DARK'
    : 'LIGHT';

  return COLORS[theme];
}
