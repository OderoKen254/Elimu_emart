import { useState } from 'react';
import AdminProductForm from '../components/AdminProductForm.jsx';
import Product from '../components/ProductCard.jsx';

function AdminPanel() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sample Notebook', price: 9.99, category: 'notebook' },
    { id: 2, name: 'Fancy Pen', price: 4.99, category: 'pen' },
  ]);

  const handleAddProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
      <AdminProductForm onAddProduct={handleAddProduct} />
      <Product products={products} onDelete={handleDelete} />
    </div>
  );
}

export default AdminPanel;