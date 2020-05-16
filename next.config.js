module.exports = {
  webpack: function(config, { dev }) {
    if (dev) {
      config.devtool = 'cheap-module-source-map';
    }
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  }
}
