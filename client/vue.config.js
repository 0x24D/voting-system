module.exports = {
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/login/, to: '/login.html' },
        { from: /\/vote/, to: '/vote.html' },
      ],
    },
  },
  pages: {
    login: {
      entry: './src/views/login/main.js',
      template: 'public/index.html',
      title: 'Login',
    },
    vote: {
      entry: './src/views/vote/main.js',
      template: 'public/index.html',
      title: 'Vote',
    },
  },
};
