import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  const params = useParams();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const getProductDetail = () => {
    fetch(`http://localhost:3000/api/products/viewProduct/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setProduct(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const { name, category, price, stock } = product;

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <>
      <Link to="/">
        <button style={{ margin: "14px" }}>Back</button>
      </Link>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <h1>name:{name}</h1>
        <h1>category:{category}</h1>
        <h1>price:{price}</h1>
        <h1>stock:{stock}</h1>
      </div>
    </>
  );
};

export default ViewProduct;
