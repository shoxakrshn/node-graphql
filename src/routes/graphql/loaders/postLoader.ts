import DataLoader from 'dataloader';
import prisma from '../types/prisma.js';
import { Post } from '../types/model/ModelTypes.js';

export const batchPostsByUserIds = async (userIds: readonly unknown[]) => {
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
