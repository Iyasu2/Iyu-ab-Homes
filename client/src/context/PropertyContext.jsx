import { createContext, useReducer } from "react";

export const PropertiesContext = createContext();

export const propertiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROPERTY":
      return {
        properties: action.payload,
      };
    case "CREATE_PROPERTY":
      return {
        properties: [action.payload, ...state.properties],
      };
    case "DELETE_PROPERTY":
      return {
        properties: state.properties.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const PropertiesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertiesReducer, {
    properties: [],
  });

  return (
    <PropertiesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PropertiesContext.Provider>
  );
};
