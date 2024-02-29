import DataLoader from 'dataloader';
import prisma from '../types/prisma.js';
import { Subscription } from '../types/model/ModelTypes.js';

export const batchUserSubscribedTo = async (userIds: readonly unknown[]) => {
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
