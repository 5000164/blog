const trackingId = `UA-51024599-1`
const anonymize = true

module.exports = {
  siteMetadata: {
    lang: `ja`,
    title: `5000164 is here`,
    description: `This blog is written about my life include technology.`,
    name: `菅原 浩`,
    profile: `Web プログラマー。 好きな言葉は「安定的に不安定」。いろんな会社で働いた後、オーストラリアで英語を勉強し、デンマークで幸せについて考えて、帰国後は海の近くで生活中。`,
    consent: {
      text: `このウェブサイトでは Cookie を使用します。<a href='/privacy/'>詳細はこちら</a>`,
      accept: `同意する`,
      decline: `同意しない`,
    },
    siteUrl: `https://blog.5000164.jp`,
    image: `/icon.png`,
    twitterUsername: `@5000164`,
    repository: `https://github.com/5000164/blog.5000164.jp`,
    profileUrl: `https://5000164.jp`,
    trackingId,
    anonymize,
  },
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
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
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId,
          cookieName: `gatsby-gdpr-google-analytics`,
          anonymize,
        },
        facebookPixel: {
          pixelId: ``,
          cookieName: `gatsby-gdpr-facebook-pixel`,
        },
        environments: [`production`, `development`],
      },
    },
  ],
}
