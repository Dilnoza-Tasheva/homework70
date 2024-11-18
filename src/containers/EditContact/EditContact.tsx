import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchContactsLoading, selectOneContact } from '../../store/slices/ContactSlice.ts';
import { useCallback, useEffect } from 'react';
import { editContact, getOneContactById } from '../../store/thunks/contactsThunk.ts';
import { IContactMutation } from '../../types';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const EditContact = () => {
  const {contactId} = useParams<{contactId: string}>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const contact = useAppSelector(selectOneContact);
  const isLoading = useAppSelector(selectFetchContactsLoading);

  const getContactById = useCallback(async() => {
    if (contactId) {
      await dispatch(getOneContactById(contactId));
    }
  }, [contactId]);

  useEffect(() => {
    void getContactById();
  },[getContactById]);

  const updateContact = async (updatedContact: IContactMutation) => {
    if (contactId) {
      await dispatch(editContact({contactId, contact: updatedContact}));
      navigate('/');
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {contact ? (
            <ContactForm
              addNewContact={updateContact}
              existingContact={contact}
              isEdit
            />
          ) : (
            navigate('/')
          )}
        </>
      )}
    </div>
  );
};

export default EditContact;