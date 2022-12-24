import { ENTITY_NAMES } from '@/constants';
import * as userMock from '@/mocks/user.json';
import * as commentMock from '@/mocks/comment.json';
import type { Entity } from '@/types/api';
import type { FilterField } from '@/store/types/params';
import { uuidGenerator } from '@/utils/uuidGenerator';
interface MockItemGetterParams {
  entityName: string;
  uuid: string;
}

interface MockItemSetterParams<T> {
  entityName: string;
  item: T;
}

interface MockPageGetterParams {
  entityName: string;
  offset: number;
  limit: number;
  filter: FilterField[];
}

const mocks = {
  [ENTITY_NAMES.USER]: userMock,
  [ENTITY_NAMES.COMMENT]: commentMock,
};

class MockService {
  async readPageFromMock(params: MockPageGetterParams) {
    const { entityName, offset, limit, filter } = params;
    const mock = mocks[entityName].default;
    const filteredMock = mock.filter((item: Entity) => {
      let isAllFiltersTrue = true;
      for (const { field, value } of filter) {
        if (!(field in item)) {
          throw new Error(`Поля ${field} нет в интерфейсе `);
        }
        if (Object.prototype.hasOwnProperty.call(item, field) && item[field] !== value) {
          isAllFiltersTrue = false;
          break;
        }
      }
      return isAllFiltersTrue;
    });
    const res = filteredMock.slice(offset, offset + limit);
    return res;
  }

  async readItemFromMock(params: MockItemGetterParams) {
    const { entityName, uuid } = params;
    const mock = mocks[entityName].default;
    const res = mock.find((item: Entity) => {
      return item.uuid === uuid;
    });
    return res || null;
  }

  async appendItemToMock<T>(params: MockItemSetterParams<T>) {
    const { item, entityName } = params;
    const mock = mocks[entityName].default;
    mock.push(item);

    return true;
  }

  async removeFromMock(uuid: string) {}
}

export default new MockService();
