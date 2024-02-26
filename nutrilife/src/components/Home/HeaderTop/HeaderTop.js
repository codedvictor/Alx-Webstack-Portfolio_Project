import React from 'react';
import chair from '../../../images/doc/doc1.jpg';
const HeaderTop = () => {
    return (
        <div style={{ height: "600px", 'width': '100%' }} className="row d-flex align-items-center container">
            <div className="col-md-4 col-sm-6 col-12 offset-md-1 md-mx-5">
                <h1>Be Intentional <br />About Your Health</h1>
                <p className="text-secondary">Taking care of your health is one of the most important investments you can make in your life.
                <br /> Remember, your health is your greatest asset, so make the choice today to prioritize it and reap the rewards for years to come.
                </p>               
            </div>
            <div className="col-md-6 col-sm-6 col-12">
                <img src={chair} className="img-fluid rounded" alt="" />
            </div>
        </div>
    );
};

export default HeaderTop;