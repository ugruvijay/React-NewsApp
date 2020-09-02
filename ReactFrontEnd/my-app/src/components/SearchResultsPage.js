import React, { Component } from "react";
import AllSearchCards from './AllSearchCards';
import MySpinner from './MySpinner';

export default class SearchResultsPage extends Component {
  constructor() {
    super();
    this.state = {
      items:null,
      isLoading:true,
      isGuardianSelected: true
    };
    this.fetchData = this.fetchData.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
  }
  toastId = null;

  callbackFunction(title){
    this.forceUpdate();
  }

  componentDidMount() {
    this.fetchData(this.props.isGuardianSelected, this.props.location.state.query)
    this.props.callbackParent(true);
  }

  fetchData(isGuardian, query){
    if(isGuardian === true || isGuardian === "true") {
      fetch("https://ugruvijay-94.wl.r.appspot.com/guardian/search?q=" + query)
        .then(res => res.json())
        .then((response1) => {
          this.setState({
            isGuardianSelected: isGuardian,
            isLoading:false,
            items: response1.response.results
          });
        },
        (error) => {
          this.setState({
             isLoading:false,
            items: null
          });
        }
      )
    }
    else {
      console.log("Search NY Times")
      fetch("https://ugruvijay-94.wl.r.appspot.com/nytimes/search?q=" + query)
        .then(res => res.json())
        .then((response1) => {
          console.log(response1.response.docs)
          this.setState({
            isGuardianSelected: isGuardian,
             isLoading:false,
            items: response1.response.docs
          });
        },
        (error) => {
          this.setState({
            isLoading:false,
            items: null
          });
        }
      )
    }
  }

  render(){
    if(this.state.items == null){
      return (<MySpinner isLoading={this.state.isLoading}/>);
    }
    let returnText = ""
    if(this.state.items !== null){
      returnText = "Results"
    }
    else {
      returnText = "No results"
    }
      return (
      <div>
        <h3 style={{marginLeft:'15px', marginTop:'15px', textAlign: this.state.items.length === 0 ? 'center' : 'left'}}>{returnText}</h3>
        <AllSearchCards allCards={this.state.items} isGuardianSelected={this.state.isGuardianSelected}/>
      </div>
    );
  }
}