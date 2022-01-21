const { rawDataSymbol } = require('@twurple/common');

const NODE_TYPE = 'HelixVideo';
exports.NODE_TYPE = NODE_TYPE;

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
