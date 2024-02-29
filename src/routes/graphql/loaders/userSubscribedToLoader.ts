import DataLoader from 'dataloader';
import { Subscription } from '../types/model/ModelTypes.js';
import { PrismaClient } from '@prisma/client';

export const batchUserSubscribedTo =
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

export const createUserToSubscribeLoader = (prisma: PrismaClient) =>
  new DataLoader(batchUserSubscribedTo(prisma));
