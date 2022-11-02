import Navbar from '../components/navbar/navigationbar.js'
import  { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Home from '../components/home'
import EmissionSources from '../components/emissionSources'
import Temperature from '../components/temperature'
import Profile from '../components/user/profile.js'
import 'bootstrap/dist/css/bootstrap.min.css';


function Main() {
    return (
        <div>
            <HashRouter>
                <Navbar></Navbar>
                <div className="content">
                    <Routes>
                        <Route path="/" element={Home()} exact/>
                        <Route path="/emissionSources" element={EmissionSources()}/>
                        <Route path="/temperature" element={Temperature()}/>
                        <Route path="/profile" element={Profile()}/>
                    </Routes>
                </div>
            </HashRouter>
        </div>
    )
}

export default Main;