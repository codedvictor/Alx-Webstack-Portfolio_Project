import React from 'react';
import FooterDetail from './FooterDetail';
import './Footer.css';

const Footer = () => {
    const ourAddress = [
        { name: "Nutri Life - 101010 Cloud", link: "//google.com/map" },
        { name: "Coding", link: "//google.com/map" },

    ]
    const accessLinks = [
        { name: "Home", link: " " },
        { name: "About", link: " " },
        { name: "NutriLife", link: " " }
    ]
    const services = [
        { name: "Symptom Checker", link: "/SymptomChecker" },
        { name: "Nutrition", link: " " },
        { name: "Nutrition Analysis", link: " " }
    ]

    return (
        <footer className="footer-area clear-both sm-pe-5">
            <div className="container pt-5">
                <div className="row md-py-5 footer-content">
                    {/* <FooterDetail key={1} menuTitle={"."} menuItems={noNamed} /> */}
                    <FooterDetail key={2} menuTitle="Services" menuItems={services} />
                    <FooterDetail key={3} menuTitle="Access Links" menuItems={accessLinks} />
                    <FooterDetail key={4} menuTitle="Our Address" menuItems={ourAddress}>
                    </FooterDetail>
                </div>
                <div className="copyRight text-center">
                    <p>Copyright {(new Date()).getFullYear()} All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;