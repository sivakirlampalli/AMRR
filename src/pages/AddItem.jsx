import React, { useState } from 'react';
import styles from '../styles/AddItem.module.css';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coverImageBase64 = await convertToBase64(coverImage);
    const additionalImagesBase64 = await Promise.all(
      Array.from(additionalImages).map(file => convertToBase64(file))
    );

    const newItem = {
      id: Date.now(),
      itemName,
      itemType,
      description,
      coverImage: coverImageBase64,
      additionalImages: additionalImagesBase64,
    };

    const existingItems = JSON.parse(localStorage.getItem('items')) || [];
    existingItems.push(newItem);
    localStorage.setItem('items', JSON.stringify(existingItems));

    setItemName('');
    setItemType('');
    setDescription('');
    setCoverImage(null);
    setAdditionalImages([]);
    setSuccessMessage('Item successfully added ✅');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Name:</label><br />
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Item Type:</label><br />
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            required
          >
            <option value="">Select type</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
          </select>
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cover Image:</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Additional Images:</label><br />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setAdditionalImages(e.target.files)}
          />
        </div>
        <br />
        <button type="submit">Add Item</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AddItem;
