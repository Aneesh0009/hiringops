import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import socket from "./socket";

function App() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
