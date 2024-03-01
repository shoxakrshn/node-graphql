import { GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from '../Profile/profile-type.js';
import { PostType, CreatePostInputType, ChangePostInputType } from './post-type.js';
import { Args, Context } from '../../types/types.js';
import { CreatePost, ChangePost } from './types.js';

export const PostMutations = {
  createPost: {
    type: PostType,
    description: 'Create a post',
    args: {
      dto: { type: new GraphQLNonNull(CreatePostInputType) },
    },
    resolve: async (_, { dto }: CreatePost, { prisma }: Context) =>
      await prisma.post.create({ data: dto }),
  },

  deletePost: {
    type: GraphQLBoolean,
    description: 'Delete a profile',
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }: Args, { prisma }: Context) => {
      await prisma.post.delete({ where: { id } });
      return null;
    },
  },

  changePost: {
    type: ProfileType,
    description: 'Change a post',
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInputType) },
    },
    resolve: async (_, { id, dto }: ChangePost, { prisma }: Context) =>
      await prisma.post.update({
        where: { id },
        data: dto,
      }),
  },
};
