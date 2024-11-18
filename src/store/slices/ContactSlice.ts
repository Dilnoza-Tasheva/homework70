import { IContact, IContactMutation } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createContact,
  deleteOneContact,
  editContact,
  fetchAllContacts,
  getOneContactById
} from '../thunks/contactsThunk.ts';
import { RootState } from '../../app/store.ts';


interface ContactState {
  contacts: IContact[];
  oneContact: IContactMutation | null;
  isFetchLoading: boolean;
  isDeleteLoading: boolean | string;
  isCreateLoading: boolean;
  isEditLoading: boolean;
}

const initialState: ContactState = {
  contacts: [],
  oneContact: null,
  isFetchLoading: false,
  isDeleteLoading: false,
  isCreateLoading: false,
  isEditLoading: false,
}

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectOneContact = (state: RootState) => state.contacts.oneContact;
export const selectFetchContactsLoading = (state: RootState) => state.contacts.isFetchLoading;
export const selectCreateContactLoading = (state: RootState) => state.contacts.isCreateLoading;
export const selectEditContactLoading = (state: RootState) => state.contacts.isEditLoading;

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContacts.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.isFetchLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(deleteOneContact.pending, (state, {meta}) => {
        state.isDeleteLoading = meta.arg;
      })
      .addCase(deleteOneContact.fulfilled, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteOneContact.rejected, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(createContact.pending, (state) => {
        state.isCreateLoading = true;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createContact.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(getOneContactById.pending, (state) => {
        state.isFetchLoading = true;
        state.oneContact = null;
      })
      .addCase(getOneContactById.fulfilled, (state, action: PayloadAction<IContactMutation | null>) => {
        state.isFetchLoading = false;
        state.oneContact = action.payload;
      })
      .addCase(getOneContactById.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(editContact.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(editContact.fulfilled, (state) => {
        state.isEditLoading = false;
        state.oneContact = null;
      })
      .addCase(editContact.rejected, (state) => {
        state.isEditLoading = false;
      })
  }
});

export const contactsReducer = contactSlice.reducer;