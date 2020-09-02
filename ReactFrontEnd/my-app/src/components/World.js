import React, { Component } from "react";
import AllCards from "./AllCards.js";
import MySpinner from './MySpinner';
 
export default class World extends Component {
  constructor() {
    super();
    this.state = {
      items:null,
      isLoading: true,
      isGuardianSelected: true
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items:null,
      isLoading: true
    })
    this.fetchData(nextProps.isGuardianSelected);
  }

  componentDidMount() {
    this.fetchData(this.props.isGuardianSelected)
  }

  fetchData(isGuardian){
    if(isGuardian === true || isGuardian === "true") {
      fetch("https://ugruvijay-94.wl.r.appspot.com/guardian/world")
        .then(res => res.json())
        .then((response1) => {
          this.setState({
            isGuardianSelected: isGuardian,
            isLoading: false,
            items: response1.response.results
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            items: null
          });
        }
      )
    }
    else {
      fetch("https://ugruvijay-94.wl.r.appspot.com/nytimes/world")
        .then(res => res.json())
        .then((response) => {
          this.setState({
            isGuardianSelected: isGuardian,
            isLoading: false,
            items: response.results
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            items: null
          });
        }
      )
    }
  }
 
  render() {
    if(this.state.items === null){
      return (<MySpinner isLoading={this.state.isLoading}/>);
    }
    return (
      <div>
        <AllCards allCards={this.state.items} isGuardianSelected={this.state.isGuardianSelected}/>
      </div>
    );
  }
}