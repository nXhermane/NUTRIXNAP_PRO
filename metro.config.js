const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
    const config = getDefaultConfig(__dirname);
    config.resolver.assetExts.push("sqlite","db");
    const { transformer, resolver } = config;

    config.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer")
    };
    config.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter(ext => ext !== "svg"),
        sourceExts: [...resolver.sourceExts, "svg"]
    };

    return config;
})();
// const { getDefaultConfig } = require("expo/metro-config");
// const exclusionList = require("metro-config/src/defaults/exclusionList");

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);
//   config.resolver.assetExts.push("sqlite", "db");

//   const { transformer, resolver } = config;

//   config.transformer = {
//       ...transformer,
//       babelTransformerPath: require.resolve("react-native-svg-transformer"),
//   };

//   config.resolver = {
//       ...resolver,
//       assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//       sourceExts: [...resolver.sourceExts, "svg"],
//       blockList: exclusionList([
//         "./node_modules",
//         "./packages",

//         // Ajoutez d'autres chemins à ignorer ici
//       ]),
//   };

//   config.watchFolders = [
//       // Ajoutez des dossiers spécifiques à surveiller ici
//       __dirname,
//   ];

//   config.watchOptions = {
//       // Réduisez l'intervalle de polling ou utilisez le mode de polling pour les watchers
//       usePolling: true,
//       interval: 1000,
//   };

//   return config;
// })();
