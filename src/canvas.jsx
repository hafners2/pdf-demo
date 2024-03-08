import React, {useRef, useEffect} from "react";


//navbar html is built here. We're using the <Link></Link> tag which is just a react specific <a> tag
export default function Canvas(props) {
  const texts = props.text;
  const setTexts = props.setTexts;
  const customTextIndex = props.customTextIndex;
  const setCustomTextIndex = props.setCustomTextIndex;
  const customImageIndex=props.customImageIndex;
  const setCustomImageIndex=props.setCustomImageIndex;
  const images = props.images;
  const setImages = props.setImages;

  const canvasRef = useRef(null);

  let canvasObj;
  let ctx;

  let offsetX;
  let offsetY;
  let scrollX;
  let scrollY;

  let startX;
  let startY;

  let selectedText = -1;

  function rotatePoint(point, deg) {
    let newPoint = { x: null, y: null };
    //convert degrees to radian
    let rad = (deg * Math.PI) / 180;

    //x = x*cos(deg)-y*sin(deg)
    //y = x*sin(deg)+y*cos(deg)
    newPoint.x = point.x * Math.cos(rad) - point.y * Math.sin(rad);
    newPoint.y = point.x * Math.sin(rad) + point.y * Math.cos(rad);
    return newPoint;
  }

  function textHittest(x, y, textIndex) {
    var text = props.texts[textIndex];
    /*
    //pts are (0,-height), (width,-height), (0,0), (width),)
    //e.g. the following represents the rectangle area of the object if it were drawn AT THE ORIGIN
    let p1 = rotatePoint({ x: 0, y: -text.height }, text.rotation);
    let p2 = rotatePoint({ x: text.width, y: -text.height }, text.rotation);
    let p3 = rotatePoint({ x: 0, y: 0 }, text.rotation);
    let p4 = rotatePoint({ x: text.width, y: 0 }, text.rotation);

    //accounting for x/y offset
    p1.x += text.x;
    p2.x += text.x;
    p3.x += text.x;
    p4.x += text.x;

    p1.y += text.y;
    p2.y += text.y;
    p3.y += text.y;
    p4.y += text.y;

    //drawing shape for debugging
    canvasObj = canvasRef.current;
    ctx = canvasObj.getContext("2d");

    ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "#FF0000";

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
*/
    //We now move our mouse pointer already adjusted to the canvas offset to now account for the
    //rectangle being at the origin.

    let translatedX = x - text.x;
    let translatedY = y - text.y;
    let translatedMousePoint = { x: translatedX, y: translatedY };
    translatedMousePoint = rotatePoint(translatedMousePoint, -text.rotation);
    translatedMousePoint.x += text.x;
    translatedMousePoint.y += text.y;
    // let mousePoint = { x: x, y: y };

    //debug return
    //return 1;
    //debug draw the rotated point (this is confusing but accurate)
    //it represents point they clicked adjusted as if the origin were the current test objects x and y
    // and then rotated negatively about it and then added back
    // this essentially checks if the point they clicked after rotation, etc...
    //would have fallen within the ORIGINAL non-rotated rectangle bounding box
    //The return statement below actually does that check
    //  ctx.fillRect(translatedMousePoint.x, translatedMousePoint.y, 5, 5);

    return (
      translatedMousePoint.x >= text.x &&
      translatedMousePoint.x <= text.x + text.width &&
      translatedMousePoint.y >= text.y - text.height &&
      translatedMousePoint.y <= text.y
    );
  }

  function imageHittest(x, y, imageIndex, e) {
    var image = props.images[imageIndex];

    let imageX = image.x;
    let imageY = image.y;

    let imageWidth = image.width/images[imageIndex].scale;
    let imageHeight = image.height/images[imageIndex].scale;

    return x >= imageX && x <= imageX + imageWidth && y >= imageY && y <= imageY + imageHeight;
  }

  // handle mousedown events
  // iterate through texts[] and see if the user
  // mousedown'ed on one of them
  // If yes, set the selectedText to the index of that text
  function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.pageX - offsetX);
    startY = parseInt(e.pageY - offsetY);
    // Put your mousedown stuff here
    for (var i = 0; i < props.texts.length; i++) {
      //console.log(textHittest(startX, startY, i), startX, startY, offsetX, offsetY, e.pageX, e.pageY, i);
      if (textHittest(startX, startY, i)) {
        selectedText = i;
        //declare customIndex
        setCustomTextIndex(selectedText);
        setCustomImageIndex(-1);
        return;
      }
    }

    for (var i = 0; i < props.images.length; i++) {
      if (imageHittest(startX, startY, i)) {
        selectedText = i;
        //declare customIndex
        setCustomImageIndex(selectedText);
        setCustomTextIndex(-1);
      } else {
      }
    }
  }

  function handleMouseMove(e) {
    //  console.log(selectedText);
    //  console.log(props.texts);
    if(customTextIndex >= 0) {
      if (selectedText >= 0) {
        e.preventDefault();
        let mouseX = parseInt(e.pageX - offsetX);
        let mouseY = parseInt(e.pageY - offsetY);
  
        // Put your mousemove stuff here
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;
        //objArray[0].x += dx;
        /*    let newTexts = [...props.texts];
      newTexts[selectedText].x += dx;
      newTexts[selectedText].y += dy;
      setTexts(newTexts);
  */
        props.texts[selectedText].x += dx;
        props.texts[selectedText].y += dy;
        //setTexts(newTexts);
        draw();
      }
    }

    if (customImageIndex >= 0) {
      if (selectedText >= 0) {
        e.preventDefault();
        let mouseX = parseInt(e.pageX - offsetX);
        let mouseY = parseInt(e.pageY - offsetY);
  
        // Put your mousemove stuff here
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;
        //objArray[0].x += dx;
        /*    let newTexts = [...props.texts];
      newTexts[selectedText].x += dx;
      newTexts[selectedText].y += dy;
      setTexts(newTexts);
  */
        props.images[selectedText].x += dx;
        props.images[selectedText].y += dy;
        //setTexts(newTexts);
        draw();
      }
  }
  }

  function handleMouseOut(e) {
    e.preventDefault();
    selectedText = -1;
    let newTexts = [...props.texts];
    setTexts(newTexts);
  }

  function handleMouseUp(e) {
    e.preventDefault();
    selectedText = -1;
    let newTexts = [...props.texts];
    setTexts(newTexts);
  }

  function draw() {
    canvasObj = canvasRef.current;
    ctx = canvasObj.getContext("2d");

    offsetX = canvasObj.offsetLeft;
    offsetY = canvasObj.offsetTop;
    scrollX = canvasObj.scrollLeft;
    scrollY = canvasObj.scrollWidth;

    if (ctx == null) {
      console.log("can't draw ctx is null");
      return;
    }

    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);
    for (let ct = 0; ct < props.texts.length; ct++) {
      if (typeof props.texts[ct] == "string") {
        let newTexts = [...props.texts];
        let newText = {
          text: props.texts[ct],
          x: 20,
          y: 40,
          font: '400 18pt Verdana',
          width: null,
          height: null,
          color: "#000000",
          rotation: 0,
        };
        ctx.font = newText.font;
        let textMeasurements = ctx.measureText(newText.text);
        newText.width = textMeasurements.width;
        newText.height =
          textMeasurements.actualBoundingBoxAscent +
          textMeasurements.actualBoundingBoxDescent;

        newTexts[ct] = newText;
        setTexts(newTexts);
        console.log(newTexts);
        return;
      }

      ctx.font = props.texts[ct].font;
      ctx.fillStyle = props.texts[ct].color;

      let textMeasurements = ctx.measureText(props.texts[ct].text);
      let currentWidth = textMeasurements.width;
      let currentHeight =
        textMeasurements.actualBoundingBoxAscent +
        textMeasurements.actualBoundingBoxDescent;

      //width and height are measured/derived from font choices
      //which may have changed if state skewed detected update state
      if (
        currentWidth != props.texts[ct].width ||
        currentHeight != props.texts[ct].height
      ) {
        // console.log(currentHeight, props.texts[ct].height);
        // console.log(currentWidth, props.texts[ct].width);

        let newTexts = [...props.texts];
        newTexts[ct].width = (currentWidth);
        newTexts[ct].height = (currentHeight);
        setTexts(newTexts);
        return; //don't bother finishing because we need another render
      }

      ctx.height = currentHeight;
      ctx.width = currentWidth;
      ctx.save();
      ctx.translate(props.texts[ct].x, props.texts[ct].y);
      ctx.rotate((props.texts[ct].rotation * Math.PI) / 180);
      ctx.fillText(props.texts[ct].text, 0, 0);
      ctx.restore();

      //draw a selected object box
      if (props.customIndex == ct) {
        let text = props.texts[ct];
        //pts are (0,-height), (width,-height), (0,0), (width),)
        //e.g. the following represents the rectangle area of the object if it were drawn AT THE ORIGIN
        let padding = 5;
        let p1 = rotatePoint(
          { x: 0 - padding, y: -text.height - padding },
          text.rotation
        );
        let p2 = rotatePoint(
          { x: text.width + padding, y: -text.height - padding },
          text.rotation
        );
        let p3 = rotatePoint({ x: 0 - padding, y: 0 + padding }, text.rotation);
        let p4 = rotatePoint(
          { x: text.width + padding, y: 0 + padding },
          text.rotation
        );

        //accounting for x/y offset
        p1.x += text.x;
        p2.x += text.x;
        p3.x += text.x;
        p4.x += text.x;

        p1.y += text.y;
        p2.y += text.y;
        p3.y += text.y;
        p4.y += text.y;

        ctx.strokeStyle = "#FF00FF";
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
    }

    for (let i = 0; i < props.images.length; i++) {
      if (typeof props.images[i] === "string") {
        let newImages = [...props.images];

        let imgObj = {
          src: props.images[i],
          x: 40,
          y: 40,
          width: null,
          height: null,
          scale: 1,
          imgObj: null,
        };

        imgObj.imgObj = new Image();
        imgObj.imgObj.src = imgObj.src;

        newImages[i] = imgObj;
        console.log(newImages)

        imgObj.imgObj.onload = function () {
          imgObj.height = imgObj.imgObj.height;
          imgObj.width = imgObj.imgObj.width;
          setImages(newImages);
          return;
        };
        return;
      } else {
        if (props.images[i].imgObj.complete) {
          ctx.drawImage(
            props.images[i].imgObj,
            props.images[i].x,
            props.images[i].y,
            props.images[i].width/props.images[i].scale,
            props.images[i].height/props.images[i].scale
          );
        }
      }
    }
  }
  useEffect(draw, [props.texts, props.customIndex, props.images]);

  function deleteObj() {
    if (customTextIndex >= 0) {
      props.texts.splice(customTextIndex, 1);
    }
    if (customImageIndex >= 0) {
      props.images.splice(customImageIndex, 1);
    }

    draw()
  }

  function downloadPDF() {
    const obj = {
        csvLayout:[],
        dynamicLayout:[],
        images:[]
    };
    const data = [].concat(props.texts);

    const imageData = [].concat(props.images);

    obj.csvLayout = data;
    
    obj.images = imageData;
    
    console.log('obj: ', obj);



    // Convert the data to a JSON string
    const jsonString = JSON.stringify(obj, undefined, 4);

    // Create a Blob object from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a temporary URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a link element with the URL as its href
    const link = document.createElement("a");
    link.href = url;

    // Set the filename of the downloaded file
    link.download = "data.json";

    // Append the link element to the document
    document.body.appendChild(link);

    // Simulate a click on the link to trigger the download
    link.click();

    // Remove the link element from the document
    document.body.removeChild(link);
  }

  return (
    <div>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
        width={596}
        height={840}
        style={{
          border: "1px solid #d3d3d3",
          display: "block",
          marginBottom: "2%",
        }}
      ></canvas>
      <button onClick={downloadPDF}>Download JSON File</button>
      <button name='button' onClick={deleteObj}>Clear</button>
    </div>
  );
}