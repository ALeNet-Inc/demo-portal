import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import './styles/DropdownTable.css';

export default function DropdownTable(props) {
  return (
    <div className='dropdown-table-container'>
      <div className='dropdown-table-headers'>
        {
          props.headers.map(header => {
            return (
              <h3 key={header}>{header}</h3>
            );
          })
        }
      </div>
      <ul className='dropdown-table'>
        {props.children}
      </ul>
    </div>
  );
}

export function DropdownTableItem(props) {

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <li className='dropdown-table-item'>
      <a href='#id' className='dropdown-table-row' onClick={toggle}>
        {open ? <AiIcons.AiFillCaretDown className='caret' /> : <AiIcons.AiFillCaretRight className='caret' />}
        <div className='row-label-group'>
          <label className='dropdown-table-item-label'>{props.label1}</label>
          <label className='dropdown-table-item-label'>{props.label2}</label>
        </div>
      </a>
      {open && props.children}
    </li>
  );
}

export function DropdownTableMenu(props) {

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <div className='dropdown-table-menu'>
      <div className='dropdown-table-text'>
        <div className='dropdown-table-menu-left-col'>
          {
            props.textItems ? (
              props.textItems.map((textItem, index) => {
                if (index < Math.floor(props.textItems.length / 2)) {
                  return (
                    <ul className='dropdown-table-menu-items' key={textItem.value}>
                      <li className='dropdown-table-menu-item'>
                        <strong>{textItem.label + ': '}</strong>{textItem.value}
                      </li>
                    </ul>
                  );
                } else {
                  return null
                }
              })
            ) : (
              null
            )
          }
        </div>
        <div className='dropdown-table-menu-right-col'>
          {
            props.textItems ? (
              props.textItems.map((textItem, index) => {
                if (index >= Math.floor(props.textItems.length / 2)) {
                  return (
                    <ul className='dropdown-table-menu-items' key={textItem.value + ' ' + index}>
                      <li className='dropdown-table-menu-item'>
                        <strong>{textItem.label + ': '}</strong>{textItem.value}
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              null
            )
          }
        </div>
      </div>
      {
        props.button ? (
          <div className='dropdown-btn-container'>
            <button className='dropdown-btn' type='button' onClick={toggle}>
              {props.button} <AiIcons.AiFillPlusCircle className='plus-icon' />
            </button>
          </div>
        ) : (
          null
        )
      }
      {open && props.children}
    </div>
  );
}

