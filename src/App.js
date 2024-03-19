import { Outlet } from "react-router-dom";
import Heading from "./componends/Heading/Heading";

function App() {

  return (
    <div className="App">
      <Heading/>
      <Outlet/>
    </div>
  );
}

export default App;
