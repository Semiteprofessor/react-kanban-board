import "./App.css";
import Column from "./componnets/Column/Column";

function App() {
  return (
    <div className="App">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </div>
  );
}

export default App;
