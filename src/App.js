import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import CourseCard from "./components/CourseCard";
import Footer from "./layout/Footer";
import AuthForm from "./pages/AuthForm";
// import CourseUpload from "./components/CourseUpload";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    // <div className="App">
    //   {/* <h1>Hello World</h1> */}
    //   {/* <CourseUpload /> */}
    //   {/* <CourseCard />
    //   <ConnectButton />
    //   <Footer /> */}

    <BrowserRouter>
      <div>
        {/* Navigation Links */}
        {/* <nav>
          <Link to="/">Home</Link> |
          <Link to="/about">About</Link> |
          <Link to="/contact">Contact</Link>
        </nav> */}

        {/* Route Configuration */}
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/home" element={<Homepage />} />

          <Route path="/contact" element={<Homepage />} />

          <Route path="/profile" element={<ProfilePage />} />

          {/* <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
