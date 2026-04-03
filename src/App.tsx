import { AppRouter } from "./routes/AppRouter";
import { ToastContainer } from "./components/Toast";

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
