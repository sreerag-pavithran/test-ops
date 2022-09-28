import Router from "./router/";
import { ErrorBoundary } from "react-error-boundary";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "antd/dist/antd.css";

import "./index.css";

const theme = extendTheme({
  styles: {
    global: {
      "html, body, #root": {
        // fontFamily: "Avenir, Helvetica, Arial, sans-serif",
        fontFamily: "Poppins,sans-serif",
        height: "100%",
      },
    },
  },
  colors: {
    blue: {
      500: "rgb(59,130,246)",
    },
  },
});

function App() {
  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
  return (
    <>
      <ChakraProvider theme={theme} shouldWrapChildren>
        <Router />
      </ChakraProvider>{" "}
    </>
  );
}

export default App;
