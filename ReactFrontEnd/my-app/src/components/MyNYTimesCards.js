import React, { Component } from "react";
import MyCard from "./MyCard.js"
 
export default class MyNYTimesCards extends Component {
  constructor() {
    super();
    this.state = {
    	items:null
    };
  }

  componentDidMount() {
    fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=9xX4GcQ9DeeK7l4gCvgoAdMVFpJYhwtG")
		.then(res => res.json())
		.then((response) => {
		  this.setState({
		    isLoaded: true,
		    items: response.results
		  });
		},
		(error) => {
		  this.setState({
		    isLoaded: true,
		    items: null
		  });
		}
  	)
  }
 
  render() {

  	if(this.state.items === null)
  		return null;

  	const cardData = this.state.items;
  	let url = "";
  	const allCards = cardData.map(card => {
  		if(card.blocks.main.elements[0].assets.length == 0 || card.blocks.main.elements[0].assets[card.blocks.main.elements[0].assets.length - 1].file == ""){
  			url = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
  		} else {
  			url = card.blocks.main.elements[0].assets[card.blocks.main.elements[0].assets.length - 1].file;
  		}
  		return (
	  		<MyCard 
	  			key={card.id}
	  			title={card.title} 
	  			imageUrl={url}
	  			publishedDate={card.published_date}
	  			description={card.abstract}
	  			section={card.section.toUpperCase()}
		/>)
  	})
  	console.log(allCards)
    return (
		<div>
			{allCards}
		</div>
    );
  }
}