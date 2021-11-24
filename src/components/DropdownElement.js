import React, { useState } from 'react'
import * as AiIcons from 'react-icons/ai'
import './styles/DropdownElement.css'

function DropdownElement(props) {
  let color1, color2;

  if (props.styles && props.styles === 'Approved') {
    color1 = 'rgb(10, 100, 5)'
    color2 = 'rgb(70, 136, 70)'
  }
  if (props.styles && props.styles === 'Pending') {
    color1 = 'rgb(235, 203, 23)'
    color2 = 'rgb(197, 185, 77)'
  }
  if (props.styles && props.styles === 'Rejected') {
    color1 = 'red'
    color2 = 'rgb(180, 30, 30)'
  }

  const [open, setOpen] = useState(true);
  const toggle = () => setOpen(!open);
  return (
    <div className='element-container'>
      <div className='element-headers' onClick={toggle} style={{ borderColor: color1 }}>
        <h1 className='element-header' style={{color: color2}}>{props.icon} { '     ' + props.header}</h1>
        {
          open ?
            <AiIcons.AiOutlineCaretDown className='elem-caret' style={{color: color2}}/>
            :
            <AiIcons.AiOutlineCaretRight className='elem-caret' style={{color: color2}}/>
        }
      </div>
      {
        open &&
        <div className='element-content' style={{ borderColor: color1 }}>
          {props.children}
        </div>
      }
    </div>
  )
}

export default DropdownElement
