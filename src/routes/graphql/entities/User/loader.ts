import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Author, Subscription, User } from './types.js';

const batchUsersByIds = (prisma: PrismaClient) => async (userIds: readonly unknown[]) => {
  const ids = userIds as string[];
  const users: User[] = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const membersMap = new Map(users.map((user) => [user.id, user]));
  return ids.map((id) => membersMap.get(id));
};

const batchSubscribedToUser =
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

const batchUserSubscribedTo =
  (prisma: PrismaClient) => async (userIds: readonly unknown[]) => {
    const ids = userIds as string[];
    const subscriptions: Subscription[] = await prisma.user.findMany({
      where: {
        subscribedToUser: {
          some: {
            subscriberId: {
              in: ids,
            },
          },
        },
      },
      include: {
        subscribedToUser: true,
      },
    });

    const subscriptionsBySubscriberId = subscriptions.reduce((map, user) => {
      user.subscribedToUser.forEach((subscription) => {
        const existingSubscriptions = map.get(subscription.subscriberId) || [];
        existingSubscriptions.push(user);
        map.set(subscription.subscriberId, existingSubscriptions);
      });
      return map;
    }, new Map<string, Subscription[]>());

    const result: Subscription[][] = ids.map(
      (id) => subscriptionsBySubscriberId.get(id) || [],
    );
    return result;
  };

export const createUserLoader = (prisma: PrismaClient) =>
  new DataLoader(batchUsersByIds(prisma));

export const createSubscribedToUserLoader = (prisma: PrismaClient) =>
  new DataLoader(batchSubscribedToUser(prisma));

export const createUserToSubscribeLoader = (prisma: PrismaClient) =>
  new DataLoader(batchUserSubscribedTo(prisma));
