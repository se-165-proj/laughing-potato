import React, { Component } from 'react'
import { login, resetPassword } from '../../auth/auth'
function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}
export default class Login extends Component {
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
  state = { loginMessage: null }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <div className="container">
        <div className="jumbotron">
          <div className="row">
            <div className="col-sm-4">
          <form onSubmit={this.handleSubmit}>
            <center> 
              <h3>Log in</h3>
            <div className="form-group">
              <input className="form-control" style={{width: "100px"}}  style={{height: "40px"}} ref={(email) => this.email = email} placeholder="your@example.com"/>
            </div>
            <div className="form-group">
              <input className="form-control" style={{width: "200px"}} style={{height: "40px"}} type="password"  placeholder="your password" ref={(pw) => this.pw = pw} />
            </div>
            </center>
            {
              this.state.loginMessage &&
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
              </div>
            }
            <div>
              <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
            </div>
            <br/>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                <div className="radio">
                  <label><span style={{padding: "10px"}}></span>
                  </label><span style={{padding: "10px"}}></span>
                </div>
              </div>
            </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block"  style={{width: "250px"}} style={{height: "50px"}} >Log in</button>
          </form>
          </div>
          </div>
        </div>
      </div>
    )
  }
}
