const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	// mode: 'production',
	mode: 'development',
	entry: ['./src/index.jsx'],
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'js/bundle.js',
	},
    devServer: {
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', '@babel/preset-env'],
					},
				},
			},
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/transform-react-jsx",
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-transform-async-to-generator",
                    ],
                },
            },
            {
                test: /\.scss$/,
                use: [
                  "style-loader",
                     {
                        loader: "css-loader",
                        options: {},
                        // options: {
                        //     importLoaders: 2,
                        //     // sourceMap: DEV_MODE,
                        //     modules: {
                        //     localIdentName: "l-[local]-[hash:base64:6]",
                        //     },
                        // }
                    },
                    { loader: "postcss-loader" },
                    {
                        loader: "sass-loader",
                        options: {},
                    },
                ],
            },
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
    // resolve: {
    //     extensions: ['.jsx', '.js', '.json'],
    //     alias: {
    //         '@': path.resolve(__dirname, 'src'),
    //     },
    //     // fallback: {
    //     //     crypto: false,
    //     // },
    // },

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
            title: "To Do List",
			inject: true,
			minify: true,
		}),
		new MiniCssExtractPlugin({
			filename: './css/index.css',
		}),
	],
    devtool: "source-map",

    performance: {
        hints: false,
    }
};