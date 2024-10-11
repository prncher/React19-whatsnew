
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = true // process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx','.js', '.json']
    },
    module: {
        rules: [
            shouldUseSourceMap && {
                enforce: 'pre',
                exclude: /@babel(?:\/|\\{1,2})runtime/,
                test: /\.(js|mjs|jsx|ts|tsx|css)$/,
                loader: require.resolve('source-map-loader'),
              },
              {
                test: /\.svg$/,
                use: [
                  {
                    loader: require.resolve('@svgr/webpack'),
                    options: {
                      prettier: false,
                      svgo: false,
                      svgoConfig: {
                        plugins: [{ removeViewBox: false }],
                      },
                      titleProp: true,
                      ref: true,
                    },
                  },
                  {
                    loader: require.resolve('file-loader'),
                    options: {
                      name: 'static/media/[name].[hash].[ext]',
                    },
                  },
                ],
                issuer: {
                  and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                },
              },      
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                      }
                },
                resolve: {
                    fullySpecified: false, // disable the behaviour
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
              }
        ],        
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html'})
    ],
    mode: "development",
    devServer: {
        hot: true,
        port: 3000,
        open: true
    }

}
