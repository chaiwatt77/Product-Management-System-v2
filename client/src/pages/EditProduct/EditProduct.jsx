import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

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

  //หรือส่ง body: JSON.stringify(product), เหมือนเดิมแล้วค่อยไปแก้ที่หลังบ้าน
  //const { _id, product_id, created_at, ...productBody } = product; // แบบแก้หน้าบ้าน ใช้กับ body: JSON.stringify(productBody),
  
  const updateProductDetail = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/products/edit/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
      //body: JSON.stringify(productBody),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          } else if (response.status === 400) {
            throw new Error("Bad request: Invalid data format");
          } else if (response.status === 401) {
            throw new Error("Unauthorized: You are not authorized to perform this action");
          } else if (response.status === 500) {
            throw new Error("Internal Server Error: Something went wrong on the server side");
          }
          throw new Error("Error when fetching");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("แก้ไขสำเร็จ");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Failed to update product details. Please try again later.");
      });
  };
  
  const validatePrice = (price) => {
    if (price.startsWith(".")) {
      price = "0" + price;
    }
    if (price.indexOf(".") >= 0) {
      price = price.slice(0, price.indexOf(".") + 3);
    }
    return price;
  };

  return (
    <div className="form-container">
      <Link to="/">
        <button style={{ margin: "14px" }}>Back</button>
      </Link>
      <form className="form-design" onSubmit={updateProductDetail}>
        <label htmlFor="name">Name of Product</label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, category: e.target.value }))
          }
          required
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => {
            //validatePrice แบบ regex และ func
            let validatedPrice = e.target.value.replace(/^(\d*\.?\d{0,2}).*/, "$1");

            //let validatedPrice = validatePrice(e.target.value);
            setProduct((prev) => ({ ...prev, price: validatedPrice }));
          }}
          step="any"
          required
        />
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, stock: e.target.value }))
          }
          required
          onKeyDown={(e) => {
            if (e.key === ".") {
              e.preventDefault();
            }
          }}
        />

        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default EditProduct;
