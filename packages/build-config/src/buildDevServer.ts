import { BuildOptions } from './types/types'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  const isDev = options.mode === 'development'

  return {
    port: options.port ?? 3001,
    // open: true,
    historyApiFallback: true, // работает только в дев режиме, на nginx нужно проксировать в index.html
    hot: isDev,
  }
}
