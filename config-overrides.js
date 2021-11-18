
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const codeEditPlugin =()=> (config)=> {
  config.plugins.push(new MonacoWebpackPlugin({
    languages: ['json','javascript','typescript']
  }));
  return config;
}

/* eslint-disable */
//禁止对配置文件进行语法检查
// const CracoLessPlugin = require("craco-less");
const path = require("path");
const paths = require('react-scripts/config/paths');
const svgoConfig = require("./svgo-config.json");
const {
    override,
    addWebpackAlias,
    addDecoratorsLegacy
} = require("customize-cra");
//https://github.com/heuuLZP/svg-icon-map/blob/master/react-svg-icon/config-overrides.js
function resolve(dir) {
    return path.join(__dirname, ".", dir);
}
const SvgIcon = () => (config) => {
  console.log(config.module.rules[1])
    // config.module.rules[1].oneOf[7].exclude.push(resolve("src/assets/svgs"));
    config.module.rules.push({
        test: /\.svg$/,
        include: resolve("src/assets/svgs"),
        use: [{
                loader: "svg-sprite-loader",
                options: {
                    symbolId: "icon-[name]",
                },
            },
            {
                loader: "svgo-loader",
                options: svgoConfig,
            },
        ],
    });
    config.resolve = {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    };
    return config;
};
const dockerPlugin = () => (config) => {
    if (process.env.NODE_ENV !== "development") {
        // 关闭sourceMap
        config.devtool = false;
        paths.appBuild = path.join(path.dirname(paths.appBuild), 'app/public');
        config.output.path = path.join(path.dirname(config.output.path), 'app/public');
        // 修改publicPath
        config.output.publicPath = "./";

        // //配置cdn
        // config.output.publicPath = "//mwebtest.minigame.qq.com/rovy/oit/";
    }
    return config;
};
// const multipleEntry = require('react-app-rewire-multiple-entry')([{
//     entry: 'src/mobile',
//     template: 'public/mobile.html',
//     outPath: '/mobile.html',
// }]);

// const addEntry = () => config => {
//     multipleEntry.addMultiEntry(config);
//     return config;
// };
module.exports = override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),
    dockerPlugin(),
    SvgIcon(),
    // addEntry(),
    codeEditPlugin(),
    addWebpackAlias({
        "@": path.join(__dirname, "src"),
    })
);