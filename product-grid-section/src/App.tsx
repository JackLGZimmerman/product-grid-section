import "./App.css";
import { Products } from "./components/features";
import { ProductsProvider } from './context';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 items-center justify-center flex">
      <ProductsProvider>
        <Products></Products>
      </ProductsProvider>
    </div>
  );
}

export default App;
