import { User } from '../types/model/ModelTypes.js';
import prisma from '../types/prisma.js';

export const batchUsersByIds = async (userIds: readonly unknown[]) => {
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
