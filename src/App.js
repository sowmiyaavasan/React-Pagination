import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    console.log(data.products);
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePageClick = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <div className="App">
      {products && products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => handlePageClick(page - 1)}
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "page__selected" : ""}
                key={i}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "pagination__disable"}
            onClick={() => handlePageClick(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
