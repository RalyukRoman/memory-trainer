import { StyleSheet, View, Pressable } from 'react-native';
import { useTheme }                    from 'expo-router';
import { SPACING, BORDER_RADIUS }      from '../../constants/tokens';

import ThemedText from '../ui/themed-text';
import ThemedView from '../ui/themed-view';

export default function SettingsSelector({
  title, options, selectedValue, onSelect,
}) {
  const theme = useTheme();

  const items = Array.isArray(options)
    ? options.map((opt) => ({ key: opt, label: opt }))
    : Object.entries(options).map(([key, label]) => ({ key, label }));

  return (
    <ThemedView
      variant="element"
      style={styles.card}
    >
      <ThemedText variant="bodyBold">
        {title}
      </ThemedText>

      <View style={styles.control}>
        {items.map(({ key, label }) => {
          const isSelected = selectedValue === key;

          return (
            <Pressable
              key={key}
              style={[
                styles.button,
                isSelected && { backgroundColor: theme.colors.text },
              ]}
              onPress={() => onSelect(key)}
            >
              <ThemedText
                variant="captionBold"
                style={
                  isSelected
                    ? { color: theme.colors.background }
                    : undefined
                }
              >
                {label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.three,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.two,
  },
  control: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgb(150 150 150 / 0.3)',
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
});