import { useState, useEffect } from "react";
import { ArticuloManufacturadoService } from "../../../../services/ArticuloManufacturadoService";
import "./ArticuloManufacturadoABM.css"; // Archivo de estilos (puedes personalizarlos)
import { ArticuloManufacturado } from "../../../../types/ArtuculoManufacturado";
import React from "react";

const ArticuloManufacturadoABM = () => {
  const [articulos, setArticulos] = useState<ArticuloManufacturado[]>([]);
  const [formData, setFormData] = useState<ArticuloManufacturado>({
    id: 0,
    nombre: "",
    descripcion: "",
    precioVenta: 0,
    tiempoEstimadoCocina: 0,
  });

  const [selectedArticulo, setSelectedArticulo] = useState<ArticuloManufacturado | null>(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    try {
      await ArticuloManufacturadoService.addArticulo(formData);
      fetchArticulos();
      clearForm();
    } catch (error) {
      console.error("Error al agregar artículo:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedArticulo) return;

    try {
      await ArticuloManufacturadoService.updateArticulo(selectedArticulo.id, formData);
      fetchArticulos();
      clearForm();
    } catch (error) {
      console.error("Error al actualizar artículo:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedArticulo) return;

    try {
      await ArticuloManufacturadoService.deleteArticulo(selectedArticulo.id);
      fetchArticulos();
      clearForm();
    } catch (error) {
      console.error("Error al eliminar artículo:", error);
    }
  };

  const handleSelectArticulo = (articulo: ArticuloManufacturado) => {
    setSelectedArticulo(articulo);
    setFormData({
      id: articulo.id,
      nombre: articulo.nombre,
      descripcion: articulo.descripcion,
      precioVenta: articulo.precioVenta,
      tiempoEstimadoCocina: articulo.tiempoEstimadoCocina,
    });
  };

  const clearForm = () => {
    setFormData({
      id: 0,
      nombre: "",
      descripcion: "",
      precioVenta: 0,
      tiempoEstimadoCocina: 0,
    });
    setSelectedArticulo(null);
  };

  const fetchArticulos = async () => {
    try {
      const data = await ArticuloManufacturadoService.getArticulos();
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
        <h2>ArticuloManufacturado ABM</h2>
        <form>
          <label>Nombre:
            <input type="text" name="nombre" value={formData.nombre || ""} onChange={handleInputChange} />
          </label>
          <br />
          <label>Descripción:
            <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
          </label>
          <br />
          <label>Precio de Venta:
            <input type="number" name="precioVenta" value={formData.precioVenta} onChange={handleInputChange} />
          </label>
          <br />
          <label>Tiempo Estimado de Cocina:
            <input type="number" name="tiempoEstimadoCocina" value={formData.tiempoEstimadoCocina} onChange={handleInputChange} />
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
          {articulos.map((articulo: ArticuloManufacturado) => (
            <li key={articulo.id} onClick={() => handleSelectArticulo(articulo)} className={selectedArticulo && selectedArticulo.id === articulo.id ? "selected" : ""}>
              {articulo.nombre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticuloManufacturadoABM;
