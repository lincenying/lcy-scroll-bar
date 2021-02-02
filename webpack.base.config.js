/**
 * 公共配置
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    // 加载器
    module: {
        // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
              },
              {
                test: /\.vue$/,
                loader: 'vue-loader',
              },
              {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
              },
              {
                test: /\.(ttf|gif|png|jpe?g)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      name: '[name].[ext]',
                      limit: 1024 * 8
                    }
                  }
                ]
              }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    plugins: [
        // new ESLintPlugin(eslintConfig),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin()
    ]
};