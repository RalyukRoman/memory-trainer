import { StyleSheet }   from "react-native";
import { FONTS_FAMILY } from "../constants/fonts";

export const typography = StyleSheet.create({
  caption: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 14,
    fontWeight: 'normal',
  },
  captionBold: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 14,
    fontWeight: 'bold',
  },
  body: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 16,
    fontWeight: 'normal',
  },
  bodyBold: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontFamily: FONTS_FAMILY.sans,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 3,
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
  monoValue: {
    fontFamily: FONTS_FAMILY.mono,
    fontSize: 20,
    fontWeight: 'bold',
  },
  monoDisplay: {
    fontFamily: FONTS_FAMILY.mono,
    fontSize: 32,
    fontWeight: 'bold',
  },
  monoInput: {
    fontFamily: FONTS_FAMILY.mono,
    fontSize: 18,
    textAlign: 'center',
  },
});