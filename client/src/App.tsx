import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import MainPage from "./pages/Main";
import ProjectsPage from "./pages/Projects";
import SingleProject from "./pages/SingleProject";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Personal from "./pages/Personal";
import ProtectedRoute from "./components/login-register/protectedRoute";
import SendMessage from "./pages/SendMessage";
import NoPage from "./pages/NoPage";
import MessagesPage from "./pages/Messages";
import SingleMessage from "./components/SingleMessage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<SingleProject />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/send-message" element={<SendMessage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="messages/:id" element={<SingleMessage />} />
          <Route path="*" element={<NoPage />} />
          <Route
            path="personal"
            element={
              <ProtectedRoute redirectPath="/login">
                <Personal />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
