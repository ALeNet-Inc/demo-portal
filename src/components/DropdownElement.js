import React, { useState } from 'react'
import * as AiIcons from 'react-icons/ai'
import './styles/DropdownElement.css'

function DropdownElement(props) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <div className='element-container'>
      <div className='element-headers' onClick={toggle}>
        <h1 className='element-header'>{props.icon} { '     ' + props.header}</h1>
        {
          open ?
            <AiIcons.AiOutlineCaretDown className='elem-caret'/>
            :
            <AiIcons.AiOutlineCaretRight className='elem-caret'/>
        }
      </div>
      {
        open &&
        <div className='element-content'>
          {props.children}
        </div>
      }
    </div>
  )
}

export default DropdownElement
