import jsPDF from 'jspdf';
import { parse } from 'papaparse';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';



//This is our class for site-wide functions
export class Utils {

    //Variables
    static json = undefined;
    static csvData = undefined;
    static csvMeta = undefined;


    //Functions Below Here, Anything in here can be called with Utils.(functionName) across the site

    //Function for pulling all data out of a CSV an putting it into values labeled csvData and csvMeta
    //csvData contains all of the entries within the csv, and csvMeta contains useful meta data such as csv keys/headers/fieldnames
    static handleCsv(event) {
        Utils.csvData = undefined;
        parse(event.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            Utils.csvData = results.data;
            Utils.csvMeta = results.meta.fields;
          }
        });
    }
    
    //function for pulling getting contents and name of JSON files
    static handleJson(event) {
        var fr = new FileReader();
        fr.onload = () => {
          Utils.json = JSON.parse(fr.result);
        }
      
        fr.readAsText(event.target.files[0]);
    }
    
    //PDF Print file creation function
    //Fully-functional: text color, rotation, placement, font settings, dynamic text, and values from CSV
    //Semi-functional: images
    //Missing: none! all done???
    //8.5 x 11 paper
    //2550x3300
    static print() {
        const pdf = new jsPDF({
          unit: "pt"
        });
      
        if (Utils.csvData == undefined || Utils.json == undefined) {
          return;
        }
        
        //data log
        console.log('data: ', Utils.csvData, 'meta: ', Utils.csvMeta, 'json: ', Utils.json)

        //Creates Each page
        for (let i = 0; i < Utils.csvData.length; i++) {
          const info = Utils.csvData[i];
          
          //Add all the csv info to page
          for (let [key, value] of Object.entries(info)) {
            const csvLayout = Utils.getCsvLayoutInfo(key);
            if (csvLayout.length > 0){
              for (let csv of csvLayout){
                Utils.addText(csv, pdf, value);
              }
              
            }
          }


          //Adds labels / dynamic text to page
          for (let labels of Utils.json.csvLayout){
            if (!Utils.csvMeta.includes(labels.text)){
              const csvLayout = Utils.getCsvLayoutInfo(labels.text);
              if (csvLayout.length > 0){
                for (let csv of csvLayout){
                  Utils.addText(csv, pdf, labels.text);
                }
                
              }
            }
            
            
          }

          //Adds images to page
          for (let images of Utils.json.images){
            console.log('Image source: ', images.src);

            //This image adding needs to be fixed
            pdf.addImage(images.src, images.x, images.y, images.width / images.scale, images.height / images.scale);
          }
  
          if (i < Utils.csvData.length - 1) {
            pdf.addPage("a4", "p");
          }
        }
        
        pdf.save("pdf");
    }
    
    //Function that reads the CSV's keys and data
    static getCsvLayoutInfo(fieldName) {
        var info = [];
      
        for (let data of Utils.json.csvLayout) {
          if (data.text == fieldName) {
            info.push(data);
          }
        }
      
        return info;
    }

    //function for adding text
    static addText(csvLayout, pdf, value){
      //parsing font info
      const fontSettings = csvLayout.font.split(" ");
      fontSettings[1] = parseInt(fontSettings[1]);
      
      //turning rotation value from string into integer
      var rotation = parseInt(csvLayout.rotation);

      //logs for testing purposes
      console.log(csvLayout.rotation);
      console.log('Rotation value in var: ', rotation);
      console.log('Font Settings: ', fontSettings[0], ' ', fontSettings[1], ' ', fontSettings[2]);

      //sets up text
      pdf.setFont(fontSettings[2], 'normal', fontSettings[0]);
      pdf.setFontSize(fontSettings[1]);
      pdf.setTextColor(csvLayout.color);
      pdf.text(value, csvLayout.x, csvLayout.y, {rotationDirection: 0, angle: rotation});
      rotation = 0;
    }
    
}