import { faDisease, faUtensils, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import InformationCard from '../../../components/Home/InformationCard/InformationCard';
import React from 'react';

const infosData = [
    {
        title: 'Symptom Checker',
        description: 'Check your symptoms swiftly',
        icon: faDisease,
        background: 'primary'
    },
    {
        title: 'Nutrition',
        description: 'Available nutritions',
        icon: faUtensils,
        background: 'dark'
    },
    {
        title: 'Nutrition Analysis',
        description: 'Analyze your nutrion intake',
        icon: faChartSimple,
        background: 'primary'
    }
]

const BusinessInfo = () => {
    return (
        <section className="d-flex justify-content-center">
            <div className="row w-75 infos-card">
                {
                    infosData.map(info => <InformationCard info={info} key={info.title}></InformationCard>)
                }
            </div>
        </section>
    );
};

export default BusinessInfo;