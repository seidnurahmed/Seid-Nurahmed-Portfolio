import React from "react";

export default function ItemList({ items, onEdit, onDelete }) {
  return (
    <div className="list">
      {items.map((it) => (
        <div className="item" key={it.id}>
          <div>
            <div><strong>{it.name}</strong></div>
            <small>{it.description}</small>
          </div>
          <div className="row">
            <button className="ghost" onClick={() => onEdit(it)}>Edit</button>
            <button onClick={() => onDelete(it.id)}>Delete</button>
          </div>
        </div>
      ))}
      {items.length === 0 && <small>No items yet.</small>}
    </div>
  );
}
