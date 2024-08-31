module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            "babel-preset-expo",
            "module:@expo/knex-expo-sqlite-dialect/babel-preset"
        ],
        plugins: [
            "@babel/plugin-proposal-export-namespace-from",
            "react-native-reanimated/plugin"
        ]
    };
};
