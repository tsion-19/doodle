import Layout from "./components/Layout/Layout";
import axios from "axios";
import "./index.css";
import "./App.css";

function App() {
  //axios defaults
  axios.defaults.headers.common['Content-Type'] = "multipart/form-data";


  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
