import React, { useState, useEffect } from 'react';
import "./DateTimeDisplay.css"
const DateTimeDisplay  = () => {
    // State to store the current date and time
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // Effect to update the date and time every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Function to format the date and time
    const formatDateTime = (date) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <div className='date_container'>
            <div style={{ marginTop: '10px' }}>
                {formatDateTime(currentDateTime)}
            </div>
        </div>
    );
};

export default DateTimeDisplay ;
