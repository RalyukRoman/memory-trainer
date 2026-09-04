import { StyleSheet, View } from 'react-native';
import ThemedText           from '../ui/themed-text';
import { SPACING }          from '../../constants/tokens';

export default function StatsScoreItem({ item }) {
  return (
    <View style={styles.container}>
      <ThemedText variant="body">{item.label}:</ThemedText>
      <ThemedText variant="monoValue">{item.score}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: SPACING.one,
    paddingRight: SPACING.three,
  },
});