import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";
import ArticuloInsumoABM from "./components/ArticuloInsumo/ArticuloInsumoABM";
import ArticuloManufacturadoABM from "./components/ArticuloManufacturado/ArticuloManufacturadoABM";
import useProducts from "./hooks/useProducts";

const ProductsTable = React.lazy(() => import('./components/AbmFactura/FacturaTable'));
const UserTable = React.lazy(() => import('./components/User/UserTable'));

const Admin: React.FC = () => {
  // Utils
  const { data, error, loading } = useProducts();

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return loading
    ? (
      <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
        <Spinner animation="border" />
      </div>
    )
    : (
      <React.Suspense fallback={<Spinner animation="border" />}>
        {/* <ProductsTable products={data} /> */}
        <ArticuloManufacturadoABM/>
        <ArticuloInsumoABM/>
      </React.Suspense>
    )
};

export default Admin;
