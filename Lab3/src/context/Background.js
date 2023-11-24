import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Backgrounds = ['day', 'night'];

const BackgroundContext = createContext({
  background: 'day',
  // theme: 'dark',
  setBackground: () => {},
  loading: true,
});

const BackgroundProvider = ({ children }) => {
  const [background, setBackground] = useState('day');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('@user_preferred_background')
      .then((storedBackground) => {
        if (storedBackground) {
          setBackground(storedBackground);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@user_preferred_background', background);
  }, [background]);

  return (
    <BackgroundContext.Provider value={{ background, setBackground, loading }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export { BackgroundContext, BackgroundProvider, Backgrounds };