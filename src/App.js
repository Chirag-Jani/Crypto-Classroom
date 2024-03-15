import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import CourseCard from "./components/CourseCard";
import Footer from "./layout/Footer";
// import CourseUpload from "./components/CourseUpload";

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      {/* <CourseUpload /> */}
      <CourseCard />
      <ConnectButton />
      <Footer />
    </div>
  );
}

export default App;
