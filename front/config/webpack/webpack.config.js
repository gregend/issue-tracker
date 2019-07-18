const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
module.exports = {
   mode: 'development',
   entry: ['babel-polyfill', './app.js'],
   output: {
      filename: 'script.js',
      path: path.resolve(__dirname, '../../dist')
   },
   module: {
      rules: [
         { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
         {
            test: /\.scss$/,
            use: [
               'style-loader',
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     hmr: process.env.NODE_ENV === 'development',
                  },
               },
               { loader: 'css-loader' },
               { loader: 'sass-loader' }
            ]
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin({
         filename: 'styles.css'
      })
   ],
   devServer: {
      proxy: {
         '/api': {
            target: 'http://localhost:3000',
            pathRewrite: { '^/api': '' }
         }
      }
   }
};