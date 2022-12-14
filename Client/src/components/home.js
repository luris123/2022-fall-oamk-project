import React from "react";
import image from "../assets/nature.jpg"
import "../css/App.css"
import "../css/index.css"

function Home() {
    return (
        <div style={{ backgroundImage:`url(${image})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center', height: '70vh'
        }}>
            <h1 className="h1">Web-ohjelmoinnin sovellusprojekti</h1>
        </div>
        
  );
}
export default Home;