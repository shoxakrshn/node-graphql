import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { Post } from './types.js';

const batchPostsByUserIds =
  (prisma: PrismaClient) => async (userIds: readonly unknown[]) => {
    const ids = userIds as string[];
    const posts: Post[] = await prisma.post.findMany({
      where: {
        authorId: {
          in: ids,
        },
      },
    });

    const postsMap = new Map<string, Post[]>();
    posts.forEach((post) => {
      const postsForAuthor = postsMap.get(post.authorId) || [];
      postsForAuthor.push(post);
      postsMap.set(post.authorId, postsForAuthor);
    });

    // Извлечение массива постов для каждого userId в порядке их запроса
    const postsByUserId = ids.map((id) => postsMap.get(id) || []);
    return postsByUserId;
  };

export const createPostsLoader = (prisma: PrismaClient) =>
  new DataLoader(batchPostsByUserIds(prisma));
