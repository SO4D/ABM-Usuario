import { useState, useEffect } from "react";
import { ArticuloInsumoService } from "../../../../services/ArticuloInsumoService";
import "./ArticuloInsumoABM.css"; // Archivo de estilos (puedes personalizarlos)
import { ArticuloInsumo } from "../../../../types/ArticuloInsumo";
import React from "react";

const ArticuloInsumoABM = () => {
  const [articulos, setArticulos] = useState<ArticuloInsumo[]>([]);
  const [formData, setFormData] = useState<ArticuloInsumo>({
    id: 0,
    nombre: "",
    descripcion: "",
    precioCompra: 0,
    stockActual: 0,
    stockMinimo: 0,
  });

  const [selectedArticulo, setSelectedArticulo] = useState<ArticuloInsumo | null>(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    try {
      await ArticuloInsumoService.addArticulo(formData);
      fetchArticulos();
      clearForm();
    } catch (error) {
      console.error("Error al agregar artículo:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedArticulo) return;

    try {
      await ArticuloInsumoService.updateArticulo(selectedArticulo.id, formData);
      fetchArticulos();
      clearForm();
    } catch (error) {
      console.error("Error al actualizar artículo:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedArticulo) return;

    try {
      await ArticuloInsumoService.deleteArticulo(selectedArticulo.id);
      fetchArticulos();
      clearForm();
    } catch (error) {
      console.error("Error al eliminar artículo:", error);
    }
  };

  const handleSelectArticulo = (articulo: ArticuloInsumo) => {
    setSelectedArticulo(articulo);
    setFormData({
      id: articulo.id,
      nombre: articulo.nombre,
      descripcion: articulo.descripcion,
      precioCompra: articulo.precioCompra,
      stockActual: articulo.stockActual,
      stockMinimo: articulo.stockMinimo,
    });
  };

  const clearForm = () => {
    setFormData({
      id: 0,
      nombre: "",
      descripcion: "",
      precioCompra: 0,
      stockActual: 0,
      stockMinimo: 0,
    });
    setSelectedArticulo(null);
  };

  const fetchArticulos = async () => {
    try {
      const data = await ArticuloInsumoService.getArticulos();
      setArticulos(data);
    } catch (error) {
      console.error("Error al obtener la lista de artículos:", error);
    }
  };

  useEffect(() => {
    fetchArticulos();
  }, []);

  return (
    <div className="articulo-abm-container">
      <div className="articulo-form-container">
        <h2>ABM Articulo Insumo</h2>
        <form>
          <label>Nombre:
            <input type="text" name="nombre" value={formData.nombre || ""} onChange={handleInputChange} />
          </label>
          <br />
          <label>Descripción:
            <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
          </label>
          <br />
          <label>Precio de Compra:
            <input type="number" name="precioCompra" value={formData.precioCompra} onChange={handleInputChange} />
          </label>
          <br />
          <label>Stock Actual:
            <input type="number" name="stockActual" value={formData.stockActual} onChange={handleInputChange} />
          </label>
          <br />
          <label>Stock Minimo:
            <input type="number" name="stockMinimo" value={formData.stockMinimo} onChange={handleInputChange} />
          </label>
          <br />
          <div className="button-group">
            <button type="button" onClick={handleAdd}>Agregar</button>
            <button type="button" onClick={handleUpdate} disabled={!selectedArticulo}>Actualizar</button>
            <button type="button" onClick={handleDelete} disabled={!selectedArticulo}>Eliminar</button>
            <button type="button" onClick={clearForm}>Limpiar</button>
          </div>
        </form>
      </div>

      <div className="articulo-list-container">
        <h3>Lista de Artículos</h3>
        <ul>
          {articulos.map((articulo: ArticuloInsumo) => (
            <li key={articulo.id} onClick={() => handleSelectArticulo(articulo)} className={selectedArticulo && selectedArticulo.id === articulo.id ? "selected" : ""}>
              {articulo.nombre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticuloInsumoABM;
