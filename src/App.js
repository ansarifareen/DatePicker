import React, { useState } from 'react';
import DatePicker from './Components/DatePicker'
import './App.css';

function App() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        console.log("Selected Date: ", newDate);
    };

    return (
        <div className="flex flex-col items-center pt-10">
            <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
        </div>

    );
}

export default App;
