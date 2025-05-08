import React from 'react'
import { CheckmarkIcon } from '../../svgsIcons'
import { Link } from 'react-router-dom';

const CardMembership = ({ title, Bookname, amount }) => {
    const features = [
        "Lorem Ipsum is simply dummy",
        "Lorem Ipsum is simply dummy",
        "Lorem Ipsum is simply dummy",
        "Lorem Ipsum is simply dummy",
        "Lorem Ipsum is simply dummy"
    ];

    return (
        <div className="OngeschrevenMembership-card">
            <div className="OngeschrevenMembership-card-tital">
                <h2>{title} Plan</h2>
                <p>{Bookname} Book</p>
            </div>
            <span>
                <h3>{amount}</h3>
                <p>/year</p>
            </span>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}><CheckmarkIcon /> {feature}</li>
                ))}
            </ul>
            <Link to="/signup">
            <button>Select</button>
            </Link>
        </div>
    )
}

export default CardMembership;
