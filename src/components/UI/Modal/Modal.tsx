import * as React from 'react';

interface Props {
  show: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  contact: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    pictureUrl?: string;
  } | null;
}

const Modal: React.FC<Props> = ({show, onClose, onEdit, onDelete, contact}) => {
  if (!show || !contact) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Contact details</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-center">
            <img
              src={contact.pictureUrl}
              alt={contact.name}
              className="rounded-circle mb-3"
              width="100"
              height="100"
            />
            <h5>{contact.name}</h5>
            {contact.phone && <p><strong>Phone:</strong>{contact.phone}</p>}
            {contact.email && <p><strong>Email:</strong>{contact.email}</p>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onEdit}>Edit</button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;