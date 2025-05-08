import React, { useState } from 'react'
import Header from '../Components/Header'
import MultiStepComponent1 from './MultiStepComponent1'
import MyprofileA from './MyprofileA'
import ManagefamilyA from './ManagefamilyA'
import ManageProgramA from './ManageProgramA'

const Myaccount = () => {

  const [activeComponent, setActiveComponent] = useState(0);
  
  

  const handleHeadingClick = (component) => {
    console.log('here')
    setActiveComponent(component);
  };
  return (
    <>
      <Header />
      <div className="reviewbybook">
        <div className="container-ar">

     <div className="main-site-box">
     <h1>Accountbeheer</h1>
     <p>Hier kun je je accountgegevens eenvoudig aanpassen.
     </p>
     </div>

            <MultiStepComponent1 onValueChange={handleHeadingClick}/>

           

            {activeComponent == 0 && <MyprofileA />}
            {activeComponent == 1 && <ManagefamilyA />}
            {activeComponent == 2 && <ManageProgramA />}
      



            {/* <SampleBook/> */}


            {/* <div className="reviewbook--bottom">
                <div className="reviewbook--bottom--1">
                    <div className="reviewbook--bottom--top">
                        <span>
                    <h3>Review Stories</h3>
                    </span>
                    <button>Validate The Review</button>
                    </div>

                    <p>Please note that the PDF is displayed as it will be printed. The first page is intentionally left blank to ensure that the content starts on the left page of your printed book. Enjoy your preview!</p>
                </div>

                <div className="reviewbook--bottom--2">
                    <div className="reviewbook--bottom--top-2">
                    <h5>Wouter’s Book</h5>
                    </div>

                    <div className="bottom--forget">
                        <h6> A Moment I’ll Never Forget   </h6>
                        <p>Written on June,16,2024</p>

                        <button>Verhaal bewerken</button>
                    </div>
                   
                </div>
            </div> */}
      </div>
      </div>
    </>
  )
}

export default Myaccount

