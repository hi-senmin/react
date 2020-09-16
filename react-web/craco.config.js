const CracoLessPlugin = require('craco-less');
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            // patterns: path.resolve(__dirname, 'src/assets/less/main.less'),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};