import {StyleSheet} from "react-native";
import {FONTS} from "../constants/fonts";

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
});