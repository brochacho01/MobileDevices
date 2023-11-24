import { useContext } from 'react';
import { BackgroundContext } from './../context/Background';

export const useCustomBackground = () => {
  const context = useContext(BackgroundContext);

  return {
    background: context.background,
    setBackground: context.setBackground,
    loading: context.loading,
  };
};