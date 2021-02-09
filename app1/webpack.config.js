const DefinePlugin = require("webpack").DefinePlugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");

const mode = process.env.NODE_ENV == 'production' ? 'production' : 'development'

const deps = require('./package.json').dependencies
const sharedDeps = 
    ['@dhis2/ui', '@dhis2/app-runtime', '@dhis2/d2-i18n', 'moment']
    .filter(dep => !!deps[dep])
    .reduce((out, dep) => { out[dep] = deps[dep]; return out }, {})

module.exports = {
  entry: "./src/index",
  mode,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 3001,
  },
  devtool: 'source-map',
  output: {
    publicPath: "auto",
    chunkFilename: "[name].[contenthash].js",
  },
  module: {
    rules: [
        {
            test: /\.m?js$/,
            type: "javascript/auto",
            resolve: {
            fullySpecified: false,
            },
        },
        {
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
            presets: ["@babel/preset-react"],
            },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
    ],
  },
  plugins: [
    new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.REACT_APP_DHIS2_BASE_URL': JSON.stringify(process.env.REACT_APP_DHIS2_BASE_URL || 'https://d2.winged.tech/2.34dev')
    }),
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      remotes: {
        "shell": "shell@http://localhost:3000/remoteEntry.js",
        "app2": "app2@http://localhost:3002/remoteEntry.js"
      },
      exposes: {
        ".": "./src/App.js"
      },
      shared: { 
          ...sharedDeps,
          react: { singleton: true }, 
          "react-dom": { singleton: true }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};