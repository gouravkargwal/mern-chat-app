import { BrowserRouter } from "react-router-dom";
import ChatContextProvider from "./context/ChatContext";
import AllRoutes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <ChatContextProvider>
        <AllRoutes />
      </ChatContextProvider>
    </BrowserRouter>
  );
}

export default App;
