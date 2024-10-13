import React, { useEffect, useState } from "react";
import Header from "../../components/Manger_components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeletedCategory from "../../components/Manger_components/DeleteCategory";
import EditItems from "../../components/Manger_components/EditItems";
import AddCategoryForm from "../../components/Manger_components/AddCategory";
import api from "../../server/Constant";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditCategoryForm from "../../components/Manger_components/EditCategory";

function Categories() {
  const [eiditCatergories, SetEditCatergories] = useState(false);
  const [deleteCategories, setdeleteCategories] = useState(false);
  const [addNewCategories, setAddNewCategories] = useState(false);
  const [category, setcatgory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [deleteId, setdeleteId] = useState()
  const [editId , seteditId]=useState()
  const getCategory = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await api.get('get-categories');
      setcatgory(response?.data?.categories);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false

      )
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handledelete = (id) => {
    setdeleteCategories(true)
    setdeleteId(id)

  }

  const handleEdit =(id)=>{
    SetEditCatergories(true)
    seteditId(id)
  }
  return (
    <Header>
      <ToastContainer />
      <div className="relative overflow-x-auto h-[92vh] shadow-md sm:rounded-lg mt-12 mb-5 po">
        <div className="flex items-center justify-between flex-wrap md:flex-row md:w-full md:gap-3 space-y-4 md:space-y-0 pb-4 sm:dark:bg-gray-200 dark:bg-gray-900 sm:justify-center sm:items-center">
          <div className="flex gap-20 sm:flex-col sm:justify-center sm:items-center sm:gap-2">
            <button
              className="inline-flex ms-3 mt-3 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setAddNewCategories(true)}
            >
              Add categories
            </button>
          </div>
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative mr-3">
            <input
              type="text"
              id="table-search-vehicle"
              className="block p-2 ps-10 text-sm sm:w-full text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for categories"
            />
          </div>
        </div>
        {loading ? ( // Show loading message
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : category.length === 0 ? ( // Show no data message
          <div className="flex justify-center items-center h-full">
            <span className="text-[3rem] text-gray-500">No data found</span>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Category Name</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {category.map((items) => (
                <tr
                  key={items?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{items?.name}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 mr-1">
                      <FontAwesomeIcon
                        className="text-md text-green-400 cursor-pointer"
                        icon={faPencil}
                        onClick={()=>handleEdit(items)}
                      />
                      <FontAwesomeIcon
                        className="text-md text-red-400 cursor-pointer"
                        icon={faTrash}
                        onClick={() => handledelete(items?._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {deleteCategories && <DeletedCategory setdeleteCategories={setdeleteCategories} deleteId={deleteId} getCategory={getCategory} />}
      {eiditCatergories && <EditCategoryForm editId={editId} getCategory={getCategory} SetEditCatergories={SetEditCatergories} />}
      {addNewCategories && <AddCategoryForm setAddNewCategories={setAddNewCategories} getCategory={getCategory} />}
    </Header>
  );
}

export default Categories;
