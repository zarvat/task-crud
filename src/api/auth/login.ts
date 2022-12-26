import type { LoginPayload, Pagination } from '@/store/types/params';
import MockService from '@/services/mock.service';
import { ENTITY_NAMES } from '@/constants';
import type { UserAPI } from '@/types/api';
import { getHashString } from '@/utils/getHashString';

const findUserByLogin = async (login: string): Promise<UserAPI | null> => {
  const payload: Pagination = {
    offset: 0,
    limit: Infinity,
    filter: [
      {
        field: 'login',
        value: login,
      },
    ],
  };

  const users = await MockService.readPageFromMock({
    ...payload,
    entityName: ENTITY_NAMES.USER,
  });

  if (!users.length) {
    return null;
  }
  return users[0];
};

export const login = async (payload: LoginPayload): UserAPI | null => {
  const { login, password } = payload;

  const user = await findUserByLogin(login);
  if (!user) {
    return null;
  }
  return getHashString(password) === user?.password ? user : null;
};
