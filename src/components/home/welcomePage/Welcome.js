import React, { Component } from 'react'
import FaHome from 'react-icons/lib/fa/home'
import Search from './Search';
import MostRecentListings from './MostRecentListings';
import Footer from './../../../Footer'
//import weclome from './welcome.css'
import App from './../../../App.css'


export default class Welcome extends Component {
  render () {
    return (
      <div id="Test">
        <div className="container" ><br/><br/>
          <h1><span style={{color: "#DD5600", fontFamily: 'Helvetica, sans-serif'}}> Find</span> Your <FaHome /> in Town</h1>
          <br/><br/>
          <Search />
            <div id="ListingSpan">
              <MostRecentListings/>
            </div>
        </div>
        <Footer/>
      </div>


    )
  }
}