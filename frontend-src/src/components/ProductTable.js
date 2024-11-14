import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { apiCall } from "../API";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiCall('/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Falha ao coletar produtos:", error);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await apiCall('/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      fetchProducts();
      setIsModalOpen(false);
      setNewProduct({ name: '', price: '' });
    } catch (error) {
      console.error("Falha ao adicionar produto:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await apiCall(`/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error("Falha ao apagar produto:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tabela de Produtos</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleOpenModal}
      >
        Adicionar Produto
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Nome</th>
            <th className="py-2">Preço</th>
            <th className="py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center border-b">
              <td className="py-2">{product.id}</td>
              <td className="py-2">{product.name}</td>
              <td className="py-2">R${product.price.toFixed(2)}</td>
              <td className="py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Apagar
                </button>
                <a className="bg-green-500 text-white px-2 py-[5px] rounded" href={"/products/"+product.id}>
                    Detalhes
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Adicionar Novo Produto</h2>
        <form onSubmit={handleAddProduct}>
          <label className="block mb-2">
            Nome:
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="border rounded p-2 w-full mt-1"
              required
            />
          </label>
          <label className="block mb-4">
            Preço:
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="border rounded p-2 w-full mt-1"
              required
            />
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Adicionar Produto
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductTable;
