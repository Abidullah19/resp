import React, { useState } from "react";
import Header from "../../components/Manger_components/Header";
import { ordersData } from "../../datajson"; // Assuming you have this data file

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <Header>
      <div className="relative overflow-x-auto h-[100vh] shadow-md sm:rounded-lg   mb-5">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-2xl p-5 font-semibold text-gray-700 ">Orders</h2>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer Name</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Total Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">{order.orderDate}</td>
                <td className="px-6 py-4">{order.totalAmount}</td>
                <td
                  className={`px-6 py-4 ${
                    order.status === "Completed"
                      ? "text-green-500"
                      : order.status === "Cancelled"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Order Details</h3>
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Customer Name:</strong> {selectedOrder.customerName}
            </p>
            <p>
              <strong>Order Date:</strong> {selectedOrder.orderDate}
            </p>
            <p>
              <strong>Total Amount:</strong> {selectedOrder.totalAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Details:</strong> {selectedOrder.details}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCloseDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Header>
  );
}

export default Orders;
