// node路径解析模块，兼容不同操作系统
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 生产环境提取css
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env) => {
  console.log("NODE_ENV: ", env.NODE_ENV);
  if (env.NODE_ENV === "development") {
    process.env.NODE_ENV = "development";
    console.log(process.env.NODE_ENV);
  }
  return {
    context: path.resolve(__dirname), //当前项目目录绝对路径
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"), //__dirname 当前模块的目录名
      filename: "[name].bundle.js",
      //publicPath: "/assets/", //输出解析文件的目录，url 相对于 HTML 页面也就是根目录
      // library: {
      //   //开发插件时需要该配置
      //   type: "umd", //umd 通用模块定义规范，适合所有环境
      //   name: "myFirstLibrary", //导出插件的名称
      //   auxiliaryComment: {
      //     //每种类型都插入不同的注释
      //     root: "Root Comment",
      //     commonjs: "CommonJS Comment",
      //     commonjs2: "CommonJS2 Comment",
      //     amd: "AMD Comment",
      //   },
      // },
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
      overlay: {
        //用于显示错误和警告
        warnings: true,
        errors: true,
      },
    },
    resolve: {
      //用于解析文件并赋予别名
      alias: {
        "@": path.resolve(__dirname, "src"),
        api: path.resolve(__dirname, "src/api/"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "My App",
        template: path.resolve(__dirname, "src/index.html"),
        favicon: path.resolve(__dirname, "src/assets/favicon.ico"),
      }),
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            env.NODE_ENV !== "production"
              ? "vue-style-loader"
              : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                esModule: false,  //此处设置为false是因为vue-style-loader4.1.2版本只接受esModule: false，而css-loader4.2之后的版本默认为true，会导致css样式不加载
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.scss$/i,
          use: [
            {
              loader: "sass-loader",
              options: {
                //处理缩进的scss语法
                indentedSyntax: true,
                // sass-loader version >= 8
                sassOptions: {
                  indentedSyntax: true,
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            plugins: [
              [
                "import-globals",
                {
                  process: require.resolve("process/browser"),
                },
              ],
            ],
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: "asset",
          // 小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。
          // 自定义设置上限
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
      ],
    },
  };
};
