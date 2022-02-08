import './App.css';
import './pages/Dashbord/Dashboard'
import Dashboard from "./pages/Dashbord/Dashboard";
import Homepage from "./pages/Homepage/Homepage"
import {Route ,Routes} from "react-router-dom";
import "./circe.css"
import AuthGuard from "./services/AuthGuard";

function App() {
  return (
      <Routes>
        <Route path='/' element={<AuthGuard><Dashboard /></AuthGuard>}/>
        <Route path='/home' element={<Homepage/>}/>
      </Routes>
  );
}

export default App;
