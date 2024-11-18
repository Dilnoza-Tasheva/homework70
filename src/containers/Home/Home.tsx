import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectContacts, selectFetchContactsLoading } from '../../store/slices/ContactSlice.ts';
import { useEffect } from 'react';
import { fetchAllContacts } from '../../store/thunks/contactsThunk.ts';


const Home = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const isFetchLoading = useAppSelector(selectFetchContactsLoading);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  return (
    <div>
      <h3>Contacts</h3>
      {isFetchLoading ? (
        <p>Loading</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <img
                src={contact.pictureUrl}
                alt={contact.name}
                width="50"
                height="50"
                style={{borderRadius: '50%'}}
              />
              <div>
                <h4>{contact.name}</h4>
                {contact.phone && <p>Phone: {contact.phone}</p>}
                {contact.email && <p>Email: {contact.email}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;