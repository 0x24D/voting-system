module.exports = {
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/login/, to: '/login.html' },
      ],
    },
  },
  pages: {
    login: {
      entry: './src/views/login/main.js',
      template: 'public/index.html',
      title: 'Login',
    },
  },
};
