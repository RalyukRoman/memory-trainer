import { StyleSheet, View, Text } from 'react-native';

import { styles as typography } from '../styles/typography';
import { SPACING }              from '../constants/tokens';

export function GameScoreBoard({
  score, level, highScore, theme
}) {
  const textColor = { color: theme.text };

  return (
    <View style={styles.statsContainer}>
      <Text style={[typography.small, textColor]}>
        Current Score: {score}
      </Text>

      <Text style={[typography.small, textColor]}>
        Level: {level}
      </Text>

      <Text style={[typography.smallBold, textColor]}>
        Best Score: {highScore}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    alignItems: 'center',
    marginTop: SPACING.five,
    gap: SPACING.one,
  },
});