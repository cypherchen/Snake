// 导入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 配置信息
module.exports = {
  mode: 'development',
  // 入口文件
  entry: "./src/index.ts",
  // 出口文件
  output: {
    // 指定打包文件路径
    path: path.resolve(__dirname, 'dist'),
    // 指定打包文件名
    filename: "bundle.js",
  },
  // 打包时要用到的模块
  module: {
    // 指定加载时候的规则
    rules: [
      // 配置ts文件
      {
        // 指定匹配到的文件才会生效
        test: /\.ts$/,
        // 使用ts-loader处理匹配到的文件
        use: [
          // 配置babel
          {
            // 加载器
            loader: "babel-loader",
            // 配置babel
            options: {
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "92",
                    },
                    // 指定的corejs版本
                    "corejs": "3",
                    // 使用corejs的方式，usage表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node_modules/
      },
      // 配置less文件
      {
        test: /\.less$/,
        // loader执行顺序是数组pop的顺序，所以最早用的放在数组尾部
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  // 被引用模块的扩展名可以是以下这几种
  resolve: {
    extensions: ['.js', '.ts']
  }
}