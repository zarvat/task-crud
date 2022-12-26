import type { UserView } from '@/types/view';
import MockService from '@/services/mock.service';
import { ENTITY_NAMES } from '@/constants';

export const getUsersByIDs = async (ids: Set<string>): Promise<UserView[]> => {
  const userFilter = [];
  for (const id of ids) {
    userFilter.push({
      field: 'uuid',
      value: id,
    });
  }

  const users = [];

  for (const userId of ids) {
    const user = await MockService.readItemFromMock({
      entityName: ENTITY_NAMES.USER,
      uuid: userId,
    }).catch((error) => {
      return Promise.reject(error);
    });
    users.push(user);
  }

  return users;
};
