import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ChangeUserInputType, CreateUserInputType, UserType } from './model/UserType.js';
import {
  ChangeProfileInputType,
  CreateProfileInputType,
  ProfileType,
} from './model/ProfileType.js';
import prisma from './prisma.js';
import {
  Args,
  ChangePost,
  ChangeProfile,
  ChangeUser,
  CreatePost,
  CreateProfile,
  CreateUser,
} from './model/ModelTypes.js';
import { ChangePostInputType, CreatePostInputType, PostType } from './model/PostType.js';
import { UUIDType } from './model/uuid.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutatation',
  fields: () => ({
    createUser: {
      type: UserType,
      description: 'Crate a user',
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInputType) },
      },
      resolve: async (_, { dto }: CreateUser) => await prisma.user.create({ data: dto }),
    },

    createProfile: {
      type: ProfileType,
      description: 'Create a profile',
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInputType) },
      },
      resolve: async (_, { dto }: CreateProfile) =>
        await prisma.profile.create({ data: dto }),
    },

    createPost: {
      type: PostType,
      description: 'Create a post',
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInputType) },
      },
      resolve: async (_, { dto }: CreatePost) => await prisma.post.create({ data: dto }),
    },

    deleteUser: {
      type: GraphQLBoolean,
      description: 'Delete a user',
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: Args) => {
        await prisma.user.delete({ where: { id } });
        return null;
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      description: 'Delete a profile',
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: Args) => {
        await prisma.profile.delete({ where: { id } });
        return null;
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      description: 'Delete a profile',
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: Args) => {
        await prisma.post.delete({ where: { id } });
        return null;
      },
    },

    changeUser: {
      type: UserType,
      description: 'Change a user',
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInputType) },
      },
      resolve: async (_, { id, dto }: ChangeUser) =>
        await prisma.user.update({
          where: { id },
          data: dto,
        }),
    },

    changeProfile: {
      type: ProfileType,
      description: 'Change a profile',
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
      },
      resolve: async (_, { id, dto }: ChangeProfile) =>
        await prisma.profile.update({
          where: { id },
          data: dto,
        }),
    },

    changePost: {
      type: ProfileType,
      description: 'Change a post',
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInputType) },
      },
      resolve: async (_, { id, dto }: ChangePost) =>
        await prisma.post.update({
          where: { id },
          data: dto,
        }),
    },

    subscribeTo: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { userId, authorId }: { userId: string; authorId: string }) => {
        return await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: authorId,
              },
            },
          },
        });
      },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { userId, authorId }: { userId: string; authorId: string }) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId: authorId,
            },
          },
        });
        return true;
      },
    },
  }),
});
