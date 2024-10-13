import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserMangement from "../pages/Manger/MangerDashborad";
import ItemDetails from "../pages/Manger/ItemsDetails";
import Categories from "../pages/Manger/Categories";
import Orders from "../pages/Manger/Orders";
import StockProducts from "../pages/Manger/StockProducts";

function Links() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/manger-dashborad" element={<UserMangement />} />
          <Route path="/items-details/:id" element={<ItemDetails />} />
          <Route path="/products-stocks" element={<StockProducts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Links;
