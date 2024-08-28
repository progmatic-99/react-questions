import { useEffect, useState } from "react";
import "./styles.css";

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsResp = await fetch(
        `https://fakestoreapi.com/products?limit=10`
      );
      const products = await productsResp.json();
      // console.log(products);
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const debounce = (fn, delay = 1000) => {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    console.log(searchTerm);
    // setSearchTerm(searchTerm);
    const regex = new RegExp(searchTerm, "gi");
    const newProductList = products.filter((product) => {
      const price = String(product.price);
      if (product.title.search(regex) !== -1 || price.search(regex) !== -1) {
        // console.log(product.title);
        return product;
      }
    });
    setFilteredProducts(newProductList);
  };
  const betterSearch = debounce(handleSearch);

  return (
    <div className="App">
      <input
        type="search"
        placeholder="Search products"
        onInput={(e) => betterSearch(e)}
      />
      <main className="products">
        <Products
          products={filteredProducts.length > 0 ? filteredProducts : products}
        />
      </main>
    </div>
  );
}

const Products = ({ products }) => {
  return (
    <>
      <div className="products">
        {products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <h4>{product.price}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};
