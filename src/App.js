import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import CourseCard from "./components/CourseCard";
import Footer from "./layout/Footer";
import AuthForm from "./pages/AuthForm";
// import CourseUpload from "./components/CourseUpload";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
