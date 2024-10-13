import React, { useEffect, useState } from 'react'
import Header from '../../components/Manger_components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import api from '../../server/Constant'
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import AddProductModal from '../../components/Manger_components/AddStock'
import Stockdelete from '../../components/Manger_components/Stockdelete'
import Updatestock from '../../components/Manger_components/UpdateStock'

function StockProducts() {
    const [products, setproducts] = useState()
    const [addModel, setaddModel] = useState(false)
    const [deletemodel, setdeletemodel] = useState(false)
    const [deleteId, setdeleteId] = useState()
    const [loading, setloading] = useState(false)
    const [editstock, seteditstock] = useState()
    const [update, setupdate] = useState()
    const getProducts = async () => {
        setloading(true)
        try {
            const response = await api.get('all-products')
            setproducts(response?.data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }

    }

    useEffect(() => {
        getProducts()
    }, [])
    const handledelete = (items) => {

        setdeletemodel(true)
        setdeleteId(items?._id)


    }

    const handleedit = (items) => {
        setupdate(items)
        seteditstock(true)
    }
    return (
        <>
            <Header>
                <div className="relative overflow-x-auto  h-[89vh] shadow-md sm:rounded-lg mt-12 mb-5 po">
                    <div className="flex items-center   justify-between flex-column flex-wrap md:flex-row md:w-full md:gap-3 space-y-4 md:space-y-0 pb-4  sm:dark:bg-gray-200  dark:bg-gray-900 sm:justify-center sm:items-center">
                        <div className="flex gap-20 sm:flex-col sm:justify-center sm:items-center sm:gap-2">
                            <button
                                id="dropdownActionButton"
                                data-dropdown-toggle="dropdownAction"
                                className="inline-flex ms-3 mt-3 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                                onClick={() => setaddModel(true)}
                            >
                                Add New stock
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
                    </div>) : products?.length === 0 ? (<div className="flex justify-center items-center h-full">
                        <span className="text-[3rem] text-gray-500">No data found</span>
                    </div>) : (<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Weight
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
                            {products?.map((items) => (
                                <tr
                                    key={items?._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={`http://localhost:5000/productsImage/${items?.images
                                                .split("/")
                                                .pop()}`}
                                            alt="Jese image"
                                        />
                                    </th>
                                    <td className="px-6 py-4">{items?.name}</td>

                                    <td className="px-6 py-4">
                                        <li href="#" className="text-base hover:underline list-none">
                                            {items?.weight}kg
                                        </li>
                                    </td>

                                    <td className="px-6 py-4">
                                        <Link
                                        //  to={`/items-details/${items?._id}`}
                                        >
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
                    </table>)}

                </div>
            </Header>
            {addModel && <AddProductModal setaddModel={setaddModel} getProducts={getProducts} />}
            {deletemodel && <Stockdelete deleteId={deleteId} getProducts={getProducts} setdeletemodel={setdeletemodel} />}
            {editstock && <Updatestock seteditstock={seteditstock} getProducts={getProducts} update={update}/>}
        </>
    )
}

export default StockProducts
