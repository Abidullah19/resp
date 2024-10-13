import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Navbar({ children }) {
  const [nav, setNav] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const naviagte = useNavigate();

  const toggleServicesDropdown = () => {
    setServicesDropdown(!servicesDropdown);
  };

  return (
    <div>
      <div className="relative">
        <div className="w-full  h-[90px] shadow-md flex bg-[#0973ba]   items-center ">
          <div className="ms-[7rem] xl:ms-5  h-auto navbarsection">
            <img
            //   src={logo}
              alt=""
              onClick={() => naviagte("/")}
              className="cursor-pointer"
            />
          </div>
          <ul className="flex ms-[4rem] xl:ms-[2rem] lg:hidden navbarsection">
            <li className="sarabun-thin uppercase ps-[3rem] xl:ps=[0.4rem] duration-300 hover:text-[#ff3d24] font-semibold text-white">
              {" "}
              <Link to="/">Home</Link>{" "}
            </li>
            <li className="sarabun-thin uppercase ps-[3rem] xl:ps=[0.4rem] duration-300 hover:text-[#ff3d24] font-semibold text-white">
              <div className="relative ">
                <span
                  onClick={toggleServicesDropdown}
                  className="cursor-pointer"
                >
                  Services
                  {!servicesDropdown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block ml-1 mb-1 text-gray-200 font-bold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block ml-1 mb-1 text-gray-200 font-bold transform rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </li>
            <li className="sarabun-thin uppercase ps-[3rem] xl:ps=[0.4rem] duration-300 hover:text-[#ff3d24] font-semibold text-white">
              {" "}
              <Link to="/booking-services">Booking </Link>{" "}
            </li>
            <li className="sarabun-thin uppercase ps-[3rem] xl:ps=[0.4rem] duration-300 hover:text-[#ff3d24] font-semibold text-white">
              {" "}
              <Link to="/about">About Us</Link>{" "}
            </li>
            <li className="sarabun-thin uppercase ps-[3rem] xl:ps=[0.4rem] duration-300 hover:text-[#ff3d24] font-semibold text-white">
              {" "}
              <Link to="/contact">Contact Us</Link>{" "}
            </li>
          </ul>

          <div className="flex items-center absolute right-[5rem] lg:right-[1rem] navbarsection ">
            <li className="sarabun-thin lg:hidden  uppercase list-none duration-300 hover:text-[#ff3d24] font-semibold text-white">
              <Link to="/signin">sign in</Link>
            </li>
            <li className="sarabun-thin lg:hidden  border-[2px] border-white h-[2em] rounded-sm flex justify-center items-center uppercase list-none w-[5rem] ms-[3rem] duration-300 hover:text-[#fff] font-semibold text-white hover:bg-[#1dbf73] hover:border-none">
              <Link to="/signup">join</Link>
            </li>
            {!nav ? (
              <FontAwesomeIcon
                className="barsicon hidden lg:inline-flex  max-md:text-lg max-md:pt-7 max-md:ps-4 text-[2rem] text-white"
                icon={faBars}
                onClick={() => setNav(true)}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => setNav(false)}
                className="barsicon hidden lg:inline-flex max-md:text-lg max-md:pt-7 max-md:ps-4 text-[2rem] text-white"
                icon={faXmark}
              />
            )}
          </div>
        </div>
        {servicesDropdown && (
          <div
            style={{ transition: "top 0.5s ease" }}
            className="absolute w-full h-auto mo    bg-[#0973ba] border-t-[1px] z-10   lg:hidden    shadow-lg "
          >
            <ul className="col-span-2   grid grid-cols-3 gap-3 max-w-4xl mx-auto ">
              <li className="pt-3 text-sm ps-2 ">
                <Link
                  to="/routine-maintence"
                  className="text-white text-sm    hover:text-[#ff3d24] capitalize   "
                >
                  Routine Maintenance
                </Link>
              </li>
              <li className="pt-3 text-sm ps-2 ">
                <Link
                  to="/brake-services"
                  className="text-white hover:text-[#ff3d24] capitalize  "
                >
                  Brake Services
                </Link>
              </li>
              <li className="pt-3 text-sm ps-2 ">
                <Link
                  to="/engine-diagnostice"
                  className="text-white hover:text-[#ff3d24] capitalize  "
                >
                  Engine Diagnostics
                </Link>
              </li>
              <li className="pt-3 text-sm ps-2 ">
                <Link
                  to="/trnsmission-service"
                  className="text-white hover:text-[#ff3d24] capitalize  "
                >
                  Transmission Services
                </Link>
              </li>
              <li className="pt-3 text-sm ps-2 pb-2">
                <Link
                  to="/eletrical-system"
                  className="text-white hover:text-[#ff3d24] capitalize  "
                >
                  Electrical Systems
                </Link>
              </li>
            </ul>
            <div className="col-span-1"></div>
          </div>
        )}
      </div>
      {nav && (
        <div
          className={`flex hidden lg:inline-flex flex-col sm:items-center lg:items-center absolute inset-0 z-30 mt-[4em] bg-[#0973ba]  transition-all duration-500 ease-in-out transform translate-y-0 opacity-100`}
        >
          <div className="flex po  flex-col justify-center items-center  ">
            <li className="list-none pt-[2rem]">
              <Link
                to="/"
                className="font-semibold text-[20px]  text-[#FFFFFF] "
              >
                Home
              </Link>
            </li>
            <li className="list-none ps-7 pt-[2rem] lg:pt-5 lg:ps-0 sm:p-0 sm:pt-2">
              <span
                className="font-semibold text-[20px] text-white cursor-pointer"
                onClick={toggleServicesDropdown}
              >
                Services
              </span>
              {servicesDropdown && (
                <div className="absolute bg-gray-600 mt-2 p-2 rounded shadow-lg">
                  <ul className="po flex flex-col">
                    <li>
                      <Link
                        to="/routine-maintence"
                        className="text-white hover:text-[#ff3d24] hover:underline"
                      >
                        Routine Maintenance
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/brake-services"
                        className="text-white hover:text-[#ff3d24] hover:underline"
                      >
                        Brake Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/engine-diagnostice"
                        className="text-white hover:text-[#ff3d24] hover:underline"
                      >
                        Engine Diagnostics
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/trnsmission-service"
                        className="text-white hover:text-[#ff3d24] hover:underline"
                      >
                        Transmission Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/eletrical-system"
                        className="text-white hover:text-[#ff3d24] hover:underline"
                      >
                        Electrical Systems
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="list-none ps-7 lg:ps-0 pt-[2rem] lg:pt-5 sm:p-0 sm:pt-2">
              <Link
                to="/booking-services"
                className="font-semibold text-[20px]  text-[#FFFFFF] "
              >
                Booking
              </Link>
            </li>
            <li className="list-none ps-7 lg:ps-0 pt-[2rem] lg:pt-5 sm:p-0 sm:pt-2">
              <Link
                to="/about"
                className="font-semibold text-[20px]  text-[#FFFFFF]  "
              >
                About Us
              </Link>
            </li>

            <li className="list-none ps-7 lg:ps-0 pt-[2rem] lg:pt-5 sm:p-0 sm:pt-2">
              <Link
                to="/contact"
                className="font-semibold text-[20px]  text-[#FFFFFF]   "
              >
                Contact Us
              </Link>
            </li>
          </div>

          <div className="flex flex-col gap-5 mt-5 items-center justify-center ">
            <li className="sarabun-thin    uppercase list-none duration-300 hover:text-[#ff3d24] font-semibold text-white">
              <Link to="/signin">sign in</Link>
            </li>
            <li className="sarabun-thin l   border-[2px] border-white h-[2em] rounded-sm flex justify-center items-center uppercase list-none w-[5rem]   duration-300 hover:text-[#fff] font-semibold text-white hover:bg-[#1dbf73] hover:border-none">
              <Link to="/signup">join</Link>
            </li>
          </div>
        </div>
      )}

      <div className=" ">{children}</div>
    </div>
  );
}

export default Navbar;
