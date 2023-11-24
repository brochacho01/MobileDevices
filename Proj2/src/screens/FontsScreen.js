import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useThemeColors } from '../hooks/useThemeColors';
import { useMyFonts } from '../hooks/useMyFonts';
import { useCustomFont } from '../hooks/useCustomFont';
import Fonts from '../constants/Fonts';

const FontsScreen = () => {
    const { colors } = useThemeColors();
    const { curFont } = useMyFonts();
    const { font, setFont } = useCustomFont();
    // const  customFonts  = useCustomFont();

    const [isFilled1, setIsFilled1] = useState(true);
    const [isFilled2, setIsFilled2] = useState(false);
    const [isFilled3, setIsFilled3] = useState(false);
    const [isFilled4, setIsFilled4] = useState(false);
    const [anyFilled, setAnyFilled] = useState(false);


    const handlePress1 = () => {
        if (!anyFilled) {
          setAnyFilled(true);
        }
        if (!isFilled1) {
          setIsFilled1(true);
          setIsFilled2(false);
          setIsFilled3(false);
          setIsFilled4(false);
          setFont('inconsolata');
        }
      };
    
      const handlePress2 = () => {
        if (!anyFilled) {
          setAnyFilled(true);
        }
        if (!isFilled2) {
          setIsFilled1(false);
          setIsFilled2(true);
          setIsFilled3(false);
          setIsFilled4(false);
          setFont('lora')
        }
      };

      const handlePress3 = () => {
        if (!anyFilled) {
            setAnyFilled(true);
        }
        if (!isFilled3) {
            setIsFilled1(false);
            setIsFilled2(false);
            setIsFilled3(true);
            setIsFilled4(false);
            setFont('inter')
        }
      };

        const handlePress4 = () => {
        if (!anyFilled) {
            setAnyFilled(true);
        }
        if (!isFilled4) {
            setIsFilled1(false);
            setIsFilled2(false);
            setIsFilled3(false);
            setIsFilled4(true);
            setFont('spacemono')
        }
      };


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text testID='header-fonts' style={[styles.title, {color: colors.text, fontFamily: curFont.regular}]}>Select a Font</Text>
            <View style={styles.fontRow}>
                <TouchableOpacity
                    style={[styles.circle, isFilled1 ? styles.filled : null]}
                    onPress={handlePress1}
                    testID='fonts-button'
                />
                <Text style={[styles.rowText, {color: colors.text, fontFamily: Fonts['inconsolata'].regular}]}>Inconsolata</Text>
            </View>
            <View style={styles.fontRow}>
                <TouchableOpacity
                    style={[styles.circle, isFilled2 ? styles.filled : null]}
                    onPress={handlePress2}
                    testID='fonts-button2'
                />
                <Text style={[styles.rowText, {color: colors.text, fontFamily: Fonts['lora'].regular}]}>Lora</Text>
            </View>
            <View style={styles.fontRow}>
                <TouchableOpacity
                    style={[styles.circle, isFilled3 ? styles.filled : null]}
                    onPress={handlePress3}
                />
                <Text style={[styles.rowText, {color: colors.text, fontFamily: Fonts['inter'].regular}]}>Inter</Text>
            </View>
            <View style={styles.fontRow}>
                <TouchableOpacity
                    style={[styles.circle, isFilled4 ? styles.filled : null]}
                    onPress={handlePress4}
                />
                <Text style={[styles.rowText, {color: colors.text, fontFamily: Fonts['spacemono'].regular}]}>Space-Mono</Text>
            </View>
        

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5fcff',
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
    },
    fontRow: {
        marginVertical: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
    },
    rowText: {
        fontSize: 35,
        marginHorizontal: 10,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'black',
        // marginVertical: 20,
        // marginHorizontal: 20,
      },
      filled: {
        backgroundColor: 'black',
      },
});

export default FontsScreen;