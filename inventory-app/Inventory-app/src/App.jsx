import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext, UserContextProvider } from "./components/UserContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import CreateItem from "./pages/CreateItem";
import ItemDetail from "./pages/ItemDetail";
import EditItem from "./pages/EditItem";

function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
   
    return <Navigate to="/login" replace />;
  }

 
  return children;
}

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/items/:id" element={<ItemDetail />} />

          {/* Protected routes */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/items/:id/edit"
            element={
              <PrivateRoute>
                <EditItem />
              </PrivateRoute>
            }
          />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;

