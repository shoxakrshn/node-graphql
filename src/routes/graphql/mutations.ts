import { GraphQLObjectType } from 'graphql';
import { PostMutations } from './entities/Post/mutations.js';
import { ProfileMutations } from './entities/Profile/mutations.js';
import { UserMutations } from './entities/User/mutations.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutatation',
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
    ...ProfileMutations,
  }),
});
