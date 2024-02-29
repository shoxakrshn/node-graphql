import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from './model/UserType.js';
import { UUIDType } from './model/uuid.js';
import { Args, Context } from './model/ModelTypes.js';
import { MemberType, MemberTypeId } from './model/MemberType.js';
import { ProfileType } from './model/ProfileType.js';
import { PostType } from './model/PostType.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: (_parent, _args, { prisma }: Context) => prisma.user.findMany(),
    },

    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: Args, { prisma }: Context) =>
        await prisma.user.findUnique({
          where: { id },
        }),
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: (_, _args, { prisma }: Context) => prisma.memberType.findMany(),
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_, { id }: Args, { prisma }: Context) =>
        await prisma.memberType.findUnique({
          where: { id },
        }),
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: (_parent, _args, { prisma }: Context) => prisma.profile.findMany(),
    },

    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: Args, { prisma }: Context) =>
        await prisma.profile.findUnique({
          where: { id },
        }),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: (_parent, _args, { prisma }: Context) => prisma.post.findMany(),
    },

    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: Args, { prisma }) =>
        await prisma.post.findUnique({
          where: { id },
        }),
    },
  }),
});
