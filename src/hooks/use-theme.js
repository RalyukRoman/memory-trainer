import { useTheme as useNavTheme } from '@react-navigation/native';

export function useTheme() {
  const theme = useNavTheme();

  const select = (lightValue, darkValue) => (
    theme.dark ? darkValue : lightValue
  )

  return {
    ...theme.colors,
    isDark: theme.dark,
    select: select,
  };
}