import React from "react";
import { Utils } from './utils';

//Function for the pdf gen page, HTML goes in between the <main></main> tags
export default function Pdfgen() {

    return (
        <main>
            <div className="generator">
                <div className="grid-csvGen">
                    <h3>CSV File</h3>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input
                        type="file"
                        name="file"
                        accept=".csv"
                        style={{ display: "block", margin: "10px auto" }}
                        onChange={Utils.handleCsv}
                    />
                </div>

                <div className="grid-jsonGen">
                   
                    <h3>JSON File</h3>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input
                        type="file"
                        name="file"
                        accept=".json"
                        style={{ display: "block", margin: "10px auto" }}
                        onChange={Utils.handleJson}
                    />
                </div>

                <button onClick={Utils.print} className="generatebutton">Generate</button>
                <br />
            </div>
        </main>
    );
}