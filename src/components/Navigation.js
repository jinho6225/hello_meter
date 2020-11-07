import React from 'react';
import { Link } from "react-router-dom"



function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom d-flex justify-content-between px-5">
            <div><Link to='/'><img src="./hellometor_small.png" alt="logo"/></Link></div>
            <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="mx-2"><Link to='/contactus'>ContactUs</Link></li>
                    <li className="mx-2"><Link to='/privacy-policy'>Privacy Policy</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;
