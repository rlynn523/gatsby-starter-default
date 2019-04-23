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
  
  return Promise.all([characters]);
};
