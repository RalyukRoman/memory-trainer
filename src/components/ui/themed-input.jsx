import { StyleSheet, TextInput } from 'react-native';

import { useTheme } from '../../hooks/use-theme';

import { Fonts }                  from '../../constants/fonts';
import { BORDER_RADIUS, SPACING } from '../../constants/tokens';

export default function ThemedInput({
  style,
  ...props
}) {
  const theme = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          color: theme.text,
          backgroundColor: theme.background,
          borderColor: theme.textSecondary,
        },
        style,
      ]}
      placeholderTextColor={theme.textSecondary}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 48,
    paddingHorizontal: SPACING.three,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    fontFamily: Fonts.mono,
    fontSize: 18,
    letterSpacing: 4,
    textAlign: 'center',
  },
});