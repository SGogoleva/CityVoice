import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Projects from "./pages/Projects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Projects />} />
      </Routes>
    </BrowserRouter>
    // <Projects />
  );
}

export default App;
