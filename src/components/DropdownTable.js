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
  let color2;

  if (props.styles && props.styles === 'approved') {
    color2 = 'rgba(103, 158, 78, 0.74)'
  }
  if (props.styles && props.styles === 'pending') {
    color2 = 'rgba(206, 165, 33, 0.74)'
  }
  if (props.styles && props.styles === 'rejected') {
    color2 = 'rgba(212, 44, 44, 0.74)'
  }
  if (props.styles && props.styles === 'blue') {
    color2 = 'rgba(79, 149, 255, 0.70)'
  }
  if (props.styles && props.styles === 'purple') {
    color2 = 'rgba(114, 43, 185, 0.7)'
  }
  if (props.styles && props.styles === 'grey') {
    color2 = 'rgb(96, 124, 153)'
  }


  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <li className='dropdown-table-item'>
      <button id={props.index} className='dropdown-table-row' onClick={toggle} style={{ backgroundColor: color2 }}>
        {open ? <AiIcons.AiFillCaretDown className='caret' /> : <AiIcons.AiFillCaretRight className='caret' />}
        <div className='row-label-group'>
          <label className='dropdown-table-item-label'>{props.label1}</label>
          <label className='dropdown-table-item-label'>{props.label2}</label>
        </div>
      </button>
      {open && props.children}
    </li>
  );
}

export function DropdownTableMenu(props) {
  let color1, color2;

  if (props.styles && props.styles === 'approved') {
    color1 = 'rgb(10, 100, 5)'
    color2 = 'rgba(103, 158, 78, 0.74)'
  }
  if (props.styles && props.styles === 'pending') {
    color1 = 'rgb(235, 203, 23)'
    color2 = 'rgba(206, 165, 33, 0.74)'
  }
  if (props.styles && props.styles === 'rejected') {
    color1 = 'red'
    color2 = 'rgba(212, 44, 44, 0.74)'
  }
  if (props.styles && props.styles === 'blue') {
    color1 = 'rgb(23, 122, 221)'
    color2 = 'rgba(79, 149, 255, 0.70)'
  }
  if (props.styles && props.styles === 'purple') {
    color1 = 'rgb(153, 88, 217)'
    color2 = 'rgba(114, 43, 185, 0.7)'
  }
  if (props.styles && props.styles === 'grey') {
    color1 = 'rgb(96, 124, 153)'
    color2 = 'rgba(169, 186, 202, 0.87)'
  }


  const [activeMenu, setActiveMenu] = useState('main');

  const rightButtonClick = () => {
    if (activeMenu === 'main' && props.rightMenu) setActiveMenu('right');
    if (activeMenu === 'left' && props.mainMenu) setActiveMenu('main');
    return null
  }
  const leftButtonClick = () => {
    if (activeMenu === 'main' && props.leftMenu) setActiveMenu('left');
    if (activeMenu === 'right' && props.mainMenu) setActiveMenu('main');
    return null
  }

  return (
    <div className='dropdown-table-menu' style={{ backgroundColor: color2 }}>
      {
        activeMenu === 'main' ? (
          <div className='dropdown-table-text'>
            <div className='dropdown-table-menu-left-col'>
              {props.mainMenu ? (
                props.mainMenu.map((menuItem, index) => {
                  if (index < Math.floor(props.mainMenu.length / 2)) {
                    return (
                      <ul className='dropdown-table-menu-items' key={menuItem.value + ' ' + index}>
                        <li className='dropdown-table-menu-item'>
                          <strong>{menuItem.label + ': '}</strong>{menuItem.value}
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
                props.mainMenu ? (
                  props.mainMenu.map((menuItem, index) => {
                    if (index >= Math.floor(props.mainMenu.length / 2)) {
                      return (
                        <ul className='dropdown-table-menu-items' key={menuItem.value + ' ' + index}>
                          <li className='dropdown-table-menu-item'>
                            <strong>{menuItem.label + ': '}</strong>{menuItem.value}
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
        ) : activeMenu === 'right' && props.rightMenu ? (
          <div className='dropdown-table-text'>
            <h2 className='menu-header'>{props.rightMenuTitle}</h2>
            <div className='dropdown-table-menu-left-col'>
              {props.rightMenu ? (
                props.rightMenu.map((menuItem, index) => {
                  if (index < Math.floor(props.rightMenu.length / 2)) {
                    return (
                      <ul className='dropdown-table-menu-items' key={menuItem.value + ' ' + index}>
                        <li className='dropdown-table-right-menu-item'>
                          <strong>{menuItem.label + ': '}</strong>{menuItem.value}
                        </li>
                      </ul>
                    );
                  }
                  return null
                })
              ) : (
                null
              )
              }
            </div>
            <div className='dropdown-table-menu-right-col'>
              {
                props.rightMenu ? (
                  props.rightMenu.map((menuItem, index) => {
                    if (index >= Math.floor(props.rightMenu.length / 2)) {
                      return (
                        <ul className='dropdown-table-menu-items' key={menuItem.value + ' ' + index}>
                          <li className='dropdown-table-right-menu-item'>
                            <strong>{menuItem.label + ': '}</strong>{menuItem.value}
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
        ) : activeMenu === 'left' && props.leftMenu ? (
          <div className='service-request-box'>
            <h2>Report a Problem: </h2>
          </div>
        ) : null
      }
      <div className='btn-container'>
        <button
          className='menu-btn'
          disabled={(activeMenu === 'left') || (activeMenu === 'main' && !props.leftMenu)}
          type='button'
          onClick={leftButtonClick}
          style={{ backgroundColor: color1 }}
        >
          <AiIcons.AiFillCaretLeft className='caret-btn' />
        </button>
        <button
          className='menu-btn'
          disabled={(activeMenu === 'right') || (activeMenu === 'main' && !props.rightMenu)}
          type='button'
          onClick={rightButtonClick}
          style={{ backgroundColor: color1 }}
        >
          <AiIcons.AiFillCaretRight className='caret-btn' />
        </button>
      </div>
    </div>
  );
}

