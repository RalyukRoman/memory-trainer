import { StyleSheet, View } from 'react-native';

import ThemedText from '../ui/themed-text';
import ThemedView from '../ui/themed-view';

import { SPACING, BORDER_RADIUS } from '../../constants/tokens';

export default function GameScoreBoard({
  score, level, highScore
}) {
  return (
    <ThemedView
      variant="element"
      style={styles.container}
    >
      <View style={styles.box}>
        <ThemedText
          variant="body"
          colorVariant="secondary"
        >
          LEVEL
        </ThemedText>

        <ThemedText
          variant="monoDisplay"
          style={styles.value}
        >
          {level}
        </ThemedText>
      </View>

      <View style={styles.divider} />

      <View style={styles.box}>
        <ThemedText
          variant="body"
          colorVariant="secondary"
        >
          SCORE
        </ThemedText>

        <ThemedText
          variant="monoDisplay"
          style={styles.value}
        >
          {score}
        </ThemedText>
      </View>

      <View style={styles.divider} />

      <View style={styles.box}>
        <ThemedText
          variant="body"
          colorVariant="secondary"
        >
          BEST
        </ThemedText>

        <ThemedText
          variant="monoDisplay"
          style={styles.value}
        >
          {highScore}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 320,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SPACING.four,
    paddingVertical: SPACING.three,
    paddingHorizontal: SPACING.two,
    borderRadius: BORDER_RADIUS.lg,
  },
  box: {
    alignItems: 'center',
    gap: SPACING.one,
  },
  value: {
    fontSize: 22,
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: '#919191',
  },
});