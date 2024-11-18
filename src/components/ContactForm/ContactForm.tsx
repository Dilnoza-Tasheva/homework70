import * as React from 'react';
import { useState } from 'react';
import { IContactMutation } from '../../types';

interface Props {
  addNewContact: (contact: IContactMutation) => void;
  existingContact?: IContactMutation;
  isEdit?: boolean;
}

const initialStateForm = {
  name: "",
  phone: "",
  email: "",
  pictureUrl: "",
};


const ContactForm: React.FC<Props> = ({addNewContact, existingContact = initialStateForm, isEdit = false}) => {
  const [newContact, setNewContact] = useState<IContactMutation>(existingContact);

  const changeContact = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewContact((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContact.name.trim().length === 0 || newContact.email.trim().length === 0) {
      alert ("Fill in all the fields!");
    } else {
      addNewContact({
        ...newContact
      });

      if (!isEdit) {
        setNewContact({
          name: "",
          phone: "",
          email: "",
          pictureUrl: "",
        });
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Add new Contact</h3>
      <div className="form-group mb-2">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          onChange={changeContact}
          value={newContact.name}
          id="name"
          name="name"
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="phone">Phone: </label>
        <input
          type="text"
          onChange={changeContact}
          value={newContact.phone}
          id="phone"
          name="phone"
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          onChange={changeContact}
          value={newContact.email}
          id="email"
          name="email"
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="pictureUrl">Picture: </label>
        <input
          type="text"
          onChange={changeContact}
          value={newContact.pictureUrl}
          id="pictureUrl"
          name="pictureUrl"
          className="form-control"
        />
        {newContact.pictureUrl && (
          <img src={newContact.pictureUrl} alt="Preview" width="100" height="100"/>
        )}
      </div>

      <div className="d-flex">
        <button className="btn btn-success">Save</button>
        <button className="btn btn-danger">Back</button>
      </div>
    </form>
  );
};

export default ContactForm;