const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (_, { mode }) => {
  const isProd = mode === "production";
  return {
    mode: mode || 'development',
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      library: "ERWebChat",
      libraryTarget: "umd",
      publicPath: "/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    ...(isProd
      ? {
          externals: {
            react: "react",
            "react-dom": "react-dom",
          },
        }
      : { devtool: "source-map" }),
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.svg$/i,
          use: [
            {
              loader: "@svgr/webpack",
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
              loader: "file-loader",
              options: {
                name: "[name].[hash].[ext]",
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
        {
          test: /\.(png|jpg|woff|woff2)$/i,
          type: "asset/resource",
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[path][name][ext]_[local]",
                },
              },
            },
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.less$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[path][name][ext]_[local]",
                },
              },
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
          include: /\.module\.less$/,
        },
        {
          test: /\.less$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
          exclude: /\.module\.less$/,
        },
        {
          test: /\.(jsx|tsx|js|ts)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
        filename: "index.html",
      }),
      new BundleAnalyzerPlugin()
    ],
  };
};
