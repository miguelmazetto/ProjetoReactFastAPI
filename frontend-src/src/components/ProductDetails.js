import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../API";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try{
        const response = await apiCall(`/products/${id}`);
        const data = await response.json();
        if(response.status === 200)
          setProduct(data);
        else
          navigate("/")
      }catch(e){
        navigate("/")
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleDelete = async () => {
    await apiCall(`/products/${id}`, { method: "DELETE" });
    navigate("/");
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalhes do Produto</h1>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Nome:</strong> {product.name}</p>
      <p><strong>Preço:</strong> R${product.price.toFixed(2)}</p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 mt-4"
      >
        Apagar Produto
      </button>
    </div>
  );
};

export default ProductDetails;