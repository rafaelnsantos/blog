const configBlogLoader = (config, { dev }) => {
  config.module.rules.push({
    test: /\.md$/,
    use: 'raw-loader',
  });

  return config;
};

module.exports = {
  webpack: configBlogLoader,
};
