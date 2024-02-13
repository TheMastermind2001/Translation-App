import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
// or less ideally
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
      // headers: {
        // "Content-Type": "application/json",
      // },
    }).then(result=>{
      // console.log(result);
      return result.json();
    }).then(data=>{
      setAllLangs(data.data.languages);
      console.log(data.data.languages);
    }).catch(error=>{
      console.log(error);
      
    });
  },[])

  const API_KEY="AIzaSyB7qw1f805UDuVUVlyjz3gx0oRFB_OoQtU";

  const text="We choose to call ourselves as Usability Enthusiast (some people just refer us as “crazy”, but hey, who cares about “log-baag”). We are calling our this movement as “Only Usable”. We are still working on defining our online identity and legal entities. So, don't be surprised if you don’t find anything about us on net yet except this website. Remember this startup is currently in stealth mode and you are going to be part of its identity. So, lets join hands and build it together!!";

  const [currentText,setCurrentText]=useState(text);

  const handleClick=(lang)=>{
    console.log(lang);
    
    const queryParams = {
      key: "AIzaSyB7qw1f805UDuVUVlyjz3gx0oRFB_OoQtU",
      target: lang,
      q: currentText,
    };
    
    // axios.post('https://translation.googleapis.com/language/translate/v2', {
    //   params: queryParams,
    // })
    // .then(response => {
    //   console.log(response.data);
    //   // setCurrentText(response.data);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });

    // fetch("https://translation.googleapis.com/language/translate/v2?"+"key=AIzaSyB7qw1f805UDuVUVlyjz3gx0oRFB_OoQtU&target="+lang+"&q="+currentText,{
    //   method: "POST",
    // }
    // ).then(result=>{
    //   return result.json();
    // }).then(data=>{
    //   console.log(data);
    // }).catch(error=>{
    //   console.log(error);
    // })


    // const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&target=${lang}&q=${currentText}`;

    // fetch(url, {
    //   method: "POST", // Google's Translation API allows data in the query string for POST
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));





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
        // Common entities
        '&nbsp;': ' ',
        '&ndash;': '–',
        '&mdash;': '—',
        '&hellip;': '…',
        '&eacute;': 'é',
        // Add more entities as needed
      };
      
      // Function to replace entities with characters
      function replaceEntities(text) {
        const entityRegex = new RegExp(Object.keys(entities).join('|'), 'g');
        return text.replace(entityRegex, (match) => entities[match]);
      }
      
      let txtfinal = replaceEntities(txt);
      // let txtfinal="";
      // for(let i=0;i<txt.length;i++){
      //   if(txt[i]=='&' && (i+1<txt.length && txt[i+1]=='q') && (i+2<txt.length && txt[i+2]=='u') &&
      //   (i+3<txt.length && txt[i+3]=='o') && (i+4<txt.length && txt[i+4]=='t') && (i+5<txt.length && txt[i+5]==';')){
      //     txtfinal=txtfinal+s2; 
      //     i=i+5;continue;
      //   }
      //   txtfinal=txtfinal+txt[i];
      // }
      setCurrentText(txtfinal);
      console.log(lang)
    })
    .catch(error => console.error('Error:', error));






    // fetch("https://translation.googleapis.com/language/translate/v2?q=My name is Agniva Bhattacharya. I am a student at IIT Kharagpur.&key=AIzaSyB7qw1f805UDuVUVlyjz3gx0oRFB_OoQtU&target=bn",{
    //   method: "GET",
    // }
    // ).then(result=>{
    //   return result.json();
    // }).then(data=>{
    //   console.log(data);
    // })
    
  }

  return (
    <div className="App">
      {/* <button className="translate-button">Translate</button> */}
      <h1 className="heading">Translate Feature Assigment</h1>
      <div className="dropdown custom-dropdown">
        <DropdownButton id="dropdown-basic-button" title="Select Language">
          
          
          {allLangs.map(langdata=>{
            // console.log(langdata);
            return ( <Dropdown.Item onClick={()=>{
              handleClick(langdata.language);
            }}>{langdata.name}</Dropdown.Item>);
          })}
          
          {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
           */}
        </DropdownButton>
    </div>


    



      <div className="app-text">
        <h3>
          {currentText}
        </h3>
      </div>
    </div>
  );
}

export default App;
