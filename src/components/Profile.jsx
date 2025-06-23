import React from 'react';


function Profile({ user }) {
  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <h1>Hello, {user.username}</h1>
        <p>Email: <span>{user.email}</span></p>
      </div>

      {/* Order History */}
      <div className="order-section">
        <h2>Your Orders</h2>

        {user.orders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <ul className="order-list">
            {user.orders.map((order) => (
              <li key={order.id} className="order-card">
                <p className="order-name"> {order.product_name}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Customization:</strong> {order.customization}</p>
                <p>
                  <strong>Rating:</strong>{' '}
                  {order.review?.rating ?? (
                    <span className="no-review">Not reviewed</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;
