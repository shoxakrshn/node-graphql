import DataLoader from 'dataloader';
import prisma from '../types/prisma.js';
import { Member } from '../types/model/ModelTypes.js';

export const batchMemberTypeByUserIds = async (userIds: readonly unknown[]) => {
  const ids = userIds as string[];
  const members: Member[] = await prisma.memberType.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const membersMap = new Map(members.map((member) => [member.id, member]));
  return ids.map((id) => membersMap.get(id));
};
