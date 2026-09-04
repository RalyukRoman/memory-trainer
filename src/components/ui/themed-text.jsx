import { Text }       from 'react-native';
import { useTheme }   from 'expo-router';
import { typography } from '../../styles/typography';

export default function ThemedText({
  variant = 'body',
  colorVariant = 'primary',
  style,
  children,
  ...props
}) {
  const theme = useTheme();

  const getColor = () => {
    switch (colorVariant) {
      case 'secondary':
        return theme.colors.textSecondary;
      case 'inverse':
        return theme.colors.background;
      default:
        return theme.colors.text;
    }
  };

  return (
    <Text
      style={[
        typography[variant],
        { color: getColor() },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}