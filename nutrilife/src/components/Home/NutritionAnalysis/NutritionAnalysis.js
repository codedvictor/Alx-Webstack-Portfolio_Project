import React from 'react';
// import baby from '../../../images/baby.png';
import baby from '../../../images/doc/nutrition analysis.jpg';


const NutritionAnalysis = () => {
    return (
        <section className="feature-service pb-0 pb-md-5 pt-md-5" id="nutritionAnalysis">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-5 col-sm-6 col-12">
                        <img src={baby} className="img-fluid" alt="" />
                    </div>
                    <div className="col-md-7 col-sm-6 col-12 align-self-center">
                        <h1 className="text-green-500">Analyze Your Nutrition</h1>
                        <p className="text-secondary my-5">This process typically involves assessing your daily food choices, portion sizes, nutrient intake, and overall dietary patterns. By analyzing your nutrition, you gain insights into areas where you may need to make adjustments or improvements to support your health goals. It can help identify areas of deficiency or excess, highlight potential dietary imbalances, and guide you toward making healthier choices for optimal nutrition and overall wellness.</p>
                        <button className="btn btn-primary">Check Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NutritionAnalysis;