import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import api from '../../server/Constant';
import Swal from "sweetalert2";
function AddProductModal({ setaddModel, getProducts }) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // For image preview

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);


        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file); // This reads the file as a data URL for preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('weight', weight);
        formData.append('image', image);

        try {
            const response = await api.post('add-products', formData);
            Swal.fire({
                title: 'success!',
                text: response?.data?.message,
                icon: 'success',
                showConfirmButton: false, // Hide the OK button
                timer: 2000, // Close after 2 seconds
                timerProgressBar: true,
            });
            setaddModel(false)
            getProducts()

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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="relative bg-white p-8 w-[30rem] rounded-lg shadow-md border border-gray-300 h-auto overflow-y-auto">

                {/* Close Icon (X) in top right */}
                <FontAwesomeIcon
                    icon={faTimes}
                    className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-red-500 transition duration-300"
                    size="lg"
                    onClick={() => setaddModel(false)}

                />

                <h2 className="text-xl font-semibold mb-4 text-center p-2">Add New Product</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Product Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={name}
                            placeholder='Enter product name'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Product Weight */}
                    <div className="mb-4">
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                        <input
                            type="number"
                            id="weight"
                            placeholder='Enter the product weight'
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input
                            type="file"
                            id="image"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />

                        {/* Image Preview */}
                        {previewImage && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700">Image Preview:</h4>
                                <img
                                    src={previewImage}
                                    alt="Selected Preview"
                                    className="mt-2 rounded-md shadow-md w-full h-40 object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-3">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProductModal;
