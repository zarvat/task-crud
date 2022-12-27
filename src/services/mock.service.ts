import { ENTITY_NAMES } from '@/constants';
import * as userMock from '@/mocks/user.json';
import * as commentMock from '@/mocks/comment.json';
import * as taskMock from '@/mocks/task.json';
import type { Entity } from '@/types/api';
import type { FilterField } from '@/store/types/params';

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
  filter?: FilterField[];
}

const mocks = {
  [ENTITY_NAMES.USER]: userMock.default,
  [ENTITY_NAMES.COMMENT]: commentMock.default,
  [ENTITY_NAMES.TASK]: taskMock.default,
};

class MockService {
  async readPageFromMock(params: MockPageGetterParams) {
    const { entityName, offset, limit, filter } = params;
    const mock = mocks[entityName];
    if (!filter) {
      return mock.slice(offset, offset + limit);
    }
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
    return filteredMock.slice(offset, offset + limit);
  }

  async readItemFromMock(params: MockItemGetterParams) {
    const { entityName, uuid } = params;
    const mock = mocks[entityName];
    const res = mock.find((item: Entity) => {
      return item.uuid === uuid;
    });
    return res || null;
  }

  async appendItemToMock<T extends Entity>(params: MockItemSetterParams<T>) {
    const { item, entityName } = params;
    const mock = mocks[entityName];
    mock.push(item);

    return true;
  }

  async updateItemInMock<T extends Entity>(params: MockItemSetterParams<T>) {
    const { item, entityName } = params;
    const mock = mocks[entityName];
    const indexForUpdateItem = mock.findIndex((it: T) => it.uuid === item.uuid);
    if (indexForUpdateItem === -1) {
      throw new Error(`${entityName} с id ${item.uuid} не найден`);
    }
    mock[indexForUpdateItem] = item;

    return true;
  }

  async removeFromMock(params: MockItemGetterParams) {
    const { entityName, uuid } = params;
    const mock = mocks[entityName];
    const indexForDeleteItem = mock.findIndex((item: Entity) => {
      return item.uuid === uuid;
    });

    if (indexForDeleteItem === -1) {
      throw new Error(`${entityName} с id ${uuid} не найден`);
    }

    mock.splice(indexForDeleteItem, 1);

    return true;
  }
}

export default new MockService();
