import { View }     from 'react-native';
import { useTheme } from 'expo-router';

export default function ThemedView({
  variant = 'default',
  style,
  children,
  ...props
}) {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'element':
        return theme.colors.backgroundElement;
      case 'selected':
        return theme.colors.backgroundSelected;
      default:
        return theme.colors.background;
    }
  };

  return (
    <View
      style={[
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}