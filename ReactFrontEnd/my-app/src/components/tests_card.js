import React, { Component } from "react";
import { Share } from 'react-bootstrap-icons';
import cloneDeep from 'lodash/cloneDeep';


 
export default class MyCard extends Component {
  constructor() {
    super();
    this.state = {
    	items:null
    };
  }

  componentDidMount() {
    fetch("https://content.guardianapis.com/search?api-key=30e76b29-0dd8-4797-b589-9f220012a24a&section=(sport|business|technology|politics)&show-blocks=all")
    //fetch("https://swapi.co/api/people/1")
      .then(res => res.json())
      .then((response1) => {
          this.setState({
            isLoaded: true,
            items: response1.response.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
 
  render() {
  	if(this.state.items === null)
  		return null;

  	//let results = cloneDeep(this.state.items)
  	//var result1  = cloneDeep(results[0])
  	//console.log(cloneDeep(result1).webTitle)
  	console.log(this.state.items)
  	console.log(this.state.items.length)
  	//console.log(this.state.items.name)
  	//let jsonObj1 = JSON.parse(jsonObj)

    //console.log(jsonObj['results'][0].webTitle)
    return (
		<div className="card" style={{display:'flex', flexDirection:"row", margin:"1.25rem" ,border:"1px solid black"}}>
			<img className="card-img-left" src={this.state.items[0].blocks.main.elements[0].assets[this.state.items[0].blocks.main.elements[0].assets.length - 1].file} style={{width:"350px", height:"300px", margin:"1.25rem", border:"1px solid black"}}/>
			<div className="card-body">
				<h5 className="card-title mainPageTitle">{this.state.items[0].webTitle}</h5>
				<p className="card-text mainPageDesc">{this.state.items[0].blocks.body[0].bodyTextSummary}</p>
				<p className="card-text mainPageDate">{this.state.items[0].webPublicationDate}</p>
				<div className="card-text mainPageSection">{this.state.items[0].sectionName.toUpperCase()}</div>
			</div>
		</div>

		
    );
  }
}