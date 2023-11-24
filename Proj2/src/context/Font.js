import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Fonts = ['inconsolata', 'inter', 'lora', 'spacemono'];

const FontContext = createContext({
  font: 'inconsolata',
  // theme: 'dark',
  setFont: () => {},
  loading: true,
});

const FontProvider = ({ children }) => {
  const [font, setFont] = useState('inconsolata');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('@user_preferred_font')
      .then((storedFont) => {
        if (storedFont) {
          setFont(storedFont);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@user_preferred_font', font);
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont, loading }}>
      {children}
    </FontContext.Provider>
  );
};

export { FontContext, FontProvider, Fonts };