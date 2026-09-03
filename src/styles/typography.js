import { StyleSheet }   from "react-native";
import { FONTS_FAMILY } from "../constants/fonts";

export const styles = StyleSheet.create({
  small: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 14,
    fontWeight: 'normal',
  },
  smallBold: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 14,
    fontWeight: 'bold',
  },
  default: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 16,
    fontWeight: 'normal',
  },
  header: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  title: {
    fontFamily: FONTS_FAMILY.serif,
    fontSize: 48,
    fontWeight: 'semibold',
  },
  subtitle: {
    fontFamily: FONTS_FAMILY.serif,
    fontSize: 32,
    fontWeight: 'semibold',
  },
  monoDisplay: {
    fontFamily: FONTS_FAMILY.mono,
    fontSize: 24,
    fontWeight: 'bold',
  },
  monoInput: {
    fontFamily: FONTS_FAMILY.mono,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 18,
    fontWeight: 'bold',
  },
});