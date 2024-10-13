import React, { useEffect, useState } from "react";
import Header from "../../components/Manger_components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ItemsDelate from "../../components/Manger_components/ItemsDelete";
import EditItems from "../../components/Manger_components/EditItems";
import AddNewItems from "../../components/Manger_components/AddNewtems";
import { Link } from "react-router-dom";
import api from "../../server/Constant";

function UserMangement() {
  const [eiditItems, SetEditItems] = useState(false);
  const [deleteItems, setdeleteItems] = useState(false);
  const [addNewItems, setAddNewItems] = useState(false);
  const [Items, setIterms] = useState();
  const [deleteItem, setdeleteItem] = useState();
  const [loading, setloading] = useState(false)
  const [update, setupdate] = useState()
  const getItems = async () => {
    setloading(true)
    try {
      const items = await api.get("getAll-items");
      console.log("items checing" , items)
      setIterms(items?.data?.allitems);
      setloading(false)
    } catch (error) {
      console.log(error);
      setloading(false)
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  const handledelete = (items) => {
    setdeleteItem(items?._id);
    setdeleteItems(true);
  };
  const handleedit = (items) => {
    SetEditItems(true)
    setupdate(items)
  }

  return (
    <Header>
      <div className="relative overflow-x-auto  h-[89vh] shadow-md sm:rounded-lg mt-12 mb-5 po">
        <div className="flex items-center   justify-between flex-column flex-wrap md:flex-row md:w-full md:gap-3 space-y-4 md:space-y-0 pb-4  sm:dark:bg-gray-200  dark:bg-gray-900 sm:justify-center sm:items-center">
          <div className="flex gap-20 sm:flex-col sm:justify-center sm:items-center sm:gap-2">
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex ms-3 mt-3 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setAddNewItems(true)}
            >
              Add New
            </button>
          </div>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mr-3">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-vehicle"
              className="block p-2 ps-10 text-sm sm:w-full text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for Items"
            />
          </div>
        </div>
        {loading ? (<div className="flex justify-center items-center h-full">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>) : Items?.length === 0 ? (<div className="flex justify-center items-center h-full">
          <span className="text-[3rem] text-gray-500">No data found</span>
        </div>) : <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title Name
              </th>
              <th scope="col" className="px-6 py-3">
                category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Veiw
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Items?.map((items) => (
              <tr
                key={items?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`http://localhost:5000/uploads/${items?.image
                      .split("/")
                      .pop()}`}
                    alt="Jese image"
                  />
                </th>
                <td className="px-6 py-4">{items?.title}</td>

                <td className="px-6 py-4">
                  <li href="#" className="text-base hover:underline list-none">
                    {items?.category}
                  </li>
                </td>
                <td className="px-6 py-4">
                  <li href="#" className="    hover:underline list-none">
                    ${items?.unitPrice}
                  </li>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/items-details/${items?._id}`}>
                    <FontAwesomeIcon icon={faEye} className="cursor-pointer" />
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      className="text-md text-green-400 cursor-pointer"
                      icon={faPencil}
                      onClick={() => handleedit(items)}
                    />
                    <FontAwesomeIcon
                      className="text-md text-red-400 cursor-pointer"
                      icon={faTrash}
                      onClick={() => handledelete(items)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}

      </div>
      {deleteItems && (
        <ItemsDelate
          getItems={getItems}
          setdeleteItems={setdeleteItems}
          id={deleteItem}
        />
      )}
      {eiditItems && <EditItems getItems={getItems} itemData={update} SetEditItems={SetEditItems} />}
      {addNewItems && (
        <AddNewItems getItems={getItems} addNewItems={setAddNewItems} />
      )}
    </Header>
  );
}

export default UserMangement;
