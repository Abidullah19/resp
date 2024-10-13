import React, { useEffect, useState } from "react";
import api from "../../server/Constant";
import Swal from "sweetalert2";

const EditItem = ({ itemData, getItems, SetEditItems }) => {
  const [formData, setFormData] = useState({
    title: itemData?.title || "",
    unitPrice: itemData?.unitPrice || "",
    category: itemData?.category || "",
    image: itemData?.image ? `http://localhost:5000/uploads/${itemData.image}` : "",
    productsUsed: itemData?.productsUsed || [],
  });
  const [getCat, setGetCat] = useState([]);
  const [imagePreview, setImagePreview] = useState(itemData?.image || null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [productList, setProductList] = useState([]);
  const [loading, setloading] = useState(false)
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Display image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission (update the item)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("unitPrice", formData.unitPrice);
    formDataToSubmit.append("category", formData.category);

    if (formData.image) {
      formDataToSubmit.append("image", formData.image); // Append image if it's updated
    }

    formDataToSubmit.append(
      "productsUsed",
      JSON.stringify(formData.productsUsed)
    );
    setloading(true)
    try {
      const response = await api.put(`edit-items/${itemData._id}`, formDataToSubmit);

      Swal.fire({
        title: 'success!',
        text: response?.data?.message,
        icon: 'success',
        showConfirmButton: false, // Hide the OK button
        timer: 2000, // Close after 2 seconds
        timerProgressBar: true,
      });
      getItems(); // Refresh the items list
      SetEditItems(false); // Close the modal
      setloading(false)
    } catch (error) {
      Swal.fire({
        title: 'error!',
        text: error?.response?.data?.message,
        icon: 'error',
        showConfirmButton: false, // Hide the OK button
        timer: 2000, // Close after 2 seconds
        timerProgressBar: true,
      });
      setloading(false)
    }
  };

  // Fetch categories
  const getCategory = async () => {
    try {
      const response = await api.get("get-categories");
      setGetCat(response?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products for stock modal
  const getProducts = async () => {
    try {
      const response = await api.get("all-products");
      setProductList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  const handleProductCheck = (productId, checked, weight = "1") => {
    if (checked) {
      // Add product with default weight if checked
      setFormData((prevData) => ({
        ...prevData,
        productsUsed: [
          ...prevData.productsUsed,
          { productId, usedWeight: weight },
        ],
      }));
    } else {
      // Remove product if unchecked
      setFormData((prevData) => ({
        ...prevData,
        productsUsed: prevData.productsUsed.filter(
          (product) => product.productId !== productId
        ),
      }));
    }
  };

  const handleWeightChange = (productId, weight) => {
    setFormData((prevData) => ({
      ...prevData,
      productsUsed: prevData.productsUsed.map((product) =>
        product.productId === productId
          ? { ...product, usedWeight: weight }
          : product
      ),
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 w-[30rem] rounded-lg shadow-md mo border border-gray-300 po h-screen overflow-y-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => SetEditItems(false)}
          className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
          ></path>
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
          ></path>
        </svg>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Edit Item
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Uploaded"
                className="mt-2 w-full rounded-lg border border-gray-300"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Price
            </label>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Price"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {getCat?.map((items) => (
                <option key={items?._id} value={items?.name}>
                  {items?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowStockModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none focus:bg-green-600"
            >
              Edit Stock
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600"
            >
              {loading ? "Loading..." : " Update"}
            </button>
          </div>
        </form>
      </div>

      {showStockModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 w-[40rem] rounded-lg shadow-md border border-gray-300">
            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Edit Stock
            </h3>

            <table className="w-full mb-4 border-collapse rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-4 text-left text-gray-700">Image</th>
                  <th className="border p-4 text-left text-gray-700">Product Name</th>
                  <th className="border p-4 text-left text-gray-700">Add</th>
                  <th className="border p-4 text-left text-gray-700">Weight</th>
                </tr>
              </thead>
              <tbody>
                {productList?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="border p-2">
                      <img
                        src={`http://localhost:5000/productsImage/${product?.images.split("/").pop()}`}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-full border border-gray-300 shadow-sm"
                      />
                    </td>
                    <td className="border p-4 text-gray-800">{product.name}</td>
                    <td className="border p-4 text-center">
                      <input
                        type="checkbox"
                        onChange={(e) => handleProductCheck(product._id, e.target.checked)}
                        className="cursor-pointer"
                        checked={formData.productsUsed.some((item) => item.productId === product._id)}
                      />
                    </td>
                    <td className="border p-4">
                      <input
                        type="number"
                        placeholder="Weight"
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(e) => handleWeightChange(product._id, e.target.value)}
                        value={
                          formData.productsUsed.find(
                            (item) => item.productId === product._id
                          )?.usedWeight || ""
                        }
                        disabled={
                          !formData.productsUsed.some(
                            (item) => item.productId === product._id
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors mr-2"
                onClick={() => setShowStockModal(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => setShowStockModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditItem;
