export interface FilterField {
  field: string;
  value: string;
}
export interface Pagination {
  offset: number;
  limit: number;

  filter?: FilterField[];
}

export interface PayloadForCommentsPage extends Pagination {
  receiverID: string;
}

export interface IDPayload {
  uuid: string;
}

export interface LoginPayload {
  login: string;
  password: string;
}
