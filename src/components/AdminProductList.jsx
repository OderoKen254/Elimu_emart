
function AdminProductList({ products, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', category: '' });
  const [message, setMessage] = useState('');

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token') || 'test-token';
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        onDelete(id);
        setMessage('Product deleted successfully!');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to delete product');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error deleting product');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ name: product.name, price: product.price, category: product.category });
  };

  const handleSaveEdit = async (id) => {
    const token = localStorage.getItem('token') || 'test-token';
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });
      if (response.ok) {
        onEdit(id, editForm); // Notify parent to update state
        setEditingId(null);
        setMessage('Product updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to update product');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error updating product');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Product List</h3>
      {message && <p className="text-sm mt-2 mb-2 text-green-600">{message}</p>}
      {products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              {editingId === product.id ? (
                <div className="w-full">
                  <div className="mb-2">
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                      className="w-1/3 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                    />
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleChange}
                      step="0.01"
                      className="w-1/3 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                    />
                    <select
                      name="category"
                      value={editForm.category}
                      onChange={handleChange}
                      className="w-1/3 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="notebook">Notebook</option>
                      <option value="planner">Planner</option>
                      <option value="pen">Pen</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handleSaveEdit(product.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-600">
                    {product.name} - ${product.price.toFixed(2)} ({product.category})
                  </span>
                  <div>
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminProductList;