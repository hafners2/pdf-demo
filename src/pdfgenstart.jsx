import React from "react";
import { Utils } from './utils';

//Function for the info page, HTML goes in between the <main></main> tags
export default function Pdfgenstart() {

    return (
        <main>
            <h1>PDF Generation Start Page</h1>
            <div className="backgroundbox"></div>
            <div className="genStart-Container">
                <div className="instructionsPanel">
                    <h2 className="center">How it Works</h2>
                    <ol>
                        <li>Upload your form data as a csv file</li>
                        <li>choose your template size</li>
                        <li>customize your page</li>
                        <li>preview and print!</li>
                    </ol>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h3 className="tagline">It's just that easy!</h3>
                </div>
                <div className="upload">
                    <h2 className="center">Upload</h2>
                    <label>
                        Upload CSV
                    </label>
                    <p>(upload button here)</p>
                    <p>However theyre gonna pick size and stuff </p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button onClick={Utils.print} className="getstarted">Get Started</button> //this needs to be fixed
            <br />
                </div>
               
            </div>
            
        </main>
    );
}