import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/themed/Views';
import { Text } from '../components/themed/Text';
import { useThemeColors } from '../hooks/useThemeColors';
import { ThemeContext, Themes, ThemeProvider } from '../context/Theme';
import EmptyCircleButton from '../components/themed/CircleButton';
import { useMyFonts } from '../hooks/useMyFonts';

const SettingsScreen = () => {
    const { theme, colors } = useThemeColors();
    const { curFont } = useMyFonts();

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Text style={[styles.title, {fontFamily: curFont.bold}]}>Select Theme</Text>
        <EmptyCircleButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 50,
    },
});

export default SettingsScreen;
