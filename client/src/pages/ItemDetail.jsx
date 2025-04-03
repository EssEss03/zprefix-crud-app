import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ item_name: '', description: '', quantity: 1 });

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${API}/items/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setForm({ item_name: data.item_name, description: data.description, quantity: data.quantity });
      });
  }, [id]);

  if (!item) return <p>Loading...</p>;

  // ✅ Step 2: Submit Updated Item
  const handleUpdate = async () => {
    const res = await fetch(`${API}/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updatedItem = await res.json();
      setItem(updatedItem);
      setEditMode(false);
    } else {
      alert('Failed to update item.');
    }
  };

  // ✅ Step 3: Delete Item
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this item?')) {
      const res = await fetch(`${API}/items/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert('Item deleted.');
        navigate('/dashboard');
      } else {
        alert('Failed to delete item.');
      }
    }
  };

  return (
    <div className="item-detail-container">
    <h1 className="item-detail-title">📝 Item Detail</h1>

    {!editMode ? (
      <>
        <h2 className="item-name">{item.item_name}</h2>
        <p className="item-description">{item.description}</p>
        <p className="item-quantity">📦 Quantity: {item.quantity}</p>

        <div className="button-group">
          <button onClick={() => setEditMode(true)} className="edit-button">Edit</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
          <button onClick={() => navigate('/dashboard')} className="back-button">← Back to Dashboard</button>
        </div>
      </>
    ) : (
      <div className="edit-form">
        <input
          className="input-field"
          value={form.item_name}
          onChange={(e) => setForm({ ...form, item_name: e.target.value })}
        />
        <textarea
          className="textarea-field"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="input-field"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
        />
        <div className="button-group">
          <button onClick={handleUpdate} className="save-button">Save Changes</button>
          <button onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>
        </div>
      </div>
    )}
  </div>
  );
}