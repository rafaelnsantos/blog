const configBlogLoader = (config, { dev }) => {
  config.module.rules.push({
    test: /\.md$/,
    use: 'raw-loader',
  });

  return config;
};

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: configBlogLoader,
  swcMinify: true,
};
