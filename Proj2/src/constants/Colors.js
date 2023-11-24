export const white = '#fff';

const Themes = {
  light: {
    text: '#2b3442',
    textMidContrast: '#4b6a9b',
    textLowContrast: '#697c9a',
    textSearchPlaceholder: '#4b6a9b',
    textAlt: white,

    secondary: '#8246b3',

    background: '#f6f8ff',
    // background: 'red',
    backgroundSecondary: '#fefefe',

    primary: '#0079ff',
    primaryHover: '#60abff',

    tabBarActive: '#E71D36',
    tabBarInactive: '#84929E',
  },
  dark: {
    text: white,
    textLowContrast: '#697c9a',
    textMidContrast: '#4b6a9b',
    textSearchPlaceholder: white,
    textAlt: white,

    secondary: '#8246b3',

    background: '#141d2f',
    // background: 'red',
    backgroundSecondary: '#1e2a47',

    primary: '#0079ff',
    primaryHover: '#60abff',

    tabBarActive: '#FF9F1C',
    tabBarInactive: '#5A6772',
    // tabBarInactive: white,
  },
};

export default Themes;