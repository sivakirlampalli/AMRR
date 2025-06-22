import React, { useState, useEffect } from 'react';

const EditItemModal = ({ item, onClose, onSave }) => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);

  useEffect(() => {
    if (item) {
      setItemName(item.itemName);
      setItemType(item.itemType);
      setDescription(item.description);
      setCoverImage(item.coverImage);
      setAdditionalImages(item.additionalImages);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedItem = {
      ...item,
      itemName,
      itemType,
      description,
      coverImage: typeof coverImage === 'object' ? URL.createObjectURL(coverImage) : coverImage,
      additionalImages: Array.from(additionalImages).map(file =>
        typeof file === 'string' ? file : URL.createObjectURL(file)
      )
    };

    onSave(updatedItem);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Item Name:</label>
            <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} required style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label>Item Type:</label>
            <select value={itemType} onChange={e => setItemType(e.target.value)} required style={styles.input}>
              <option value="">Select type</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Shoes">Shoes</option>
              <option value="Sports Gear">Sports Gear</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Description:</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required style={styles.textarea} />
          </div>

          <div style={styles.formGroup}>
            <label>Cover Image:</label>
            <input type="file" accept="image/*" onChange={e => setCoverImage(e.target.files[0])} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label>Additional Images:</label>
            <input type="file" accept="image/*" multiple onChange={e => setAdditionalImages(e.target.files)} style={styles.input} />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.buttonPrimary}>Save Changes</button>
            <button type="button" onClick={onClose} style={styles.buttonSecondary}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 999
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    width: '90%',
    maxWidth: '500px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333'
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical',
    minHeight: '80px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  buttonSecondary: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default EditItemModal;
