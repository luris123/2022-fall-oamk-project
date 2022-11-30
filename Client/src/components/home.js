import React from "react";
import image from "../assets/nature.jpg"
import "../App.css"
import "../index.css"

function Home() {
    return (
        <div style={{ backgroundImage:`url(${image})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center', height: '70vh'
        }}>
            <h1 class="h1">Web-ohjelmoinnin sovellusprojekti</h1>
        </div>
        
  );
}
export default Home;