import React, { Component } from "react";
import BookmarkCard from "./BookmarkCard.js"
import CardDeck from 'react-bootstrap/CardDeck'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class BookmarksPage extends Component {
  constructor(){
    super();
    this.state = {
      changed:false
    }
    this.callbackFunction = this.callbackFunction.bind(this);
  }
  toastId = null;

  callbackFunction(title){
    this.forceUpdate();
  }



  render(){
    let myStorage = window.localStorage;

      const count = myStorage.getItem("count");
      if(count === null || count === 0){
        return (<div><h4> No favorites </h4></div>);
      }


      var keys = Object.keys(localStorage),
      i = keys.length;

      let allBookmarksArray = []

      while(i--){
        if(keys[i] === "count" || keys[i] === "isGuardian")
          continue;

        allBookmarksArray.push(myStorage.getItem(keys[i]))
      }

      let allBookmarks = allBookmarksArray.map((eachBookmark, index) => {
        let bookmark = JSON.parse(eachBookmark)
        return (
          <BookmarkCard 
            key={index}
            title={bookmark.title}
            imageUrl={bookmark.imageUrl}
            publishedDate={bookmark.publishedDate}
            description={bookmark.description}
            section={bookmark.section}
            id={bookmark.id}
            url={bookmark.url} 
            source={bookmark.source}
            callbackFunction = {this.callbackFunction}
          />
        )
      })

      let returnText = "";
      if(allBookmarksArray.length === 0){
        returnText = "You have no saved articles"
      }
      else {
        returnText = "Favorites";
      }

      return (
        <>
          <h3 style={{marginLeft:'15px', marginTop:'15px', textAlign: allBookmarksArray.length === 0 ? 'center' : 'left'}}>{returnText}</h3>
          <CardDeck>
            {allBookmarks}
          </CardDeck>
          
          <ToastContainer autoClose={2000}/>
        </>
      );
  }
}