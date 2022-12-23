import { ENTITY_NAMES } from '@/constants';

interface MockItemGetterParams {
  entity: string;
  uuid: string;
}

interface MockPageGetterParams {
  entity: string;
  offset: number;
  limit: number;
}

import * as userMock from '@/mocks/user.json';

const mocks = {
  [ENTITY_NAMES.USER]: userMock,
};

class MockService {
  async readPageFromFile(params: MockPageGetterParams) {
    const { entity, offset, limit } = params;
    const mock = mocks[entity];
    const res = mock.slice(offset, offset + limit);
    return res;
  }

  async readItemFromFile(params: MockItemGetterParams) {
    const { entity, uuid } = params;
    const mock = mocks[entity].default;
    const res = mock.find((item) => {
      return item.uuid === uuid;
    });
    return res || null;
  }

  async appendItemToFile(entity: string) {}

  async removeFromFile(uuid: string) {}
}

export default new MockService();
