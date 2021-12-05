require('dotenv').config();
const { env } = require('process');

module.exports = {
  siteMetadata: {
    siteUrl: 'https://example.com',
  },
  plugins: [
    {
      resolve: 'gatsby-source-helix',
      options: {
        clientId: env.TWITCH_CLIENT_ID,
        clientSecret: env.TWITCH_CLIENT_SECRET,
        userId: env.TWITCH_USER_ID,
      },
    },
  ],
};
