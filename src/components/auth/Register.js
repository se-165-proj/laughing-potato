import React, { Component } from 'react'
import { auth } from '../../auth/auth'
function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}
export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
        answ: 'init',
    };
    this.answerSelected=this.answerSelected.bind(this);
    
  }
  answerSelected(event){
    var ans = this.state.answ;
    if (event.target.name==='answer1'){
      ans=event.target.value;
    } 
    this.setState({answ: ans}, function(){
      console.log('You have selected:  '+ this.state.answ);
    });
  }
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value, this.firstName.value, this.lastName.value, this.address.value,  this.state.answ)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div className="container">
        <div className="jumbotron">
          <div className="row">
          <div className="col-sm-4">
          <form onSubmit={this.handleSubmit}>
            <center>
              <h3>Sign Up</h3>
              <div className="form-group">
                <input className="form-control"  style={{width: "250px"}} style={{height: "40px"}} ref={(email) => this.email = email} placeholder="your@example.com"/>
              </div>
              <div className="form-group">
                <input className="form-control" type="password" style={{width: "250px"}} style={{height: "40px"}} placeholder="your password" ref={(pw) => this.pw = pw} />
              </div>
            </center>
            {
              this.state.registerError &&
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &nbsp;{this.state.registerError}
              </div>
            }
            <br/>
            <div className="container">
              <div className="row"><h5>Choose account type:</h5>
                <div className="col-sm-12">
                  <div className="radio">
                  <label><span style={{padding: "10px"}}></span>
                  <input type="radio" name="answer1" value="Guest" onChange={this.answerSelected}/> Guest <span style={{padding: "10px"}}></span>
                  <input type="radio" name="answer1" value="Landlord" onChange={this.answerSelected}/> Landlord<span style={{padding: "10px"}}></span>
                  </label><span style={{padding: "10px"}}></span>
                  </div>
              </div>
            </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{width: "250px"}} style={{height: "50px"}} >Sign up</button>
          </form>
          </div>
          </div>
        </div>
      </div>
    )
  }
}
