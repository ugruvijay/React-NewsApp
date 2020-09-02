import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

import commentBox from 'commentbox.io';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
 
export default class IndividualArticle extends Component {
	constructor(){
		super();
		this.state = {
			isBookmarked:false,
			isMoreTextVisible: false,
			isLoading: true
		}
		this.handleBookmark = this.handleBookmark.bind(this)
		this.handleMore = this.handleMore.bind(this);
		this.handleLess = this.handleLess.bind(this);
	}
   componentDidMount(){
   	window.scrollTo(0, 0)
   	console.log("value in componentDidMount" + this.state.isBookmarked)
  	this.removeCommentBox = commentBox('5747651853156352-proj');
  	let myStorage = window.localStorage;
  	let val = myStorage.getItem(this.props.location.state.id) === null ? false : true;
  	console.log("value in componentDidMount" + val)
  	this.setState({
  		isBookmarked:val,
  		isMoreTextVisible : false,
  		isLoading: false
  	})
  	this.props.callbackParent(true);
	}

  componentWillUnmount() {
        this.removeCommentBox();
    }	

   handleBookmark(){
   	let myStorage = window.localStorage;

   	let count = myStorage.getItem("count") === null ? 0 : parseInt(myStorage.getItem("count"));

   	if(myStorage.getItem(this.props.location.state.id) !== null){
   		myStorage.removeItem(this.props.location.state.id)
   		if(count >= 1){
	   		myStorage.setItem("count", count - 1);
	   	}
	   	else {
	   		myStorage.removeItem("count");
	   	}
	   	toast("Removing " + this.props.location.state.title, {
	        position: toast.POSITION.TOP_CENTER,
	        className:'toastMessage',
	        hideProgressBar:true
	    });
	    this.setState({
	    	isBookmarked: false,
	    	isMoreTextVisible : this.state.isMoreTextVisible
	    })
   	}
   	else {
   		myStorage.setItem("count", count + 1);

	   	let jsonObj = {"title":"" + this.props.location.state.title, 
   				   "imageUrl":"" + this.props.location.state.imageUrl,
   				   "description":"" + this.props.location.state.description,
   				   "publishedDate":"" + this.props.location.state.publishedDate,
   				   "section":"" + this.props.location.state.section,
   				   "source":this.props.isGuardianSelected ? "guardian" : "nytimes",
   				   "id":this.props.location.state.id,
   				   "url":this.props.location.state.url
				  }
		myStorage.setItem(this.props.location.state.id, JSON.stringify(jsonObj))
		toast("Saving " + this.props.location.state.title, {
	        position: toast.POSITION.TOP_CENTER,
	        className:'toastMessage',
	        hideProgressBar:true
	    });
	    this.setState({
	    	isBookmarked: true,
	    	isMoreTextVisible : this.state.isMoreTextVisible
	    })
	}	
   }

   handleMore(){
   		this.setState({
   			isBookmarked: this.state.isBookmarked,
   			isMoreTextVisible : true
   		})
   }

   handleLess(){
   		this.setState({
   			isBookmarked: this.state.isBookmarked,
   			isMoreTextVisible : false
   		})
   }

  render() {
  	let newDate = this.props.location.state.publishedDate.split("T")[0].split('-');
	let yyyy = newDate[0];
	let mm = newDate[1];
	let dd = newDate[2];

	let words = this.props.location.state.description.split(' ');
	let initialText = "";
	let moreText = "";
	let wordCount = 200;

	if(words.length > 200){
		for(let i = 200; i > 0; i--){
			if(words[i].charAt(words[i].length - 1) === "."){
				wordCount = i;
				break;
			}
		}
	}

	for(let i = 0; i < words.length; i++){
		if(i <= wordCount) {
			initialText += " " + words[i];
		}
		else {
			moreText += " " + words[i];
		}
	}
	console.log(this.state.isLoading)

	return (
		<>
		<Container fluid>
			<Row>
				<Col sm={true}>
					<h3 className="card-title individualTitle">{this.props.location.state.title}</h3>
		    	</Col>
			</Row>
			<Row style={{marginTop:"10px", marginBottom:"10px"}}>
				<Col style={{width:"75%", paddingRight:"0px"}}>
					<p className="card-text individualDate">{yyyy + "-" + mm + "-" + dd}</p>
				</Col>
				<Col style={{textAlign:"right", paddingLeft:"0px" }}>
					<OverlayTrigger
					    placement="top"
					    delay={{ show: 250, hide: 400 }}
					    overlay={
				          <Tooltip id={`tooltip-top`}>Facebook</Tooltip>
				        }>
							<FacebookShareButton url={this.props.location.state.url} hashtag="#CSCI_571_NewsApp" >
								<FacebookIcon size={32} round={true}/>
							</FacebookShareButton>
						</OverlayTrigger>
					<OverlayTrigger
					    placement="top"
					    delay={{ show: 250, hide: 400 }}
					    overlay={
				          <Tooltip id={`tooltip-top`}>Twitter</Tooltip>
				        }>
					
						<TwitterShareButton url={this.props.location.state.url + "#CSCI_571_NewsApp"}>
							<TwitterIcon size={32} round={true}/>
						</TwitterShareButton>
					</OverlayTrigger>
					<OverlayTrigger
					    placement="top"
					    delay={{ show: 250, hide: 400 }}
					    overlay={
				          <Tooltip id={`tooltip-top`}>Email</Tooltip>
				        }>
					
						<EmailShareButton url={""} subject={"#CSCI_571_NewsApp"} body={this.props.location.state.url}>
							<EmailIcon size={32} round={true}/>
						</EmailShareButton>
					</OverlayTrigger>
					<OverlayTrigger
					    placement="top"
					    delay={{ show: 250, hide: 400 }}
					    overlay={
				          <Tooltip id={`tooltip-top`}>Bookmark</Tooltip>
				        }>
						<MdBookmark style={{width:"30px", height:"30px", marginLeft:"30px", color:"red", display:this.state.isBookmarked ? "inline" : "none"}} onClick={this.handleBookmark}/>
					</OverlayTrigger>
					<OverlayTrigger
					    placement="top"
					    delay={{ show: 250, hide: 400 }}
					    overlay={
				          <Tooltip id={`tooltip-top`}>Bookmark</Tooltip>
				        }>
						<MdBookmarkBorder style={{width:"30px", height:"30px", marginLeft:"30px", color:"red", display:this.state.isBookmarked ? "none" : "inline"}} onClick={this.handleBookmark}/>
					</OverlayTrigger>
				</Col>
			</Row>
			<Row>
			    <Col>
			    	<center>
			    		<img className="img-responsive individualImage" src={this.props.location.state.imageUrl} alt="Broken"/>
			    	</center>
			    </Col>
			</Row>
			<Row>
			    <Col sm={true}>
					<p className="card-text individualDesc">{initialText}</p>
					<p className="card-text individualDesc moreText" style={{display : this.state.isMoreTextVisible === true ? "inline" : "none"}}>{moreText}</p>
					<br />
					<IoIosArrowDown onClick={this.handleMore} style={{float:"right" ,display : moreText !== "" ? this.state.isMoreTextVisible === true ? "none" : "inline" : "none", textAlign:"right"}} />
					<IoIosArrowUp onClick={this.handleLess} style={{float:"right", display : moreText !== "" ? this.state.isMoreTextVisible === true ? "inline" : "none" : "none", textAlign:"right"}} />
				</Col>
		  	</Row>
		  	</Container>
		  	<br/>
		  	<div className="commentbox"></div>
		  	<ToastContainer autoClose={2000}/>
		
	</>
	);
  }
}