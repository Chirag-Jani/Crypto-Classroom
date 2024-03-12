import './App.css';
import axios from "axios";

function App() {
  const get = async () => {
    let data = await axios.get("http://localhost:8080");
    console.log(data?.data);
  }
  return (
    <div className="App">
      <h1>Hello World</h1>   
      <button onClick={get}>Get DAta</button>
    </div> 
  );
}

export default App;
