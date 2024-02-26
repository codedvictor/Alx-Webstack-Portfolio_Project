import React from 'react';
import About from '../About/About';
import Symptoms from '../Symptoms/Symptoms';
import Footer from '../../Shared/Footer/Footer';
import Header from '../Header/Header';
import Nutrition from '../Nutrition/Nutrition';
import NutritionAnalysis from '../NutritionAnalysis/NutritionAnalysis';


const Home = () => {
    return (
        <div>
            <Header></Header>
            <Symptoms></Symptoms>
            <Nutrition></Nutrition>
            <NutritionAnalysis></NutritionAnalysis>
            <About></About>
            <Footer></Footer>
        </div>
    );
};

export default Home;