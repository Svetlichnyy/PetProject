import './App.css';
import './pages/Dashbord/Dashboard'
import Dashboard from "./pages/Dashbord/Dashboard";
import Homepage from "./pages/Homepage/Homepage"
import {Route ,Routes} from "react-router-dom";
import "./circe.css"
import AuthGuard from "./services/AuthGuard";
import {DndProvider} from "react-dnd";
import { HTML5Backend} from "react-dnd-html5-backend";

function App() {
  return (
      <DndProvider backend = {HTML5Backend}>
          <Routes>
            <Route path='/' element={<AuthGuard><Dashboard /></AuthGuard>}/>
            <Route path='/home' element={<Homepage/>}/>
          </Routes>
      </DndProvider>
  );
}

export default App;
