module.exports = {
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/campaigns/, to: '/campaigns.html' },
        { from: /\/login/, to: '/login.html' },
        { from: /\/vote/, to: '/vote.html' },
      ],
    },
  },
  pages: {
    campaigns: {
      entry: './src/views/campaigns/main.js',
      template: 'public/index.html',
      title: 'Campaigns',
    },
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
