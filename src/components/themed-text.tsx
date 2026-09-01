import { StyleSheet, Text, type TextProps } from 'react-native';

import { ThemeColor, Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ThemedText({
  style,
  type = 'default',
  themeColor,
  ...rest
}: TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle';
  themeColor?: ThemeColor;
}) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default'   && styles.default,
        type === 'title'     && styles.title,
        type === 'small'     && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle'  && styles.subtitle,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitle: {
    fontFamily: Fonts.serif,
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
});
