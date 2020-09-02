import React, { Component } from "react";
import Switch from "react-switch";
 
export default class MySwitch extends Component {
  constructor(props) {
    super(props);
    console.log("switch " + this.props.isGuardianSelected);
    this.state = { checked: this.props.isGuardianSelected === "true" ? true : false};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("switchNext prop" + window.location.href);
  }
 
  handleChange(checked) {
    console.log(checked)
    this.setState({ checked });
    this.props.callbackParent(checked); 
  }
 
  render() {
    return (
      <label style={{margin:"0.5rem", display:this.props.isHidden === true ? "inline": "none"}}>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#0000FF"
          uncheckedIcon={false}
          checkedIcon={false}
          className="react-switch"
          id="icon-switch"
        />
      </label>
    );
  }
}