import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="row" style={{ "backgroundColor": "black" }}>
        <div className="col-md-4" >
          <img className="img-fluid" style={{ transform: "scale(0.70)" }} src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_logo.png" alt="Northcoders" />
        </div>
        <div className="col-md-4" ></div>
        <div className="col-md-4"  >
          <div style={{
            color: "white",
            margin: "auto",
            width: "70%",
            padding: "30px",
            textAlign: "right"
          }}>
            <h4 >Northcoders is a coding bootcamp and not in fact a reliable news source.</h4>
            <h4 >Have fun commenting, voting and ingaging within our community!</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default About;