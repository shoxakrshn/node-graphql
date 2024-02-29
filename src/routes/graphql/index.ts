import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schemaApp } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { createMemeberTypeLoader } from './loaders/membersLoader.js';
import { createPostsLoader } from './loaders/postLoader.js';
import { createProfileLoader } from './loaders/profileLoader.js';
import { createSubscribedToUserLoader } from './loaders/subscribedToUser.js';
import { createUserLoader } from './loaders/userLoader.js';
import { createUserToSubscribeLoader } from './loaders/userSubscribedToLoader.js';
import { PrismaClient } from '@prisma/client';

const buldDataLoaders = (prisma: PrismaClient) => ({
  postsLoader: createPostsLoader(prisma),
  profileLoader: createProfileLoader(prisma),
  userLoader: createUserLoader(prisma),
  userSubscribedToLoader: createUserToSubscribeLoader(prisma),
  subscribedToUser: createSubscribedToUserLoader(prisma),
  memeberTypeLoader: createMemeberTypeLoader(prisma),
});

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
