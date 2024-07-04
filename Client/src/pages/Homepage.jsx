import { useState, useRef } from "react";
import "../App.css";
import ImageSection from "../section/ImageSection.jsx";
import OcrSection from "../section/OcrSection";
import OutputSection from "../section/OutputSection";
import ErrorModal from "../section/ErrorModal";
import axios from "axios";
import Tesseract from "tesseract.js";
import { HiDownload } from "react-icons/hi";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState({});
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const ref = useRef(null);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [windowSize, setWindowSize] = useState();
  const [progressBar, setProgressBar] = useState(0);
  const [extension, setExtension] = useState("code.txt");

  //Downloads the code as a txt file
  const downloadTxtFile = () => {
    if (code) {
      const element = document.createElement("a");
      const file = new Blob([code], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      // element.download = "code.txt";
      element.download = `code.${extension}`;
      document.body.appendChild(element);
      element.click();
    } else {
      setModal(true);
      setModalText("There's no code to download.");
      setTimeout(() => {
        setModal(false);
        setModalText("");
      }, 2000);
    }
  };

  const updateExtension = (e) => {
    setExtension(e);
  };

  //For updating windowSize on resize
  window.addEventListener("resize", () => {
    setWindowSize(window.innerWidth);
  });

  //Sets the input image on the state variable
  const onimgchangeHandler = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  //Handles Image Upload
  const handleImageUpload = async () => {
    if (!selectedImage) return;

    // Perform OCR on the image using Tesseract
    const textData = await Tesseract.recognize(selectedImage, "eng", {
      logger: (m) => {
        setProgressBar(m.progress);
      },
    });
    // Check if the OCR output contains a substantial amount of text
    const minTextLength = 5;

    if (textData.data.text.length >= minTextLength) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/upload/",
          formData
        );
        console.log(response);
        console.log(response.data.snippet);
        setData(response.data.snippet.text_content);
        setCode(response.data.snippet.text_content);
        // fetch("/ocr")
        //   .then((response) => response.json())
        //   .then((data) => {
        //     setData(data);
        //     setCode(data.ocr);
        //     console.log(code);
        //   });
        //Handles the response from the backend if needed
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setModal(true);
      setModalText("Insert a valid document");
      setTimeout(() => {
        setModal(false);
        setModalText("");
      }, 2000);
    }
  };

  //handles image reupload
  const handleReupload = () => {
    setSelectedImage(null);
    setCode("");
    setOutput("");
  };

  //Sets Code as the editor updates
  const oninputChangeHandler = (e) => {
    setCode(e);
  };

  //Handles compile btn click
  const handleRunClick = async () => {
    if (!code) {
      setModal(true);
      setModalText("There's no code to compile.");
      setTimeout(() => {
        setModal(false);
        setModalText("");
      }, 2000);
    } else {
      console.log(code);
      const payload = {
        code,
        input,
      };
      const outputData = await axios.post("http://localhost:4999/py", payload);
      console.log("OUTPUTDATA:", outputData.data);
      if (outputData.data.error) {
        setOutput(outputData.data.error);
      } else {
        setOutput(outputData.data.output);
      }
      // ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  //Handles Input Change
  const handleInputChange = (e) => {
    // setInput("");
    setInput(e.target.value);
  };

  return (
    <div>
      <div className="App">
        <ErrorModal modal={modal} modalText={modalText} />
        {/* <div className="input-section">
        <input type="file" accept="image/*" onChange={onchangeHandler}></input>
      </div> */}

        {/* <div className="image-view">
        {selectedImage && (
          <img src={URL.createObjectURL(selectedImage)} id="inputImg"></img>
        )}
      </div> */}

        {/* {data.ocr} */}
        <div className="navbar">
          <div className="logo">
            <span className="primary-color">OCR</span>compiler
          </div>
          <div className="save-btn btn-primary" onClick={downloadTxtFile}>
            {windowSize <= 580 ? (
              <div>
                <HiDownload className="download-icon" />
              </div>
            ) : (
              "Download Code"
            )}
          </div>
          {/* <div className="user-img">.</div> */}
        </div>
        <div className="sections">
          <ImageSection
            onchangeHandler={onimgchangeHandler}
            selectedImage={selectedImage}
            handleImageUpload={handleImageUpload} // Pass the image upload handler
            progressBar={progressBar}
            handleReupload={handleReupload}
          />
          <OcrSection
            code={code}
            onchangeHandler={oninputChangeHandler}
            handleRunClick={handleRunClick}
            updateExtension={updateExtension}
          />
          <OutputSection
            output={output}
            ref={ref}
            input={input}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
