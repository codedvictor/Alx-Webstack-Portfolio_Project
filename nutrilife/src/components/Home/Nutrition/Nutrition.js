import React from 'react';
import doctor from '../../../images/doctor.png';
import './Nutrition.css';

const Nutrition = () => {
    return (
        <section className="nutrition my-5" id="nutritions">
            <div className="container">
            <div className="row ">
                <div className="col-md-5 d-none d-md-block">
                    <img src={doctor} alt="" />
                </div>
                <div className="col-md-7 text-white py-5">
                    <h5 className="brand-color text-uppercase">Nutrition</h5>
                    <h1 className="">Personal Nutritions for You <br/> today </h1>
                    <p>By focusing on personalized nutrition, you receive dietary guidance and support that aligns with your unique lifestyle, preferences, health objectives, and dietary requirements.  </p>
                    <button className="btn btn-secondary">Learn More</button>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Nutrition;