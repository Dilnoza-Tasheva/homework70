import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactsList, IContact, IContactMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchAllContacts = createAsyncThunk<IContact[], void>(
  'contacts/fetchAllContacts',
  async() => {
    const response = await axiosApi<ContactsList | null>('contacts.json');
      const contactsList = response.data;

    if (contactsList === null) {
      return [];
    }

    const contacts = Object.keys(contactsList).map((id) => ({
      ...contactsList[id],
      id,
    }));

    return contacts;
  }
);

export const createContact =createAsyncThunk<void, IContactMutation>(
  'contacts/createContact',
  async (contact) => {
    await axiosApi.post('contacts.json', {...contact});
  }
);

export const getOneContactById = createAsyncThunk<IContactMutation | null, string>(
  'contacts/getOneContactById',
   async(contactId) => {
    const response = await axiosApi<IContactMutation | null>(`contacts/${contactId}.json`);
    if (!response.data) return null;
    return response.data;
   }
);

export const deleteOneContact = createAsyncThunk<void, string>(
  'contacts/deleteOneContact',
  async (contactId) => {
    await axiosApi.delete(`contacts/${contactId}.json`);
  }
);

export const editContact = createAsyncThunk<void, {contactId: string, contact: IContactMutation}>(
  'contacts/editContact',
  async({contactId, contact}) => {
    await axiosApi.put(`contacts/${contactId}.json`, {...contact});
  }
);

