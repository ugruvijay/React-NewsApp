import React, { Component } from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import MyNavbar from "./components/MyNavbar.js"
import HomePage from "./components/HomePage.js";
import Sports from "./components/Sports";
import Politics from "./components/Politics";
import Business from "./components/Business";
import World from "./components/World";
import Technology from "./components/Technology";
import IndividualArticle from "./components/IndividualArticle";
import BookmarksPage from "./components/BookmarksPage";
import SearchResultsPage from './components/SearchResultsPage';
import "./App.css";


export default class App extends Component {
	constructor(){
		super();
		let myStorage = window.localStorage;
    	let isGuardianSelected = myStorage.getItem("isGuardian");
    	if(isGuardianSelected === null){
    		isGuardianSelected = true;
    	}
		this.state = {
			isGuardian : isGuardianSelected,
			isDetailedArticleOpen : false
		}
		this.onChildChanged = this.onChildChanged.bind(this);
	}

    onChildChanged(newState) {
    	let myStorage = window.localStorage;
    	myStorage.setItem("isGuardian", newState);
    	this.setState({
			isGuardian :newState,
			isDetailedArticleOpen : false
		});
	}

	isDetailedArticleOpen(newState){
		console.log("Is isDetailedArticleOpen")
		this.setState((state) => {
		  return {isGuardian: state.isGuardian, isDetailedArticleOpen: true};
		});

	}

	componentWillMount(){
		console.log("will mount " + window.location.href)
	}

	render () {
		return (
		<Router>
			<div>
				<MyNavbar callbackParent={(newState) => this.onChildChanged(newState) } isGuardianSelected={this.state.isGuardian}/>
				<center>
				<div className="wrapper">
					<div className="contents">
						<Route path="/" render={(props) => <HomePage isGuardianSelected={this.state.isGuardian} isAuthed={true} />} exact/>
						<Route path="/sports" render={(props) => <Sports isGuardianSelected={this.state.isGuardian} isAuthed={true} />}/>
						<Route path="/business" render={(props) => <Business isGuardianSelected={this.state.isGuardian} isAuthed={true} />} />
						<Route path="/politics" render={(props) => <Politics isGuardianSelected={this.state.isGuardian} isAuthed={true} />} />
						<Route path="/world" render={(props) => <World isGuardianSelected={this.state.isGuardian} isAuthed={true} />}/>
						<Route path="/technology" render={(props) => <Technology isGuardianSelected={this.state.isGuardian} isAuthed={true} />}/>
						<Route path="/search" render={(props) => <SearchResultsPage {...props} callbackParent={(newState) => this.isDetailedArticleOpen(newState) } isGuardianSelected={this.state.isGuardian} isAuthed={true} />}/>
						<Route path="/article/:name" render={(props) => <IndividualArticle {...props} callbackParent={(newState) => this.isDetailedArticleOpen(newState) } isGuardianSelected={this.state.isGuardian} isAuthed={true} />}/>
						<Route path="/bookmark" render={(props) => <BookmarksPage {...props} isAuthed={true} />} />
					</div>
				</div>
				</center>
			</div>
		</Router>
		);
	}
}

