import React, { Component } from 'react'
import './Footers.css'


export default class Footer extends Component {
  render () {
    return (


      <footer id="Footer-whole">

        <div className="footer" id="Wrapper">
        <div>   <hr></hr> </div>
            <div className="container-fluid" >
                <div className="row" >

                    <div id="C1">
                    <h3> Boarding </h3>
                        <ul>
                            <li> <a href="#"> About Us </a> </li>
                            <li> <a href="#"> Contact Us </a> </li>
                        </ul>
                    </div>

                    <div id="C2">
                    <h3> Discover </h3>
                        <ul>
                            <li> <a href="#" id="t"> Careers </a> </li>
                            <li> <a href="#"> Rewards Center </a> </li>
                        </ul>
                    </div>

                    <div id="C3">
                    <h3> News Letter Subscription </h3>
                        <ul>
                            <li>
                            <div>
                              <form id="searchbox" action="">
                                  <input id="inputEmail" class="form-control" type="text" placeholder="Email" />
                                  <input id="submit" className="btn btn-primary" type="button" value="Send" />
                              </form>
                            </div>



                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>

        <div id="footer-bottom" >
            <div className="container" >
                <p className="pull-left" > Copyright © Boarding 2017. All right reserved. </p>
            </div>
        </div>

    </footer>

    )
  }
}
