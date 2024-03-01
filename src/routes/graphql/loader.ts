import { PrismaClient } from '@prisma/client';
import { createMemeberTypeLoader } from './entities/Member/loader.js';
import { createPostsLoader } from './entities/Post/loader.js';
import { createProfileLoader } from './entities/Profile/loader.js';
import {
  createUserLoader,
  createUserToSubscribeLoader,
  createSubscribedToUserLoader,
} from './entities/User/loader.js';

export const buldDataLoaders = (prisma: PrismaClient) => ({
  postsLoader: createPostsLoader(prisma),
  profileLoader: createProfileLoader(prisma),
  userLoader: createUserLoader(prisma),
  userSubscribedToLoader: createUserToSubscribeLoader(prisma),
  subscribedToUser: createSubscribedToUserLoader(prisma),
  memeberTypeLoader: createMemeberTypeLoader(prisma),
});
