import React, { useState } from "react";
import LoadingMask from './LoadingMask'

const Subscription = ({close}) => {
  
  const [ loading, setLoading ] = useState(false)
  const [ value, setValue ] = useState("")
  const [ response, setResponse ] = useState(null)
  
  const submitForm = () => {
    setLoading(true)
    fetch("https://api/hotels/subscribe", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: value })
    })
    .then((res) => setResponse(true))
    .catch((err) => setResponse(false))
    .finally(() => setTimeout(close, 2000))
  }
  
  return (
    <div>
      {
        response === true ?
          <p>Subscribed</p> : response === false ?
          <p>Oops, something happened</p> : loading ?
          <LoadingMask /> :
        <div>
          <p>Request more info about</p>
          <input value={value} onChange={e => setValue(e.target.value)} />
            <button disabled={!(value.includes("@") && value.includes('.'))} onClick={submitForm}>Submit</button>
            </div>
      }
    
  </div>
  )
  
};

export default Subscription;