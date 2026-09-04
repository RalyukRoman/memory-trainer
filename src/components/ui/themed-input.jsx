import { StyleSheet, TextInput } from 'react-native';
import { useTheme }              from 'expo-router';

import { FONTS_FAMILY }           from '../../constants/fonts';
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
          color: theme.colors.text,
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.textSecondary,
        },
        style,
      ]}
      placeholderTextColor={theme.colors.textSecondary}
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
    fontFamily: FONTS_FAMILY.mono,
    fontSize: 18,
    letterSpacing: 4,
    textAlign: 'center',
  },
});