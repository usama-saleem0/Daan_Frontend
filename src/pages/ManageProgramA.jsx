import React, { useEffect, useState } from "react";

import book from '../assets/book.png'

const ManageProgramA = () => {


  const [expireDate, setexpireDate] = useState('');



  useEffect(() => {

    const currentUser = localStorage.getItem("currentuser");
    const parsedUser = currentUser ? JSON.parse(currentUser) : null;

    console.log(parsedUser.paydate
      , "Current user")

      const payDate = new Date(parsedUser.paydate);

// Add one year to the date
const nextYearDate = new Date(payDate);
nextYearDate.setFullYear(payDate.getFullYear() + 1);

// Format the date as "14 December 2025"
const options = { day: '2-digit', month: 'long', year: 'numeric' };
const formattedDate = nextYearDate.toLocaleDateString('en-GB', options);

console.log("Formatted Date After One Year:", formattedDate);

setexpireDate(formattedDate)

  }, []);
  

  return (
    <>
      <section className="My-profile-sec">
        <div className="container-ar">
          <div className="main-My-profile">
            <div className="My-profile-form">

              <div className="book-img-book">
                <img src={book} alt="" />
              </div>
              <h2>Toegang beheren
              </h2>
              <p>Ga door met het bewerken van je boek en krijg verlengde toegang, inclusief de optie om extra exemplaren te bestellen om te delen met je geliefden
              </p>
            </div>



<div className="Manage-Program-main-box">

<div className="Manage-Program-box">
    <h2>Toegangsinstellingen</h2>
    <p>Je kunt tot {expireDate} aanpassingen maken aan je boek.<br />
Wil je doorgaan? Verleng je toegang met één jaar.
</p>
    <button>1 JAAR VERLENGEN €15
</button>
  </div>


  <div className="Manage-Program-box">
    <h2>Extra exemplaren kopen
    </h2>
    <p>Voor het printen van je boek heb je printtegoeden nodig.
Je hebt nog 1 printtegoed over.
</p>
    <button>KOOP PRINTTEGOEDEN</button>
  </div>

  <div className="Manage-Program-box">
    <h2>Abonnement terugbetaling aanvragen</h2>
    <p>Je kunt binnen 30 dagen na aankoop een terugbetaling aanvragen.
    <br />
Als je dit doet, worden al je gegevens verwijderd en wordt je account gesloten.
</p>
    <button>TERUGBETALING AANVRAGEN
    </button>
  </div>

  
</div>


          </div>
        </div>
      </section>
    </>
  );
};

export default ManageProgramA;
