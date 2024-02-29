import { GraphQLObjectType } from 'graphql';
import { UserQueries } from './entities/User/queries.js';
import { PostQueries } from './entities/Post/queries.js';
import { MemberQueries } from './entities/Member/queries.js';
import { ProfileQueries } from './entities/Profile/queries.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    ...UserQueries,
    ...PostQueries,
    ...ProfileQueries,
    ...MemberQueries,
  }),
});
