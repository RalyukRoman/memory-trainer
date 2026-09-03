import { Text }                 from 'react-native';
import { useTheme }             from '../../hooks/use-theme';
import { styles as typography } from '../../styles/typography';

export default function ThemedText({
  variant = 'default',
  colorVariant = 'primary',
  style,
  children,
  ...props
}) {
  const theme = useTheme();

  const getColor = () => {
    switch (colorVariant) {
      case 'secondary':
        return theme.textSecondary;
      case 'inverse':
        return theme.background;
      default:
        return theme.text;
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