const currentEnvironment = process.env.ENV || process.env.NODE_ENV || "development"
const queries = require("gatsby-theme-blog/src/utils/algolia")
require("dotenv").config()

module.exports = {
  siteMetadata: {
    lang: `ja`,
    title: `5000164 is here`,
    description: `This blog is written about my life include technology.`,
    name: `菅原 浩`,
    profile: `Web プログラマー。 好きな言葉は「安定的に不安定」。いろんな会社で働いた後、オーストラリアで英語を勉強し、デンマークで幸せについて考えて、帰国後は海の近くで生活中。`,
    siteUrl: `https://blog.5000164.jp`,
    image: `/icon.png`,
    twitterUsername: `@5000164`,
    repository: `https://github.com/5000164/blog.5000164.jp`,
    profileUrl: `https://5000164.jp`,
  },
  plugins: [
    `gatsby-theme-blog`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `5000164 is here`,
        short_name: `5000164 is here`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://blog.5000164.jp`,
      },
    },
    ...(currentEnvironment === "algolia"
      ? [
          {
            resolve: `gatsby-plugin-algolia`,
            options: {
              appId: process.env.GATSBY_ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_ADMIN_KEY,
              queries,
              chunkSize: 10000,
            },
          },
        ]
      : []),
  ],
}
