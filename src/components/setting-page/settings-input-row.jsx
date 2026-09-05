import { StyleSheet, View }       from 'react-native';
import { BORDER_RADIUS, SPACING } from '../../constants/tokens';

import ThemedText  from '../ui/themed-text';
import ThemedInput from '../ui/themed-input';

export default function SettingsInputRow({
  label, value, onChangeText,
  keyboardType = 'number-pad',
  editable = true,
}) {
  return (
    <View style={styles.row}>
      <ThemedText
        variant="body"
        style={styles.label}
      >
        {label}
      </ThemedText>

      <ThemedInput
        style={styles.input}
        keyboardType={keyboardType}
        editable={editable}
        value={String(value ?? '')}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.two,
  },
  label: {
    flex: 1,
  },
  input: {
    width: 68,
    height: 32,
    paddingHorizontal: SPACING.two,
    paddingVertical: 0,
    borderRadius: BORDER_RADIUS.xs,
    letterSpacing: -1,
  },
});