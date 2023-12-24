import { ModuleOptions } from 'webpack'
import { BuildOptions } from './types/types'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypescript from 'react-refresh-typescript'

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development'
  // const isProd = options.mode === 'production'

  const tsLoader = {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypescript()].filter(Boolean),
        }),
        transpileOnly: isDev,
      },
    },
    exclude: /node_modules/,
  }

  const assetLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    type: 'asset/resource',
  }

  const svgLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              { name: 'convertColors', params: { currentColor: true } },
            ],
          },
        },
      },
    ],
  }

  return [
    {
      test: /\.s[ac]ss$/i,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: isDev
                ? '[path][name]__[local]'
                : '[hash:base64:8]',
            },
          },
        },
        'sass-loader',
      ],
    },
    tsLoader,
    assetLoader,
    svgLoader,
  ]
}
