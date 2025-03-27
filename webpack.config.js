const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const {
  LessPluginRemoveAntdGlobalStyles,
} = require("less-plugin-remove-antd-global-styles");

module.exports = (_, { mode }) => {
  const isProd = mode === "production";
  return {
    mode: mode || "development",
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
                  plugins: [new LessPluginRemoveAntdGlobalStyles()],
                  javascriptEnabled: true,
                },
              },
            },
          ],
          include: /\.module\.less$/,
        },
        {
          test: /\.(jsx|tsx|js|ts)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          include: /node_modules\/antd/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  plugins: [new LessPluginRemoveAntdGlobalStyles()],
                  modifyVars: { "ant-prefix": "erwc" },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.less$/,
          exclude: /node_modules\/antd/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  plugins: [new LessPluginRemoveAntdGlobalStyles()],
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.module\.css$/,
          exclude: /node_modules\/antd/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: [/node_modules\/antd/, /\.module\.css$/],
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
        filename: "index.html",
      }),
      new BundleAnalyzerPlugin(),
    ],
  };
};
