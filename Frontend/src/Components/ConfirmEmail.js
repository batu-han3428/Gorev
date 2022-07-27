import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const ConfirmEmail = () =>{
  const params = useParams();
  const [gif, setGif] = useState("");
  useEffect(()=>{
    if(params.state === ":true")
      setGif(true)
    else if(params.state === ":false")
      setGif(false)
  },[])
  return (
      <div id="mainDiv" style={{display:"flex",justifyContent:"center", height:"100vh", alignItems:"center"}}>
        {gif ?
          <img style={{width:"40%", height:"50vh"}} src={require('../img/successConfirmEmail.gif')} alt="successEmailPhoto"/>
          :
          <img style={{width:"40%", height:"50vh"}} src={require('../img/failedConfirmEmail.webp')} alt="failedEmailPhoto"/>
        }
      </div>
  )
}


export default ConfirmEmail;