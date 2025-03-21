const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
          include: /node_modules\/antd/, // Target AntD only
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  modifyVars: { "ant-prefix": "erwc " },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        // 2. Rule for YOUR project's LESS files
        {
          test: /\.less$/,
          exclude: /node_modules\/antd/, // Exclude AntD
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true, // Required if using JS in Less
                },
              },
            },
          ],
        },
        // 2. Rule for your app's CSS Modules (e.g., *.module.css)
        {
          test: /\.module\.css$/,
          exclude: /node_modules\/antd/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true, // Enable CSS Modules
              },
            },
          ],
        },
        // 3. Rule for global CSS files (non-module)
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
