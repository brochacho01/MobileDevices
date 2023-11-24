import Themes from '../constants/Colors';
import { useCustomTheme } from './useCustomTheme';

export const useThemeColors = () => {
  const customTheme = useCustomTheme();

  return {
    theme: customTheme.theme,
    colors: Themes[customTheme.theme],
  };
}