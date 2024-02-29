import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './ProfileType.js';
import { PostType } from './PostType.js';
import { Context, User } from './ModelTypes.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }: User, _, { loaders: { profileLoader } }: Context) =>
        profileLoader.load(id),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _, { loaders: { postsLoader } }: Context) =>
        postsLoader.load(id),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (
        { id }: User,
        _,
        { loaders: { userSubscribedToLoader } }: Context,
      ) => userSubscribedToLoader.load(id),
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, _, { loaders: { subscribedToUser } }: Context) =>
        subscribedToUser.load(id),
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
