import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  mode: "development",
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'client'),
      publicPath: '/'
    },
    hot: true,
    proxy: [{
      context: ['/'], // context can be a string or an array of strings to specify multiple paths
      target: 'http://localhost:3000'
    }],
  }
};

export default config;


