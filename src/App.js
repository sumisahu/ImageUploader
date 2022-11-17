import logo from './logo.svg';
import './App.css';
import ImageUploader from './Component/ImageUploader';
import SignUp from './Component/SignUp';
import {BrowserRouter as Routers,Routes,Route} from 'react-router-dom'
import Login from './Component/Login';
import Display_and_Search from './Component/Display_and_Search';
 

function App() {
  return (
       <div>
        <Routers>
          <Routes>
            <Route element={<ImageUploader />} path="imageuploader" />
            <Route element={<SignUp />} path="signup" /> 
            <Route element={<Login />} path="login" /> 
            <Route element={<Display_and_Search />} path="displayimage" /> 
 
         
          </Routes>
        </Routers>
       </div>
  );
}

export default App;
