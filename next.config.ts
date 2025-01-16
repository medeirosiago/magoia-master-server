const path = require('path');

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: {
                tailwindcss: {},
                autoprefixer: {},
              },
            },
          },
        },
      ],
    });

    // Configure paths
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};
