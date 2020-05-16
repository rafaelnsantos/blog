module.exports = {
  env: {
    URL: process.env.VERCEL_URL,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID
  },
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
