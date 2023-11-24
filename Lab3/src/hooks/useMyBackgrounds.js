import Backgrounds from '../constants/Backgrounds';
import { useCustomBackground } from './useCustomBackground';

export const useMyBackgrounds = () => {
  const customBackgrounds = useCustomBackground();

  return {
    background: customBackgrounds.background,
    curBackground: Backgrounds[customBackgrounds.background],
  };
}