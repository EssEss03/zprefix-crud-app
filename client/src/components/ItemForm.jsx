import { useState } from 'react';

export default function ItemForm({ refreshItems }) {
  const [form, setForm] = useState({ item_name: '', description: '', quantity: 1 });
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch(`${API}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ item_name: '', description: '', quantity: 1 });
      refreshItems();
    } else {
      alert('Failed to add item');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <input placeholder="Item Name" value={form.item_name} onChange={(e) => setForm({ ...form, item_name: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })} />
      <button type="submit">Add Item</button>
    </form>
  );
}