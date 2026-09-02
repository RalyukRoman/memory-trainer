import {StyleSheet, Text} from 'react-native';

import {FONTS}    from '../constants/fonts';
import {useTheme} from '../hooks/use-theme';

export function ThemedText({
  style,
  type = 'default',
  themeColor,
  ...rest
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
    fontFamily: FONTS.SANS,
    fontSize: 14,
    fontWeight: 'normal',
  },
  smallBold: {
    fontFamily: FONTS.SANS,
    fontSize: 14,
    fontWeight: 'bold',
  },
  default: {
    fontFamily: FONTS.SANS,
    fontSize: 16,
    fontWeight: 'normal',
  },
  title: {
    fontFamily: FONTS.SERIF,
    fontSize: 48,
    fontWeight: 'semibold',
  },
  subtitle: {
    fontFamily: FONTS.SERIF,
    fontSize: 32,
    fontWeight: 'semibold',
  },
});
