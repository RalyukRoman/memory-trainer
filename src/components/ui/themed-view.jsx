import { View }     from 'react-native';
import { useTheme } from '../../hooks/use-theme';

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
        return theme.backgroundElement;
      case 'selected':
        return theme.backgroundSelected;
      default:
        return theme.background;
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