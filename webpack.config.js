// node路径解析模块，兼容不同操作系统
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "production",
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
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    overlay: {           //用于显示错误和警告
      warnings: true,
      errors: true
    }
  },
  resolve: {         //用于解析文件并赋予别名
    alias: {
      "@": path.resolve(__dirname, "src"),
      api: path.resolve(__dirname, "src/api/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
};
