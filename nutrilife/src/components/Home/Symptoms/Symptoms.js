import React from 'react';
import { Link } from 'react-router-dom';
// import baby from '../../../images/baby.png';
import baby from '../../../images/doc/doctor chair 2.jpg';


const Symptoms = () => {
    return (
        <section className="feature-service pb-0 pb-md-5 pt-md-5" id="symptomChecker">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-5 col-sm-6 col-12">
                        <img src={baby} className="img-fluid" alt="" />
                    </div>
                    <div className="col-md-7 col-sm-6 col-12 align-self-center">
                        <h1>Check Your Syptoms Know your Health</h1>
                        <p className="text-secondary my-5">Checking your symptoms and understanding your health is essential for proactive wellness management.  Tempore efacere amet aperiam non odio. Temporibus,
                        By recognizing and addressing symptoms early on, you gain valuable insights into your health status and can take appropriate actions to maintain or improve your overall well-being. Regularly monitoring your symptoms empowers you to make informed decisions about your health, seek timely medical attention if necessary, and ultimately lead a healthier and more fulfilling life. It's a proactive approach to self-care that puts you in control of your health journey.</p>
                            <Link to="/symptom-checker" className="btn btn-primary">Check Now</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Symptoms;