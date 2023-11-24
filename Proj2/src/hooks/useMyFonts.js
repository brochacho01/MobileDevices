import Fonts from '../constants/Fonts';
import { useCustomFont } from './useCustomFont';

export const useMyFonts = () => {
  const customFonts = useCustomFont();

  return {
    font: customFonts.font,
    curFont: Fonts[customFonts.font],
  };
}