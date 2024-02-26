import React from 'react';
import { Link} from 'react-router-dom';
import './Navbar.css';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';



const Navbar = () => {
    const [isSticky, setSticky] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        })
    }, [])
    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${isSticky ? "stickynav" : "normalnav"}`} expand="lg">
            <Toaster />
            <div className="container-fluid">
                <div className="navbar-heading">
                    <h3>
                        <Link className="navbar-h" to="/">Nutri Life</Link>
                    </h3>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active me-3" aria-current="page" href="/">HOME</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link me-3 textDark" href="#symptomChecker" >SYMPTOMS CHECKER</a>
                        </li>
                        <li className="nav-item">
                            {/* <a className={`nav-link me-3 text-white ${isSticky ? "textDark" : "textWhite"}`} href="#BlogContaint">BLOG</a> */}
                            <a className="nav-link me-3 textDark" href="#nutritions">NUTRITION</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link me-3 textDark" href="#nutritionAnalysis">NUTRITION ANALYSIS</a>
                        </li>                        

                        <li className="nav-item">
                            <a href='#aboutPage' className="nav-link me-3">ABOUT</a>
                            {/* <NavLink activeClassName="aboutPage" className="nav-link me-3" to="#aboutPage">ABOUT</NavLink> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;