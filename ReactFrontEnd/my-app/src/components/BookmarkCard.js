import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import { MdShare, MdDelete } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card'
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

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
export default class BookmarkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	show : false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event){
  	event.preventDefault();
  	this.setState({show:false});
  }

  handleShow(event){
  	event.preventDefault();
  	this.setState({show:true});
  }

  test(){

  }

  handleBookmarkRemove(event){
  	event.preventDefault();
  	let myStorage = window.localStorage;
  	myStorage.removeItem(this.props.id)
  	this.props.callbackFunction(this.props.title);
  	toast("Removing " + this.props.title, {
        position: toast.POSITION.TOP_CENTER,
        className:'toastMessage',
        hideProgressBar:true
      });
  }
 
  render() {
  	let newDate = this.props.publishedDate.split("T")[0].split('-');
	let yyyy = newDate[0];
	let mm = newDate[1];
	let dd = newDate[2];

	let sectionClassName = "";
	if(this.props.section === "world" || this.props.section === "politics" || this.props.section === "technology" || this.props.section === "sport" || this.props.section === "business"){
		sectionClassName = this.props.section;
	}
	else {
		sectionClassName = "other";
	}
	console.log(this.props.source)

    return (
    	<Link className="mainPageLinks" style={{textDecoration:"inherit", color:"inherit"}} to={{ pathname:'/article/' + this.props.id, 
    				state: {
    					title: this.props.title,
    					imageUrl: this.props.imageUrl,
    					publishedDate: this.props.publishedDate,
    					description: this.props.description,
    					url: this.props.url,
    					id: this.props.id,
    					section: this.props.section
    				}
    			}}>
			<Card style={{ width: '22rem', margin:'15px'}}>
				<Card.Body>
				    <Card.Title className="bookmarkCardTitle">{this.props.title} <MdShare onClick={(e) => this.handleShow(e)}/> <MdDelete onClick={(e) => this.handleBookmarkRemove(e)}/></Card.Title>
				    <Card.Img variant="top" className="bookmarkImage" src={this.props.imageUrl} />
				    <Container>
			    		<Row style={{marginTop:"10px"}}>
			    			<Col style={{width:"25%"}}>
			     				<p className="card-text mainPageDate">{yyyy + "-" + mm + "-" + dd}</p>
			     			</Col>
			     			<Col md="true" style={{textAlign:"right", marginRight:"10px" }}>
			     				<div className={"card-text bookmarkPageSection "  + sectionClassName }>{this.props.section.toUpperCase()}</div>
			     			</Col>
			     			<Col md="true">
		     					<div className={"card-text bookmarkPageSection "  + this.props.source }>{this.props.source.toUpperCase()}</div>
		     				</Col>
		     			</Row>
		     		</Container>
				  </Card.Body>
			</Card>
			<Modal show={this.state.show} onHide={this.test}>
		        <Modal.Header closeButton onClick={(e) => this.handleClose(e)}>
		          <Modal.Title>{this.props.title}</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		        	<div>
		        		<Container>
		        			<Row>
		        				<Col>
			        				<center>
			        					<h4> Share via </h4>
		        					</center>
		        				</Col>
		        			</Row>
		        			<Row>
		        				<Col sm>
		        					<FacebookShareButton url={this.props.url} hashtag="#CSCI_571_NewsApp" style={{width:"33%"}}>
		        						<FacebookIcon size={64} round={true}/>
		        					</FacebookShareButton>
		        					
		        					<TwitterShareButton url={this.props.url + "#CSCI_571_NewsApp"} style={{width:"33%"}}>
		        						<TwitterIcon size={64} round={true}/>
		        					</TwitterShareButton>
		        					
		        					<EmailShareButton url={""} subject={"#CSCI_571_NewsApp"} body={this.props.url} style={{width:"33%"}}>
		        						<EmailIcon size={64} round={true}/>
		        					</EmailShareButton>
		        				</Col>
		        			</Row>
		        		</Container>
		        	</div>
		        </Modal.Body>
		      </Modal>
		</Link>
    );
  }
}
