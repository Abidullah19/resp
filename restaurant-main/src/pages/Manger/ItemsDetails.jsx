import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../server/Constant";

// import Footer from "../../components/Footer/Footer";
function itemDetails() {
  const { id } = useParams();
  const [itemsDetails, setitemsDetails] = useState();
  const [loading, setloading] = (false)

  const getdetails = async () => {
    setloading(true)
    try {
      const response = await api.get(`get-one-items/${id}`);
      console.log("check the response items details", response);
      setitemsDetails(response?.data?.OneItem);
      setloading(false)
    } catch (error) {
      console.log(error);
      setloading(false)
    }
  };
  useEffect(() => {
    getdetails();
  }, []);

  return (
    <Navbar>
      <div className="bg-gray-100 w-full h-auto ">
        <div className="bg-gray-100  py-8 h-screen md:h-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex   md:flex-col-reverse -mx-4">
              <div className="md:flex-1 px-4 pt-3">
                <p className="text-gray-900 font-bold   text-lg mb-4 mo">
                  {itemsDetails?.title}
                </p>
                <div className="flex sm:flex-col  mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-900   po">Price:</span>
                    <span className="text-gray-800 po ps-2">
                      {itemsDetails?.unitPrice}
                    </span>{" "}
                    <br />
                    <br />
                    <span className="font-bold text-gray-900   po">
                      category:
                    </span>
                    <span className="text-gray-800 po ps-2">
                      {itemsDetails?.category}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-gray-900   mo">
                    Description:
                  </span>
                  <p className="text-gray-900   text-sm mt-2 sarabun-thin">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    sed ante justo. Integer euismod libero id mauris malesuada
                    tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet.
                    Duis dapibus augue vel ipsum pretium, et venenatis sem
                    blandit. Quisque ut erat vitae nisi ultrices placerat non
                    eget velit. Integer ornare mi sed ipsum lacinia, non
                    sagittis mauris blandit. Morbi fermentum libero vel nisl
                    suscipit, nec tincidunt mi consectetur.
                  </p>
                </div>
              </div>
              <div className="md:flex-1 w-full px-4">
                <div className=" w-[33rem] lg:w-[20rem] md:w-full h-auto rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <img
                    className="w-full h-full o object-fill h-[23rem]  rounded-md md:w-full "
                    src={`http://localhost:5000/uploads/${itemsDetails?.image
                      .split("/")
                      .pop()}`}
                    alt="Product Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default itemDetails;
