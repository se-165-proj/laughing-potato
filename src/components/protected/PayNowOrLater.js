import React, { Component } from 'react'
import { browserHistory } from "react-router";
import { withRouter } from "react-router-dom";




export default class PayNowOrLater extends Component {
      
  constructor(props) {
    super(props);

    this.state = {
        prices: [],
    };
    this.handleSubmitNow = this.handleSubmitNow.bind(this);
    this.handleSubmitLater = this.handleSubmitLater.bind(this);
  }
  componentWillMount() {
    var prices = this.props.location.state.prices;
    this.state.prices.push(prices);
    
    this.setState({prices: this.state.prices});
    
    console.log("Price passed from reservation to PAyNow: " + this.state.prices);
    console.log("Price passed from reservation to PAyNow with no state: " + prices);
    
  }
  handleSubmitNow () {
    this.props.history.push({pathname: '/payments', state: { prices: this.state.prices} });
    console.log("Price passed from  PAyNow to payments: " + this.state.prices);
    
  }
  handleSubmitLater () {
    this.props.history.push({pathname: '/'});
    
  }

  render() {
    
    return (
      <div className="container" style={{padding: "70px"}}>
        <div className="card" >
          <br/>
          <center>
            <h4>Pay now or later!</h4>
          </center>
          <br/>  
          <div className="container"  >
            <div className="form-group" > 
              <div className="input-group ">
                <div  style={{padding: "70px"}}>
                  <h5>Total price: ${this.state.prices}</h5>
                  <br/> 
                  <span className="input-btn">
                    <button 
                      className="btn btn-success " 
                      style={{padding: "15px"}}
                      onClick={this.handleSubmitNow} >Pay Now!
                    </button> 
                    <span style={{padding: "10px"}}>
                    </span>
                    <button  
                      className="btn btn-primary " 
                      style={{padding: "15px"}} 
                      onClick={this.handleSubmitLater} >Pay Later!
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
