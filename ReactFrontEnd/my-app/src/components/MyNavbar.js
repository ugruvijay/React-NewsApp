import React, { Component } from "react";
import { Navbar, Form, Nav } from "react-bootstrap";
import MySwitch from "./MySwitch.js";
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'
import WithCallbacks from './WithCallbacks.js'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
 
export default class MyNavbar extends Component {
  constructor(props) {
    super(props);
    let myStorage = window.localStorage;
    let isGuardianSelected = myStorage.getItem("isGuardian");
    this.state = {
      isGuardian: isGuardianSelected,
      isSwitchVisible: true
    }
    this.handleBookmark = this.handleBookmark.bind(this)
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
    console.log(window.location.href);
  }

  componentWillReceiveProps(nextProps){
    if(window.location.href.includes("/article/") || window.location.href.includes("/search")){
      this.setState((state) => {
        return {
          isGuardian: state.isGuardian, 
          isSwitchVisible: false, 
          isBookmark: false,
          resetText: true
        };
      });
    }

    if(window.location.href.includes("/bookmark")){
      this.setState((state) => {
        return {
          isGuardian: state.isGuardian,
          isSwitchVisible: false,
          isBookmark: true,
          resetText:true
        }
      })
    }
  }

  componentDidMount(){
    console.log("in navbar");
    this.setState({
      isGuardian: this.props.isGuardinaSelected,
      isSwitchVisible : true,
      isBookmark: false,
      resetText: true
    })
  }

  onChildChanged(newState) {
    this.props.callbackParent(newState); 
  }

  handleBookmark(){
    this.setState({
      isGuardian: this.props.isGuardianSelected,
      isSwitchVisible: false,
      isBookmark: true,
      resetText: true
    })
  }

  handleNavigationClick() {
    this.setState({
      isGuardian: this.props.isGuardinaSelected,
      isSwitchVisible : true,
      isBookmark: false,
      resetText: true
    })
  }
  
  render() {
    return (
      <Navbar bg="dark" expand="lg" variant="dark" style={{background: 'linear-gradient(to right, #191f45, #0e4d92)'}}>

      <Form inline style={{width:'250px'}}>
        <WithCallbacks text={this.state.resetText}/>
      </Form>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/" onClick={this.handleNavigationClick} exact>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/world" onClick={this.handleNavigationClick}>World</Nav.Link>
              <Nav.Link as={NavLink} to="/politics" onClick={this.handleNavigationClick}>Politics</Nav.Link>
              <Nav.Link as={NavLink} to="/business" onClick={this.handleNavigationClick}>Business</Nav.Link>
              <Nav.Link as={NavLink} to="/technology" onClick={this.handleNavigationClick}>Technology</Nav.Link>
              <Nav.Link as={NavLink} to="/sports" onClick={this.handleNavigationClick}>Sports</Nav.Link>
            </Nav>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={
                  <Tooltip id={`tooltip-top`}>Bookmark</Tooltip>
                }>
            <Link to="/bookmark" style={{marginRight:"20px", textDecoration:"none", display:this.state.isBookmark ? "inline": "none"}}>
              <MdBookmark style={{color:"white", height:"1.8em", width:"1.8em"}} onClick={this.handleBookmark}/>
            </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={
                  <Tooltip id={`tooltip-top`}>Bookmark</Tooltip>
                }>
            <Link to="/bookmark" style={{marginRight:"20px", textDecoration:"none", display:this.state.isBookmark ? "none": "inline"}}>
              <MdBookmarkBorder style={{color:"white", height:"1.8em", width:"1.8em"}} onClick={this.handleBookmark}/>
            </Link>
            </OverlayTrigger>
            <span className="nytimes_navbar" style={{display:this.state.isSwitchVisible ? "inline": "none", fontSize:"20px"}}>NYTimes</span>
            <MySwitch className="switch" isHidden={this.state.isSwitchVisible} callbackParent={(newState) => this.onChildChanged(newState) } isGuardianSelected={this.state.isGuardian} />
            <span className="guardian_navbar" style={{display:this.state.isSwitchVisible ? "inline": "none", fontSize:"20px"}}>Guardian</span>
          </Navbar.Collapse>
      </Navbar>
    );
  }
}
