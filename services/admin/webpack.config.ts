import path from 'path'
import webpack from 'webpack'
import {
  buildWebpack,
  BuildPath,
  BuildMode,
  BuildPlatform,
} from '@packages/build-config'
import packageJson from './package.json'

interface EnvVariables {
  mode?: BuildMode
  port?: number
  analyzer?: boolean
  platform?: BuildPlatform
}

export default (env: EnvVariables) => {
  const paths: BuildPath = {
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  }

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? 'production',
    paths,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? 'desktop',
  })

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './router': './src/router/router.tsx',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    })
  )

  return config
}
