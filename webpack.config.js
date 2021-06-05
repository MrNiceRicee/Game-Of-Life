
const path = require('path');

module.exports ={
  entry: './client/src/index.js',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
            { loader: 'style-loader' },
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                    },
                    sourceMap: true
                }
             },
             {
                 loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            [ 'autoprefixer', {}, ],
                        ],
                    },
                }
              }
        ]
      }
    ],
  },
  mode: 'development',

};