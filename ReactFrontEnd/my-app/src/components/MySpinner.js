import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;
 

 export default class MySpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillReceiveProps(nextProps){
    console.log("compnent will receive props " + nextProps)
    this.setState({
      loading: nextProps.isLoading
    })
  }

  componentDidMount(){
    if(this.props.isLoading === false)
      this.setState({
        loading: false
      })
  }
 
  render() {
    return (
      <div className="sweet-loading" style={{position:"fixed", top:"50%", left:"50%"}}>
        <BounceLoader
          css={override}
          size={40}
          color={"#123abc"}
          loading={this.state.loading}
        />
        <h4>Loading</h4>  
      </div>
    );
  }
}