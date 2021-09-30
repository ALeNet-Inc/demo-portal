import React from "react";
import './styles/Dropdown.css'

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Select" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      if(this.props.onChange) {
        this.props.onChange(this.state)
      }
    });
  };

  render() {
      const setOptions = this.props.options.map(option => {
          return (
              <option key={option.key} value={option.value}>{option.value}</option>
          )
      })

      
    return (
        <label>
          <select value={this.state.value} onChange={this.handleChange} className='select'>
            {setOptions}
          </select>
        </label>
    );
  }
}
export default Dropdown