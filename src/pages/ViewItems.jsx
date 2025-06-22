import React, { useEffect, useState } from 'react';
import ItemModal from '../components/ItemModal';
import EditItemModal from '../components/EditItemModal';
import styles from '../styles/ViewItems.module.css';

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedItems = items.filter(item => item.id !== id);
      localStorage.setItem('items', JSON.stringify(updatedItems));
      setItems(updatedItems);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleSaveEdit = (updatedItem) => {
    const updatedItems = items.map(it => (it.id === updatedItem.id ? updatedItem : it));
    localStorage.setItem('items', JSON.stringify(updatedItems));
    setItems(updatedItems);
    setEditItem(null);
  };

  return (
    <div className={styles.container}>

      <h2 className={styles.heading}>View Items</h2>

      <div className={styles.itemsContainer}>
        {items.map(item => (
          <div key={item.id} className={styles.card}>
            <img
              src={item.coverImage}
              alt={item.itemName}
              className={styles.cardImage}
              onClick={() => handleItemClick(item)}
            />
            <div className={styles.cardTitle}>{item.itemName}</div>
            <div className={styles.cardButtons}>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {editItem && (
        <EditItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ViewItems;
