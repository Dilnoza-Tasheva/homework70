import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { IContactMutation } from '../../types';
import { createContact } from '../../store/thunks/contactsThunk.ts';


const NewContact = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addContact = (newContact: IContactMutation) => {
    dispatch(createContact(newContact));
    navigate('/')
  };


  return (
    <div>
      <ContactForm addNewContact={addContact}/>
    </div>
  );
};

export default NewContact;