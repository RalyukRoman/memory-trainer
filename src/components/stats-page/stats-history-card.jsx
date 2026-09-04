import { StyleSheet, View, FlatList } from 'react-native';
import { useTheme }                   from 'expo-router';

import ThemedText       from '../ui/themed-text';
import ThemedView       from '../ui/themed-view';
import StatsHistoryItem from './stats-history-item';

import { SPACING, BORDER_RADIUS } from '../../constants/tokens';

export default function StatsHistoryCard({ history }) {
  const theme = useTheme();

  const renderItem = ({ item }) => (
    <StatsHistoryItem item={item} />
  );

  const renderSeparator = () => (
    <View
      style={[
        styles.separator,
        { backgroundColor: theme.colors.border },
      ]}
    />
  );

  return (
    <ThemedView variant="element" style={styles.card}>
      <ThemedText variant="header" style={styles.title}>
        GAME HISTORY
      </ThemedText>

      {history.length === 0 ? (
        <ThemedText
          variant="body"
          colorVariant="secondary"
          style={styles.emptyText}
        >
          No games played yet.
        </ThemedText>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          nestedScrollEnabled={true}
          style={styles.list}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 320,
    maxHeight: 320,
    padding: SPACING.four,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.two,
  },
  title: {
    marginBottom: SPACING.one,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: SPACING.three,
  },
  list: {
    width: '100%',
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: SPACING.one,
  },
});