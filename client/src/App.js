import './App.css';
import MemeForm from "./components/MemeForm/MemeForm"
import MemeDetail from "./components/MemeDetail/MemeDetail"
import { BrowserRouter, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
function App() {
  return (
    <div className="App">
      <h1>X-MEME</h1>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={MemeDetail} />
        <Route exact path="/post" component={MemeForm} />
      </BrowserRouter>
    </div>
  );
}

export default App;
