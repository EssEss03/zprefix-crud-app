import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function AllItemsPage() {
  const [items, setItems] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/items`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="all-items-container">
    <h1 className="all-items-title">🧾 All Items</h1>
    <p>Browse items created by all inventory managers:</p>

    <div className="view-toggle">
      <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''}>
        📋 List View
      </button>
      <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''}>
        🧱 Grid View
      </button>
    </div>

    <div className={`items-${viewMode}`}>
      {items.map(item => (
        <div key={item.id} className="item-card">
          <Link to={`/items/${item.id}`} className="item-name">
            {item.item_name}
          </Link>
          <p>{item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  </div>
  );
}
