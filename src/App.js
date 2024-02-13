import logo from './logo.svg';
import './App.css';
import React, { useRef, useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const[allLangs,setAllLangs]=useState([]);

  useEffect(()=>{
    fetch("https://translation.googleapis.com/language/translate/v2/languages?key=AIzaSyB7qw1f805UDuVUVlyjz3gx0oRFB_OoQtU",{
      method: "POST",
      body: JSON.stringify({
        "target":"en"
      }),
    }).then(result=>{
      return result.json();
    }).then(data=>{
      setAllLangs(data.data.languages);
      console.log(data.data.languages);
    }).catch(error=>{
      console.log(error);
      
    });
  },[])

  // const API_KEY="AIzaSyB7qw1f805UDuVUVlyjz3gx0oRFB_OoQtU";
  const API_KEY = process.env.REACT_APP_API_KEY;


  const text="We choose to call ourselves as Usability Enthusiast (some people just refer us as “crazy”, but hey, who cares about “log-baag”). We are calling our this movement as “Only Usable”. We are still working on defining our online identity and legal entities. So, don't be surprised if you don’t find anything about us on net yet except this website. Remember this startup is currently in stealth mode and you are going to be part of its identity. So, lets join hands and build it together!!";
  const textboxref=useRef(null);
  const [currentText,setCurrentText]=useState("");
  const handleClick=(lang)=>{
    console.log(lang);
    
    const queryParams = {
      key: "AIzaSyB7qw1f805UDuVUVlyjz3gx0oRFB_OoQtU",
      target: lang,
      q: currentText,
    };
    axios.post('https://translation.googleapis.com/language/translate/v2', {
      q: currentText,
      target: lang,
    }, {
      params: {
        key: API_KEY,
      },
    })
    .then(response => {
      console.log(response.data.data.translations[0].translatedText);
      let txt=response.data.data.translations[0].translatedText;
      const s2='"';

      const entities = {
        '&quot;': '"',
        '&#39;': "'",
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&nbsp;': ' ',
        '&ndash;': '–',
        '&mdash;': '—',
        '&hellip;': '…',
        '&eacute;': 'é',
      };
      function replaceEntities(text) {
        const entityRegex = new RegExp(Object.keys(entities).join('|'), 'g');
        return text.replace(entityRegex, (match) => entities[match]);
      }
      
      let txtfinal = replaceEntities(txt);
      setCurrentText(txtfinal);
      console.log(lang)
    })
    .catch(error => console.error('Error:', error));

    
  }

  return (
    <div className="App">
      <h1 className="heading">Translate Feature Assigment</h1>
      <div className="dropdown custom-dropdown">
        <DropdownButton id="dropdown-basic-button" title="Select Language">
          {allLangs.map(langdata=>{
            // console.log(langdata);
            return ( <Dropdown.Item onClick={()=>{
              handleClick(langdata.language);
            }}>{langdata.name}</Dropdown.Item>);
          })}
        </DropdownButton>
    </div>
    <div className="app-text">
        <h3>
          {currentText}
        </h3>
      </div>

      <button onClick={()=>{setCurrentText(text)}} className="translate-button">Use Sample Text</button>
      <div  className="text-box">
            <textarea ref={textboxref} className="text-box-area" name="multiLineInput" rows="10" cols="80" placeholder="Enter text here..."></textarea>
            <button onClick={()=>{
              console.log(textboxref.current.value);
              setCurrentText(textboxref.current.value);
              textboxref.current.value="";
            }} className="translate-button add-text-button">Add Text</button>
      </div>

      <div className="ending-space"></div>


      
    </div>
  );
}

export default App;
