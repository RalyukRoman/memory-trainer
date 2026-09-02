import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { GAME_PHASES }            from '../constants/game-values';
import { FONTS }                  from '../constants/fonts';
import { SPACING, BORDER_RADIUS } from '../constants/tokens';

export function GameNumberDisplay({
   phase, digits, theme,
}) {
  const canShowNumbers =
    phase === GAME_PHASES.SHOW ||
    phase === GAME_PHASES.RESULT;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {digits.map((digit, index) => (
          <View
            key={index}
            style={[
              styles.digitBox,
              {
                backgroundColor: theme.backgroundSelected,
                borderColor: !canShowNumbers
                  ? theme.textSecondary
                  : 'transparent',
              },
            ]}
          >
            <Text
              style={[
                styles.digitText,
                { color: theme.text },
              ]}
            >
              {canShowNumbers ? digit : '?'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: SPACING.two,
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.two,
    paddingVertical: SPACING.two,
    paddingHorizontal: SPACING.one,
  },
  digitBox: {
    width: 42,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
  },
  digitText: {
    fontFamily: FONTS.mono,
    fontSize: 24,
    fontWeight: 'bold',
  },
});