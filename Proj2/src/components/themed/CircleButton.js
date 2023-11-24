import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext, Themes } from '../../context/Theme';
import { useCustomTheme } from '../../hooks/useCustomTheme';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useMyFonts } from '../../hooks/useMyFonts';
import { Text } from './Text';
import { View } from './Views';

const EmptyCircleButton = () => {
  const [isFilled1, setIsFilled1] = useState(true);
  const [isFilled2, setIsFilled2] = useState(false);
  const [anyFilled, setAnyFilled] = useState(false);

  const { theme, setTheme } = useCustomTheme();
  const { colors } = useThemeColors();
  const { curFont } = useMyFonts();

  const handlePress1 = () => {
    if (!anyFilled) {
      setAnyFilled(true);
    }
    if (!isFilled1) {
      setIsFilled1(true);
      setIsFilled2(false);
      setTheme('light');
    }
  };

  const handlePress2 = () => {
    if (!anyFilled) {
      setAnyFilled(true);
    }
    if (!isFilled2) {
      setIsFilled1(false);
      setIsFilled2(true);
      setTheme('dark');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.circle, isFilled1 ? styles.filled : null]}
          onPress={handlePress1}
        />
        <TouchableOpacity
          style={[styles.circle, isFilled2 ? styles.filled : null]}
          onPress={handlePress2}
        />
      </View>
      <View style={styles.buttonText}>
        <Text style={[{fontFamily: curFont.regular}]}>Light Mode</Text>
        <Text>Dark Mode</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 50,
  },
  filled: {
    backgroundColor: 'black',
  },
});

export default EmptyCircleButton;
