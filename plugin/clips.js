const { rawDataSymbol } = require('@twurple/common');
const { relativeDays } = require('../util/date');

const LAST_FETCH_DATE_CACHE_KEY = 'helix.clips.last_fetch_date';

const NODE_TYPE = 'HelixClip';
exports.NODE_TYPE = NODE_TYPE;

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
  cache,
}, { userId, startDate }, client) => {
  const now = new Date();
  const lastFetchDate = new Date(cache.get(LAST_FETCH_DATE_CACHE_KEY));
  const filter = {
    endDate: now.toISOString(),
    startDate: (isNaN(lastFetchDate) ? startDate || relativeDays(now, -14) : lastFetchDate).toISOString(),
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
