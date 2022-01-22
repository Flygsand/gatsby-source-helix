const { rawDataSymbol } = require('@twurple/common');

const NODE_TYPE = 'HelixVideo';
exports.NODE_TYPE = NODE_TYPE;

exports.createSchemaCustomization = ({
  actions: { createTypes }
}) => {
  createTypes(`
    type ${NODE_TYPE} implements Node {
      created_at: Date!
      description: String!
      duration: String!
      language: String!
      published_at: Date!
      stream_id: String
      thumbnail_url: String!
      title: String!
      type: String!
      url: String!
      user_id: String!
      user_login: String!
      user_name: String!
      view_count: Int!
      viewable: String!
    }
  `);
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId
}, { userId }, client) => {
  for await (const video of client.videos.getVideosByUserPaginated(userId)) {
    createNode({
      ...video[rawDataSymbol],
      id: createNodeId(`${NODE_TYPE}-${video.id}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(video),
        contentDigest: createContentDigest(video),
      },
    });
  }
};
