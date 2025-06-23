import React, { useState } from 'react';

const AdminProductForm = ({ onProductCreated, onProductUpdated }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editProductId, setEditProductId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, price: parseFloat(price), category };
    const url = editProductId ? `/api/products/${editProductId}` : '/api/products';
    const method = editProductId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await response.json();

    if (editProductId) {
      onProductUpdated(data);
    } else {
      onProductCreated(data);
    }
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('');
    setEditProductId(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-900">{editProductId ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block text-gray-700">Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 p-2 rounded-md w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <label className="block text-gray-700 mt-4">Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="border border-gray-300 p-2 rounded-md w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" step="0.01" />
        <label className="block text-gray-700 mt-4">Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 p-2 rounded-md w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">{editProductId ? 'Update' : 'Add'}</button>
        {editProductId && <button type="button" onClick={resetForm} className="mt-4 ml-2 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-200">Cancel</button>}
      </form>
    </div>
  );
};

export default AdminProductForm;