import React, { useState } from 'react'


function useToggle(defaultState: boolean): [boolean, () => void]{
  const [show, setShow] = useState(defaultState);
  const toggle = () => {
    
    setShow(!show)
  
  }
  return [show, toggle];
}


function Showhide(){ 
  const [show, toggle] = useToggle(true);
  let val = ''
    if(show)
        val = 'Click here to hide the message'
    else
        val = 'Click here to show the message'
  return (
    <div>
      {show && <h2>this message will show and hide</h2>}
      <button onClick={toggle}>{val}</button>
    </div>
  )
}


export default function Newapp() {

  return (
    <div>
      <Showhide />
    </div>
  )
}