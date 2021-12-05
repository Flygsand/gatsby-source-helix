const { ClientCredentialsAuthProvider } = require('@twurple/auth');
const { ApiClient } = require('@twurple/api');
const clips = require('./plugin/clips');

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    userId: Joi.string().required(),
    startDate: Joi.date(),
  });
};

exports.sourceNodes = async (gatsby, { clientId, clientSecret, ...options}) => {
  const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
  const client = new ApiClient({ authProvider });

  await clips.sourceNodes(gatsby, options, client);
};
