import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchContactsLoading, selectOneContact } from '../../store/slices/ContactSlice.ts';
import { useEffect } from 'react';
import { editContact, getOneContactById } from '../../store/thunks/contactsThunk.ts';
import { IContactMutation } from '../../types';


const EditContact = () => {
  const {contactId} = useParams<{contactId: string}>();
  const naviagte = useNavigate();
  const dispatch = useAppDispatch();

  const contact = useAppSelector(selectOneContact);
  const isLoading = useAppSelector(selectFetchContactsLoading);

  useEffect(() => {
    if (contactId) {
      dispatch(getOneContactById(contactId));
    }
  },[dispatch, contactId]);

  const updateContact = (updatedContact: IContactMutation) => {
    if (contactId) {
      dispatch(editContact({contactId, contact: updatedContact}));
      naviagte('/')
    }
  };

  if (isLoading || !contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <ContactForm addNewContact={updateContact} existingContact={contact} isEdit/>
    </div>
  );
};

export default EditContact;