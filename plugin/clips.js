const { rawDataSymbol } = require('@twurple/common');

const LAST_FETCH_DATE_CACHE_KEY = 'helix.clips.last_fetch_date';

const NODE_TYPE = 'HelixClip';
exports.NODE_TYPE = NODE_TYPE;

exports.createSchemaCustomization = ({
  actions: { createTypes }
}) => {
  createTypes(`
    type ${NODE_TYPE} implements Node {
      broadcaster_id: String!
      broadcaster_name: String!
      created_at: Date!
      creator_id: String!
      creator_name: String!
      duration: Float!
      embed_url: String!
      game_id: String!
      language: String!
      thumbnail_url: String!
      title: String!
      url: String!
      video_id: String!
      view_count: Int!
    }
  `);
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
  cache,
}, { userId }, client) => {
  const now = new Date();
  const filter = {
    endDate: now.toISOString(),
    startDate: new Date(await cache.get(LAST_FETCH_DATE_CACHE_KEY) || 0).toISOString(),
  };

  for await (const clip of client.clips.getClipsForBroadcasterPaginated(userId, filter)) {
    createNode({
      ...clip[rawDataSymbol],
      id: createNodeId(`${NODE_TYPE}-${clip.id}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(clip),
        contentDigest: createContentDigest(clip),
      },
    });
  }

  await cache.set(LAST_FETCH_DATE_CACHE_KEY, now);
};
