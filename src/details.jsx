import React, { useState, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";


//navbar html is built here. We're using the <Link></Link> tag which is just a react specific <a> tag
export default function Details(props) {
  //from useStates
  const texts = props.texts;
  const setTexts = props.setTexts;
  const customTextIndex = props.customTextIndex;
  const setCustomTextIndex = props.setCustomTextIndex;
  const customImageIndex=props.customImageIndex;
  const setCustomImageIndex=props.setCustomImageIndex;
  const images = props.images;
  const setImages = props.setImages;

  const [color, setColor] = useState("#aabbcc");

  //change color of selected text
  function changeColor(e) {
    setColor(color);
    let newArr = [...texts];
    newArr[customTextIndex].color = "#" + e.target.parentElement.children[2].value;
    setTexts(newArr);
  }

  function changeToBlack(e) {
    setColor(color);
    let newArr = [...texts];
    newArr[customTextIndex].color = "#000000";
    setTexts(newArr);
  }

  function changeToRed(e) {
    setColor(color);
    let newArr = [...texts];
    newArr[customTextIndex].color = "#ff0000";
    setTexts(newArr);
  }

  function changeFontSize(e) {
    let newArr = [...texts];
    newArr[customTextIndex].font = e.target.parentElement.children[5].value;
    setTexts(newArr);
  }



  function changeRotation(e) {
    console.log(e.target.parentElement.children)
    if (customTextIndex >= 0) {
      let newArr = [...texts];
      newArr[customTextIndex].rotation = e.target.parentElement.children[8].value;
      setTexts(newArr);
    }
  }

  function addImage(e) {
    let newArr = [...images];
    newArr.push(e.target.parentElement.children[12].value);
    console.log("setting newArr", newArr);
    setImages(newArr);
  }

  function scaleImage(e) {
    let newArr = [...images];
    newArr[customImageIndex].scale = e.target.parentElement.children[15].value;
    setImages(newArr);
  }

  if(customTextIndex >= 0 || customImageIndex >= 0 ) {
    var inputs = document.getElementsByName("button");
    for (var i = 0; i < inputs.length; i++) {
          inputs[i].disabled = false;
    }
  } else if(customTextIndex === '' || customImageIndex === '') {
    var inputs = document.getElementsByName("button");
    for (var i = 0; i < inputs.length; i++) {
          inputs[i].disabled = true;
    }
  } else {
    var inputs = document.getElementsByName("button");
    for (var i = 0; i < inputs.length; i++) {
          inputs[i].disabled = true;
    }
  }

  return (
    <div className="editSidebar">
      <HexColorPicker className="colorPicker" color={color} onChange={setColor} />
      <label htmlFor="hex-input">Color: </label>
      <HexColorInput color={color} onChange={changeColor} id="hex-input" name="hex-input" />
      <button className="buttonEdit"name='button' onClick={changeColor}>Change</button>
      {/*<button onClick={changeToBlack} >Black</button>
      <button onClick={changeToRed}>Red</button>*/}
      <label htmlFor="font-size">Size: </label>
      <input type="text" name="font-size" placeholder="ex. 400 18pt Verdana"/>
      <button className="buttonEdit" name='button' onClick={changeFontSize}>Change</button>
      <label htmlFor="font-rotation">Rotation: </label>
      <input type="text" name="font-rotation" />
      <button className="buttonEdit" name='button' onClick={changeRotation}>Change</button>
      <div className="spaceSkip"></div>
      <label htmlFor="image">Image: </label>
      <input type="text" className="wideInput" name="image" />
      <button className="buttonEdit" onClick={addImage}>Add</button>
      <label htmlFor="image-scale">Scale: </label>
      <input type='text' className="wideInput"></input>
      <button className="buttonEdit" onClick={scaleImage}>Scale</button>
    </div>
  );
};