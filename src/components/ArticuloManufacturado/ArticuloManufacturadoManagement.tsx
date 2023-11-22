// ../components/ProductManagement.tsx
import React, { useEffect, useState } from 'react';
import { ProductService, Product } from './../../services/ArticuloManufacturadoService';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
  });

  useEffect(() => {
    // Cargar la lista de productos al montar el componente
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productList = await ProductService.getAllProducts();
      setProducts(productList);
    } catch (error) {
      console.error('Error al cargar la lista de productos:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await ProductService.addProduct(newProduct);
      setNewProduct({ id: 0, name: '', price: 0 });
      loadProducts(); // Recargar la lista después de agregar un nuevo producto
    } catch (error) {
      console.error('Error al agregar un nuevo producto:', error);
    }
  };

  const handleUpdateProduct = async (productId: number, updatedProduct: Product) => {
    try {
      await ProductService.updateProduct(productId, updatedProduct);
      loadProducts(); // Recargar la lista después de actualizar el producto
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await ProductService.deleteProduct(productId);
      loadProducts(); // Recargar la lista después de eliminar el producto
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div>
      <h2>Administración de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleUpdateProduct(product.id, { ...product, price: product.price + 1 })}>
              Incrementar Precio
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h3>Agregar Nuevo Producto</h3>
      <label>Nombre:
        <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
      </label>
      <label>Precio:
        <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
      </label>
      <button onClick={handleAddProduct}>Agregar Producto</button>
    </div>
  );
};

export default ProductManagement;
