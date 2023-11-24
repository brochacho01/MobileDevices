module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

// export const plugins = [
//   [
//     'module-resolver',
//     {
//       root: ['./src'],
//       alias: {
//         '~': './src',
//       },
//     },
//   ],
// ];
// export const presets = ['babel-preset-expo'];
