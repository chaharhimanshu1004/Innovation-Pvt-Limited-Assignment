import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { useSelector } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = useSelector((state) => !!state.user.user);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/"); 
    } else {
      const fetchProducts = async () => {
        try {
          const response = await fetch("https://dummyjson.com/products");
          if (response.ok) {
            const data = await response.json();
            setProducts(data.products);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleSearch = async () => {
    try {

      const response = await fetch("https://dummyjson.com/products");
      if (response.ok) {
        const data = await response.json();
        let filteredProducts = data.products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
       
        const priceSortOption = document.getElementById("priceSort").value;
        if (priceSortOption === "low") {
          filteredProducts.sort((a, b) => a.price - b.price); 
        } else if (priceSortOption === "high") {
          filteredProducts.sort((a, b) => b.price - a.price); 
        }
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="flex justify-between mt-[30px] mx-[160px]">
        <div className="flex items-center  -mt-[15px] ">
          <select
            id="priceSort"
            className="border border-slate-900 rounded-md px-4 py-2 focus:outline-none focus:ring-1 ml-4"
            onChange={handleSearch}
          >
            <option value="">All Prices</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
        <div className=" flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product..."
            className="border border-slate-400 w-[350px] rounded-md px-4 py-2 focus:outline-none focus:ring-1 "
            onKeyDown={handleKeyDown}
          />
          <div>
            <button
              className="  flex items-center cursor-pointer font-semibold  bg-[rgb(235,69,92)] text-white px-5 border-2 py-2  hover:bg-red-600  mt-[.30rem] rounded-full ml-6"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div><button  className="  flex items-center cursor-pointer font-semibold  bg-green-600 text-white px-5 border-2 py-2  hover:bg-gray-600  mt-[.30rem] rounded-full ml-6" onClick={handleLogout}  >Logout</button>
            </div>
        </div>
      </div>

      {loading ? (
        "Loading..."
      ) : products.length > 0 ? (
        <div className="grid grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
