import React, { useState } from 'react';

const steps = ['Persoonlijke gegevens ', 'Boek Instellingen ', 'Programma & bestellingen'];

const MultiStepComponent1 = ({onValueChange}) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleStepClick = (index) => {

        console.log('Setting' , index)
        setActiveStep(index); 
        
        onValueChange(index)// Update active step
    };

    return (
        <div className="stepper-containerx">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`stepx ${index === activeStep ? 'active' : ''}` }
                    onClick={() => handleStepClick(index)}
                >
              
                    <span className="step-labelx">{step}</span>
                </div>
            ))}


            {/* <div className="navigation">
                <button onClick={() => setActiveStep(activeStep - 1)} disabled={activeStep === 0}>
                    Previous
                </button>
                <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    disabled={activeStep === steps.length - 1}
                >
                    Next
                </button>
            </div> */}


        </div>
    );
};

export default MultiStepComponent1;
