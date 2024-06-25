import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function HambergerComp({isOpen,handleClose}) {
    if (isOpen){
        console.log(isOpen);
    
    return (
    <>
  <div className="overlay" >
  <div className="hamburger-info">
    <div className="content">
      <button className="close-button" onClick={handleClose}>
        <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#000000",}} />
      </button>
    </div>
    <div className="container1">
      <div className="info">
        <p>The next generation blog, news and magazine theme for you to start sharing your stories today!!
        </p>
      </div>
      <div className="info-link">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Our Journal</a></li>
        <li><a href="#">Contact Us</a></li>
      </div>
      <div className="subscribe">
        <p className="para">The Blog</p>
        <h2>Save on Premium Membership</h2>
        <p className="para1">Get the insights report trusted by experts around the globe. Become a Member Today!</p>
        <button className="btn-subscribe">View pricing plans</button>
      </div>
      <p className="para2">New York, USA (HQ)</p>
      <p className="para3">750 Sing Sing Rd, Horeseheads, NY, 14845</p>
    </div>
  </div>
</div>
</>


  );
}
}
export {HambergerComp} ;
