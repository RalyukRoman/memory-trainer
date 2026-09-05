import { StyleSheet, View } from 'react-native';
import { useTheme }         from 'expo-router';
import { SPACING }          from '../../constants/tokens';

import ThemedText  from '../ui/themed-text';

export default function StatsHistoryItem({ item }) {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (item.status) {
      case 'COMPLETED':   return '#60b628';
      case 'INTERRUPTED': return '#e13b3b';

      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <ThemedText variant="bodyBold">
          {item.difficulty}
        </ThemedText>

        <ThemedText variant="caption">
          Level: {item.level}
        </ThemedText>
      </View>

      <View style={styles.rightColumn}>
        <ThemedText variant="monoValue">
          {item.score}
        </ThemedText>

        <ThemedText
          variant="caption"
          style={{ color: getStatusColor() }}
        >
          {item.status}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.one,
    marginRight: SPACING.three,
  },
  leftColumn: {
    alignSelf: 'flex-start',
    paddingTop: SPACING.one,
    gap: SPACING.one,
  },
  rightColumn: {
    alignItems: 'flex-end',
    gap: SPACING.half,
  },
});