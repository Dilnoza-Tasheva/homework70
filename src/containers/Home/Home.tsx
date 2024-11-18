import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectContacts, selectFetchContactsLoading } from '../../store/slices/ContactSlice.ts';
import { useCallback, useEffect, useState } from 'react';
import { deleteOneContact, fetchAllContacts } from '../../store/thunks/contactsThunk.ts';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const contacts = useAppSelector(selectContacts);
  const isFetchLoading = useAppSelector(selectFetchContactsLoading);
  const [selectedContact, setSelectedContact] = useState<{ id: string; name: string; phone?: string; email?: string; pictureUrl?: string } | null>(null);

  const fetchContacts = useCallback(async() => {
    await dispatch(fetchAllContacts());
  },[]);

  useEffect(() => {
    void fetchContacts();
  }, [fetchContacts]);

  const deleteContact = async(contactId: string) => {
    await dispatch(deleteOneContact(contactId));
    dispatch(fetchAllContacts());
    setSelectedContact(null);
  };

  const editContact = () => {
    if (selectedContact) {
      navigate(`/editContact/${selectedContact.id}`);
    }
  }

  return (
    <div>
      <h3>Contacts</h3>
      {isFetchLoading ? (
        <Spinner/>
      ) : (
        <ul className="list-group">
          {contacts.map((contact) => (
            <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => setSelectedContact(contact)}>
              <div className="d-flex align-items-center">
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  width="50"
                  height="50"
                  className="rounded-circle me-3"
                />
                <div>
                  <h4 className="mb-1">{contact.name}</h4>
                  {contact.phone && <p>Phone: {contact.phone}</p>}
                  <br/>
                  {contact.email && <p>Email: {contact.email}</p>}
                </div>
              </div>
            </li>
            ))}
        </ul>
      )}

      <Modal
        show={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        onEdit={editContact}
        onDelete={() => deleteContact(selectedContact?.id || '')}
      contact={selectedContact}
      />
    </div>
  );
};

export default Home;