# gatsby-source-helix

Gatsby source plugin for building websites using Twitch as a data source.

## Installation

```
npm install --save gatsby-source-helix
```

## Usage

1. Register an app at the [Twitch Dev Console](https://dev.twitch.tv/console) and get your Client ID and Client Secret.
2. Obtain the user ID for filtering. There are multiple ways of doing this. See [Getting Your User ID](#getting-your-user-id).
3. Add the plugin to your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-helix',
      options: {
        clientId: 'Your Client ID',
        clientSecret: 'Your Client Secret',
        userId: 'Your user ID',
      },
    },
  ],
};
```

4. Query for nodes from your pages:

```
{
  allHelixClip {
    edges {
      node {
        title
        broadcaster_name
      }
    }
  }
}
```

A list of available fields can be found [here](https://dev.twitch.tv/docs/api/reference#get-clips). Note that the `id` field is assigned by 
the plugin and does not correspond to a Twitch ID.

### Getting Your User ID

This can be done using the [Twitch CLI](https://dev.twitch.tv/docs/cli). Follow the instructions provided by Twitch, and then run the following:

`twitch api get users -q login=<username>`

replacing `<username>` with the actual name of the user whose ID you want to fetch. The JSON response will contain the user ID:

```
{
  "data": [
    {
      ...
      "id": "123456789",
      ...
    }
  ]
}
```

## Options

| Name           | Type   | Description                           | Default       |
| -------------- | ------ |-------------------------------------- | ------------- |
| `clientId`     | String | Twitch API Client ID                  | (required)    |
| `clientSecret` | String | Twitch API Client Secret              | (required)    |
| `userId`       | String | User ID filter                        | (required)    |
