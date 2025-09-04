import React, { useEffect, useState } from "react";

export default function EditItemForm({ item, onCancel, onSave }) {
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");

  useEffect(() => {
    setName(item?.name || "");
    setDescription(item?.description || "");
  }, [item]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ ...item, name, description });
  };

  if (!item) return null;

  return (
    <form className="card" onSubmit={submit}>
      <h2>Edit Item</h2>
      <div className="row" style={{flexDirection: "column"}}>
        <input placeholder="Name *" value={name} onChange={e => setName(e.target.value)} />
        <textarea placeholder="Description" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        <div className="row">
          <button type="submit">Save</button>
          <button type="button" className="ghost" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
