import { StyleSheet, View } from 'react-native';
import { SPACING }          from '../constants/tokens';
import ThemedText           from "./ui/themed-text";

export default function GameScoreBoard({
  score, level, highScore
}) {
  return (
    <View style={styles.statsContainer}>
      <ThemedText variant="small">    Current Score: {score} </ThemedText>
      <ThemedText variant="small">    Level: {level}         </ThemedText>
      <ThemedText variant="smallBold">Best Score: {highScore}</ThemedText>
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