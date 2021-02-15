import './App.css';
import MemeForm from "./components/MemeForm";
import MemeDetail from "./components/MemeDetail"
function App() {
  return (
    <div className="App">
      <h1 className={classes.title} >X-MEME</h1>
      <MemeForm/>
      <MemeDetail/>
    </div>
  );
}

export default App;
