import React, { useState, useEffect } from "react";
import "./index.css";
import { Utils } from './utils';
import Details from './details';
import Canvas from './canvas';


// Allowed extensions for input file
const allowedExtensions = ["csv"];
var csvData;
var csvMeta;
var columns;

//Function for the pdf editor page, HTML goes in between the <main></main> tags
export default function Pdfeditor() {

    // This state will store the parsed data
    const [data, setData] = useState([]);

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    //create a useState for add button - how is addColumns tied into col variable?
    const [addedColumns, setAddedColumns] = useState([]);

    //customTextIndex for select texts on canvas
    const [customTextIndex, setCustomTextIndex] = useState("");

    //customImageIndex for select images on canvas
    const [customImageIndex, setCustomImageIndex] = useState("");



    //imageSource
    const [images, setImages] = useState([]);

    function addToTexts(e) {
        let newArr = [...addedColumns];
        newArr.push(Utils.csvMeta[e.target.parentElement.getAttribute("dataindex")]); //"firstName"
        setAddedColumns(newArr);
    }

    function addLabelToTexts(e) {
        let newArr = [...addedColumns];
        newArr.push(e.target.parentElement.children[1].value); //"firstName"
        setAddedColumns(newArr);
    }


    return (
        <main>
            <div className="gridEditor">
                <div className="grid-CSV">
                    <label className="file-label" htmlFor="csvInput">Enter CSV File: </label>
                    <input
                        type="file"
                        name="file"
                        accept=".csv"
                        onChange={Utils.handleCsv}
                    />
                    <div></div>
                    <div style={{ marginTop: "3rem" }}>
                        
                    {
                    Utils.csvMeta != undefined &&
                            Utils.csvMeta.map((col, idx) => (
                                <div key={idx} dataindex={idx}>
                                    <span className="csv-element">{col}</span>
                                    <button style={{padding: "20px", width: "15%"}} onClick={addToTexts}>+</button>
                                </div>
                            ))
                        
                        
                    }
                <label className="element-label" htmlFor="label-input">Label: </label>
                    <input style={{borderRadius: "50px", padding: "15px"}} type='text' name='label-input'></input>
                    <button onClick={addLabelToTexts} style={{padding: "20px", width: "15%", marginLeft: "30px"}}>+</button><br/>
                </div>
                
                <div style={{marginTop: "100px"}}>
                   
                   <label className="file-label">Enter JSON file: </label>
                   <input
                       type="file"
                       name="file"
                       accept=".json"
                       onChange={Utils.handleJson}
                   />
               </div>
               <button onClick={Utils.print} className="generatebutton">Generate</button>
                </div>
                <div className="grid-canvas">
                <Canvas
                    texts={addedColumns}
                    setTexts={setAddedColumns}
                    customTextIndex={customTextIndex}
                    setCustomTextIndex={setCustomTextIndex}
                    customImageIndex={customImageIndex}
                    setCustomImageIndex={setCustomImageIndex}
                    images={images}
                    setImages={setImages}
                />
                </div>
                <div className="grid-styleText">
                <Details
                    texts={addedColumns}
                    setTexts={setAddedColumns}
                    customTextIndex={customTextIndex}
                    setCustomTextIndex={setCustomTextIndex}
                    customImageIndex={customImageIndex}
                    setCustomImageIndex={setCustomImageIndex}
                    images={images}
                    setImages={setImages}
                />
                </div>
            </div>
        </main>
    );
}