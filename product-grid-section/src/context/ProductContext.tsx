import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useECommerceProducts } from "../hooks/useECommerceProducts";

type ProductsContextDefaultStateType = {
  data: any | null;
  loading: boolean;
  error: Error | null;
};

const ProductContextDefaultState = {
    data: null,
    loading: true,
    error: null
}

const ProductsContext = createContext<ProductsContextDefaultStateType>(ProductContextDefaultState);


export function ProductsProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useECommerceProducts({ collection: ["latest"] });

  return ( 
        <ProductsContext.Provider value={{ data, loading, error }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside a MyProvider");
  return ctx;
}

/*
We need to createContext which requires a default state for the data we are passing down to the children in the case it wasn't loaded, to avoid errors.


const ProductContext = createContext<type: Interface>(defaultState: Object) we will access this later using ProductContext.Provider

We can only access useProducts within the provider otherwise we get the error above and the context will be null. And we need to wrap what we want to be able to access the data with ProductsProvider and then access that using useProducts.

2 functions within every context:
- XProvider
- useX

*/