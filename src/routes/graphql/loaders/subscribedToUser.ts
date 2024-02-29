import DataLoader from 'dataloader';
import { Author } from '../types/model/ModelTypes.js';
import { PrismaClient } from '@prisma/client';

export const batchSubscribedToUser =
  (prisma: PrismaClient) => async (userIds: readonly unknown[]) => {
    const ids = userIds as string[];
    const authors: Author[] = await prisma.user.findMany({
      where: {
        userSubscribedTo: {
          some: {
            authorId: {
              in: ids,
            },
          },
        },
      },
      include: {
        userSubscribedTo: true,
      },
    });

    const authorsByAuthorId = authors.reduce((map, author) => {
      author.userSubscribedTo.forEach((subscription) => {
        const authorsList = map.get(subscription.authorId) || [];
        authorsList.push(author);
        map.set(subscription.authorId, authorsList);
      });
      return map;
    }, new Map<string, Author[]>());

    const result: Author[][] = ids.map((id) => authorsByAuthorId.get(id) || []);
    return result;
  };

export const createSubscribedToUserLoader = (prisma: PrismaClient) =>
  new DataLoader(batchSubscribedToUser(prisma));
