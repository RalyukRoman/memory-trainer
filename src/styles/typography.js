import { StyleSheet } from "react-native";
import { FONTS }      from "../constants/fonts";

export const styles = StyleSheet.create({
  small: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: 'normal',
  },
  smallBold: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: 'bold',
  },
  default: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: 'normal',
  },
  header: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 48,
    fontWeight: 'semibold',
  },
  subtitle: {
    fontFamily: FONTS.serif,
    fontSize: 32,
    fontWeight: 'semibold',
  },
  monoDisplay: {
    fontFamily: FONTS.mono,
    fontSize: 24,
    fontWeight: 'bold',
  },
  monoInput: {
    fontFamily: FONTS.mono,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    fontFamily: FONTS.sans,
    fontSize: 18,
    fontWeight: 'bold',
  },
});