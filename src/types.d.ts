export interface IContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  pictureUrl: string;
}

export type IContactMutation = Omit<IContact, 'id'>