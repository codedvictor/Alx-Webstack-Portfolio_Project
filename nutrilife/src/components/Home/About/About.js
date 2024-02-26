import React from "react";
import './About.css';
import chair from '../../../images/doc/doc1.jpg';

const About = () => {
  return (
    <section className="about my-5 py-5" id="aboutPage">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 py-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-4 text-green-500">ABOUT US</h2>
          <div className="md:text-left">
            <p className="text-lg mb-4 text-secondary"><span className="font-semibold">NutriLife</span> is a comprehensive health management platform designed to empower users to take control of their well-being. With features such as symptom checking, personalized nutrition analysis, and health monitoring tools, our app provides users with valuable insights and recommendations to optimize their health journey.</p>
            <p className="text-lg mb-4 text-secondary">Whether you're looking to track your symptoms, analyze your nutrition intake, or monitor your overall health progress, our app offers a user-friendly interface and intuitive features to support your wellness goals.</p>
            <p className="text-lg mb-4 text-secondary">With NutriLife, you can make informed decisions about your health and take proactive steps towards a healthier lifestyle.</p>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src={chair} alt="About Us" className="rounded-lg shadow-md" />
        </div>
      </div>
    </section>
  );
};

export default About;
