import { StyleSheet, FlatList, View } from 'react-native';
import { useTheme }                    from 'expo-router';

import StatsScoreItem from './stats-score-item';
import { SPACING }    from '../../constants/tokens';

export default function StatsScoreList({ data }) {
  const theme = useTheme();

  const renderItem = ({ item }) => <StatsScoreItem item={item} />;

  const renderSeparator = () => (
    <View
      style={[
        styles.separator,
        { backgroundColor: theme.colors.border },
      ]}
    />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.difficulty}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      scrollEnabled={false}
      style={styles.list}
    />
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