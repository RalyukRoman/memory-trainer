import { StyleSheet, View } from 'react-native';
import { Link }             from 'expo-router';
import { SPACING }          from '../constants/tokens';
import ThemedText           from "./ui/themed-text";

export default function GameScoreBoard({
  score, level, highScore
}) {
  return (
    <View style={styles.container}>
      <ThemedText variant="small"> Current Score: {score} </ThemedText>
      <ThemedText variant="small"> Level: {level}         </ThemedText>

      <Link href="/stats" style={styles.link}>
        <ThemedText variant="smallBold">
          Best Score: {highScore} ➔
        </ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: SPACING.five,
    gap: SPACING.one,
  },
  link: {
    marginTop: SPACING.two,
    opacity: 0.8,
  },
});