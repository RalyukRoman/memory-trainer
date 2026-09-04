import { StyleSheet, View } from 'react-native';
import { useTheme }         from 'expo-router';

import StatsScoreItem from './stats-score-item';
import { SPACING }    from '../../constants/tokens';

export default function StatsScoreList({ data }) {
  const theme = useTheme();

  return (
    <View style={styles.list}>
      {data.map((item, index) => (
        <View key={item.difficulty}>
          <StatsScoreItem item={item} />

          {index < data.length - 1 && (
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.colors.border },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: SPACING.two,
  },
});