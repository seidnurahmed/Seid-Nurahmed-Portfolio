import React, { useEffect, useState } from "react";
import { listItems, createItem, updateItem, deleteItem } from "./api";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import EditItemForm from "./components/EditItemForm";

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await listItems();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const handleCreate = async (payload) => {
    await createItem(payload);
    await refresh();
  };

  const handleUpdate = async (payload) => {
    await updateItem(payload.id, payload);
    setEditing(null);
    await refresh();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    await refresh();
  };

  return (
    <div className="container">
      <h1>Azure SQL CRUD</h1>
      <p><small>API: {process.env.REACT_APP_API_URL || "http://localhost:8080/api"}</small></p>

      {editing ? (
        <EditItemForm item={editing} onCancel={() => setEditing(null)} onSave={handleUpdate} />
      ) : (
        <AddItemForm onSave={handleCreate} />
      )}

      <div className="card" style={{marginTop: 16}}>
        <h2>Items</h2>
        {loading ? <small>Loading…</small> : (
          <ItemList items={items} onEdit={setEditing} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
