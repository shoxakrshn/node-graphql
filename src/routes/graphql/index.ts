import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schemaApp } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { buldDataLoaders } from './loader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const errors = validate(schemaApp, parse(query), [depthLimit(5)]);

      if (errors.length) {
        return { errors };
      }

      return await graphql({
        schema: schemaApp,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
          loaders: buldDataLoaders(prisma),
        },
      });
    },
  });
};

export default plugin;
