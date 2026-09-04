import { StyleSheet, Pressable } from 'react-native';
import { Ionicons }              from '@expo/vector-icons';
import { useTheme }              from 'expo-router';

import { SPACING } from '../../constants/tokens';

export default function StatsResetButton({ onPress }) {
  const theme = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Ionicons
        name="trash-outline"
        size={32}
        color={theme.colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: SPACING.one,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});