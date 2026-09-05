import { StyleSheet, View, Pressable } from 'react-native';
import { Link, useTheme }              from 'expo-router';
import { Ionicons }                    from '@expo/vector-icons';
import { SPACING }                     from '../../constants/tokens';

export default function GameTopBar() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Link href="/settings" asChild>
        <Pressable style={styles.button}>
          <Ionicons
            name="settings-outline"
            size={32}
            color={theme.colors.text}
          />
        </Pressable>
      </Link>

      <Link href="/stats" asChild>
        <Pressable style={styles.button}>
          <Ionicons
            name="bar-chart-outline"
            size={32}
            color={theme.colors.text}
          />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.two,
    paddingHorizontal: SPACING.four,
  },
  button: {
    padding: SPACING.two,
  },
});