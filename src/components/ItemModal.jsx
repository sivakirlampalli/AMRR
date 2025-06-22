import React from 'react';
import styles from '../styles/Modal.module.css'; // keep this

const ItemModal = ({ item, onClose }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>{item.itemName}</h3>
        <img src={item.coverImage} alt={item.itemName} />
        <p><strong>Type:</strong> {item.itemType}</p>
        <p><strong>Description:</strong> {item.description}</p>

        <h4>Additional Images</h4>
        <div className={styles.additionalImages}>
          {item.additionalImages?.map((img, index) => (
            <img key={index} src={img} alt={`additional-${index}`} />
          ))}
        </div>

        <button onClick={onClose} style={{ marginTop: '20px' }}>Close</button>
      </div>
    </div>
  );
};

export default ItemModal;
