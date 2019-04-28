/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const characters = graphql(`
    {
      charactersdata {
        results {
          name
        }
      }
    }
  `).then((result) => {
      result.data.charactersdata.results.forEach(({ name }) => {
        createPage({
          path: `/character/${name}`,
          component: path.resolve('./src/templates/character.js'),
          context: {
            name,
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: name
          },
        });
      });
    });

    const postPage = path.resolve(`src/templates/postPage.js`)

    const post = graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {

      createPage({
        path: node.frontmatter.path,
        component: postPage,
        context: {}, // additional data can be passed via context
      })
    })
  });

  return Promise.all([characters, post]);
};
