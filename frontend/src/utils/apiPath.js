export const BASE_URL = "http://localhost:8080";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/login",
  },

  PRODUCT: {
    GET_PRODUCT: "/api/product",
    CREATE_PRODUCT: "/api/product",
    UPDATE_PRODUCT: (id) => `/api/product/${id}`,
    DELETE_PRODUCT: (id) => `/api/product/${id}`,
  },

  CATEGORY: {
    GET_CATEGORY: "/api/item-types",
    CREATE_CATEGORY: "/api/item-types",
    UPDATE_CATEGORY: (id) => `/api/item-types/${id}`,
    DELETE_CATEGORY: (id) => `/api/item-types/${id}`,
  },

  UNIT: {
    GET_UNIT: "/api/unit-types",
    CREATE_UNIT: "/api/unit-types",
    UPDATE_UNIT: (id) => `/api/unit-types/${id}`,
    DELETE_UNIT: (id) => `/api/unit-types/${id}`,
  },

  PRODUCT_IN: {
    GET_PRODUCT_IN: "/api/product-in",
    CREATE_PRODUCT_IN: "/api/product-in",
    UPDATE_PRODUCT_IN: (id) => `/api/product-in/${id}`,
    DELETE_PRODUCT_IN: (id) => `/api/product-in/${id}`,
  },
};
