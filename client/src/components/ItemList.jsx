import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const fetchItems = async () => {
    const res = await fetch(`${API}/users/${userId}/items`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>
              {item.item_name} - Qty: {item.quantity}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}