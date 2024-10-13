import React, { useState } from "react";
import api from '../../server/Constant';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const AddCategoryForm = ({ setAddNewCategories, getCategory }) => {
  const [categoryName, setCategoryName] = useState({ name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('add-category', categoryName);
      Swal.fire({
        title: 'success!',
        text: response?.data?.message,
        icon: 'success',
        showConfirmButton: false, // Hide the OK button
        timer: 2000, // Close after 2 seconds
        timerProgressBar: true,
      });

      setAddNewCategories(false);
      getCategory();

    } catch (error) {
      Swal.fire({
        title: 'error!',
        text: error?.response?.data?.message,
        icon: 'error',
        showConfirmButton: false, // Hide the OK button
        timer: 2000, // Close after 2 seconds
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 w-96 rounded-lg shadow-md border border-gray-300 max-h-screen overflow-y-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setAddNewCategories(false)}
            className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
            viewBox="0 0 320.591 320.591"
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            />
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            />
          </svg>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Add New Category
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName.name}
              onChange={(e) => setCategoryName({ name: e.target.value })} // Update the correct property
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Category Name"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategoryForm;
