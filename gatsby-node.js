const { ClientCredentialsAuthProvider } = require('@twurple/auth');
const { ApiClient } = require('@twurple/api');
const clips = require('./plugin/clips');
const videos = require('./plugin/videos');

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    userId: Joi.string().required(),
  });
};

exports.sourceNodes = async (gatsby, { clientId, clientSecret, ...options}) => {
  const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
  const client = new ApiClient({ authProvider });

  await clips.sourceNodes(gatsby, options, client);
  await videos.sourceNodes(gatsby, options, client);
};
