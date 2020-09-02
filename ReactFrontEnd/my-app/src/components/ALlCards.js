import React from "react";
import MyCard from "./MyCard.js"

function AllCards(props) {
	const cardData = props.allCards;
    console.log(cardData)
    let allCards = "";
    let url = "";
    if(props.isGuardianSelected === true || props.isGuardianSelected === "true") {
       allCards = cardData.map(card => {
        if(!card.hasOwnProperty('blocks') || !card.blocks.hasOwnProperty('main') || !card.blocks.main.hasOwnProperty('elements') || 
        	card.blocks.main.elements[0].assets.length === 0 || card.blocks.main.elements[0].assets[card.blocks.main.elements[0].assets.length - 1].file === ""){
          url = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        } else {
          url = card.blocks.main.elements[0].assets[card.blocks.main.elements[0].assets.length - 1].file;
        }
        return (
          <MyCard 
            key={card.id}
            title={card.webTitle} 
            imageUrl={url}
            publishedDate={card.webPublicationDate}
            description={card.blocks.body[0].bodyTextSummary}
            section={card.sectionId}
            id={card.id}
            url={card.webUrl}
      />)
      })
    }
    else {
      let urls = []
      let count = 0
      let prev = 0

      cardData.forEach((card) => {
        if(card.multimedia === null){
          urls[count] = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
          count += 1
          prev += 1
        }
        else {
          card.multimedia.forEach((multimedia) => {
            if(multimedia.format === "superJumbo"){
              urls[count] = multimedia.url;
              count += 1;
            }
          });
          if(count === prev){
            urls[count] = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            count += 1;
            prev += 1;
          }
          else {
            prev += 1;
          }
        }
      });

       allCards = cardData.map((card, index) => {
       	if(index < 10)
	        return (
	          <MyCard 
	            key={index }
	            title={card.title} 
	            imageUrl={urls[index]}
	            publishedDate={card.published_date}
	            description={card.abstract}
	            section={card.section}
	            id={card.url}
	            url={card.url}
	          />)
      })
    }
    return (
      <div>
        {allCards}
      </div>
    );
}

export default AllCards;
