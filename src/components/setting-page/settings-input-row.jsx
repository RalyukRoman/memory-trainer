import { StyleSheet, View } from 'react-native';

import ThemedText  from '../ui/themed-text';
import ThemedInput from '../ui/themed-input';

import { SPACING } from '../../constants/tokens';

export default function SettingsInputRow({
  label, value, onChangeText,
  keyboardType = 'number-pad',
  editable = true,
}) {
  return (
    <View style={styles.row}>
      <ThemedText
        variant="caption"
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
    width: 80,
    height: 41,
    paddingHorizontal: SPACING.two,
  },
});