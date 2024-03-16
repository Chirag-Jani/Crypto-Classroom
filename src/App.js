import "./App.css";
import AuthForm from "./pages/AuthForm";
// import CourseUpload from "./components/CourseUpload";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/Profile";
import Header from "./components/Header";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/contact" element={<Homepage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
