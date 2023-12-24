import webpack from 'webpack'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types/types'
import { buildPlugins } from './buildPlugins'

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const isDev = options.mode === 'development'
  // const isProd = options.mode === 'production'

  return {
    mode: options.mode ?? 'production',
    entry: options.paths.entry,
    output: {
      path: options.paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : false, //Нужно искать source map под дев и прод, в зависимости от скорости билда source-map, eval-cheap-module-source-map
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
