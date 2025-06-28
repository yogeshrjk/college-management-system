import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App.jsx";
const client = new ApolloClient({
  uri: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});
createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloProvider>
);
