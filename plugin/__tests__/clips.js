const { env } = require('process');
const { request, gql } = require('graphql-request');
const { ClientCredentialsAuthProvider } = require('@twurple/auth');
const { ApiClient } = require('@twurple/api');
const { rawDataSymbol } = require('@twurple/common');
const { byProperty } = require('../../util/sort');

test('it creates nodes', async () => {
  const authProvider = new ClientCredentialsAuthProvider(env.TWITCH_CLIENT_ID, env.TWITCH_CLIENT_SECRET);
  const helix = new ApiClient({ authProvider });
  const clips = (await helix.clips.getClipsForBroadcasterPaginated(env.TWITCH_USER_ID).getAll()).map(c => c[rawDataSymbol]).sort(byProperty('title'));

  const query = gql`
    {
      allHelixClip {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;

  const data = await request('http://site:8000/___graphql', query);
  const nodes = data.allHelixClip.edges.map(({ node }) => node).sort(byProperty('title'));
  expect(nodes.length).toEqual(clips.length);
  expect(nodes.map(({ title }) => title)).toEqual(clips.map(({ title }) => title));
});
