import React from "react";

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      if(this.props.onChange) {
        this.props.onChange(this.state)
      }
    });
  };

  render() {      
    return (
        <label>
          <textarea className='text-area' value={this.state.value} rows='10' cols='125' onChange={this.handleChange}> </textarea>
        </label>
    );
  }
}
export default TextArea