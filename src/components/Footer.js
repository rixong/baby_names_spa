import React from 'react';

const Footer = () => {
  return (
    <div className="row fixed-bottom">
        <div className="col text-center">
          <p>Built with React/Redux, Boostrap 4.5 and Ruby on Rails</p>
        </div>
      <div className="col text-center">
        <a 
        href="https://www.rickglascock.com" 
        target="_blank" 
        rel="noopener noreferrer">www.rickglascock.com</a>
        </div>
    </div>
  )
}
export default Footer;