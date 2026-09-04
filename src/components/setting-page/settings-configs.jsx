import { StyleSheet } from 'react-native';

import ThemedText      from '../ui/themed-text';
import ThemedView      from '../ui/themed-view';
import SettingsInputRow from './settings-input-row';

import { SPACING, BORDER_RADIUS } from '../../constants/tokens';

const CONFIGS_FIELDS = [
  { key: 'pointsPerLevel',      label: 'Points for 1 level',          keyboardType: 'number-pad' },
  { key: 'initialDigitCount',   label: 'Initial number of numbers',   keyboardType: 'number-pad' },
  { key: 'initialDuration',     label: 'Initial display (sec)',       keyboardType: 'numeric' },
  { key: 'levelsPerExtraDigit', label: 'Equals +1 digit',             keyboardType: 'number-pad' },
  { key: 'maxDigitCount',       label: 'Max. number of digits',       keyboardType: 'number-pad' },
  { key: 'minDuration',         label: 'Min. display duration (sec)', keyboardType: 'numeric' },
];

export default function SettingsConfigs({
  config,
  isCustom,
  onChangeConfig,
}) {
  return (
    <ThemedView
      variant="element"
      style={[
        styles.card,
        !isCustom && styles.disabledCard,
      ]}
    >
      <ThemedText
        variant="bodyBold"
        style={styles.cardTitle}
      >
        Characteristics
      </ThemedText>

      {CONFIGS_FIELDS.map(({
        key, label, keyboardType
      }) => (
        <SettingsInputRow
          key={key}
          label={`${label}:`}
          value={config[key]}
          keyboardType={keyboardType}
          editable={isCustom}
          onChangeText={(val) => onChangeConfig(key, val)}
        />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.three,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.two,
  },
  disabledCard: {
    opacity: 0.6,
  },
  cardTitle: {
    marginBottom: SPACING.one,
  },
});