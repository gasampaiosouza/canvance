// const withImages = require('next-images');

// module.exports = withImages({
//   esModule: true,
// });

module.exports = {
  async redirects() {
    return [{ source: '/', destination: '/dashboard', permanent: true }];
  },
};
