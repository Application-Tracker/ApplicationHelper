const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development', 
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ] 
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }, 
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true, 
    static: {
      publicPath: '/build', 
      directory: path.resolve(__dirname, 'build')
    }, 
    port: 8080, 
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }, 
  resolve: { 
    extensions: ['', '.jsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/index.html')
    }),
  ],
}