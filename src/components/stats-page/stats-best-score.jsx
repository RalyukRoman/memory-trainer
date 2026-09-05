import { StyleSheet, View } from 'react-native';
import { useTheme }         from 'expo-router';
import { SPACING }          from '../../constants/tokens';

import ThemedText from '../ui/themed-text';

export default function StatsBestScore({ bestScore }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.divider,
          { backgroundColor: theme.colors.border },
        ]}
      />

      <View style={styles.row}>
        <ThemedText variant="monoValue">
          BEST SCORE:
        </ThemedText>

        <ThemedText
          variant="monoDisplay"
          style={styles.value}
        >
          {bestScore}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingRight: SPACING.two,
    marginTop: SPACING.one,
    gap: SPACING.three,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.one,
  },
  value: {
    fontSize: 24,
  },
});