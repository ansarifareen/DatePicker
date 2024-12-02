import React, { useState, useEffect } from 'react';
import './Calender.css'

const Calendar = ({ selectedDate, onChange,hasSelected, setHasSelected }) => {
    const [currentDate, setCurrentDate] = useState(new Date(selectedDate || Date.now()));
    const [view, setView] = useState('day');

    useEffect(() => {
        if (hasSelected) {
            setCurrentDate(new Date(selectedDate));
            setHasSelected(true)
        }
    }, [selectedDate,hasSelected,setHasSelected]);

    const handleDateSelect = (day) => {
        const newDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), day));
        onChange(newDate);
        setCurrentDate(newDate);
    };

    const handleMonthSelect = (month) => {
        setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
        setView('day');
    };

    const handleYearSelect = (year) => {
        setCurrentDate(new Date(year, currentDate.getUTCMonth(), 1));
        setView('month');
    };
    

    //Navigation Functions
    const shiftPrevious = (e) => {
        e.preventDefault();
        if (view === 'day') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() - 1, 1)));
        } else if (view === 'month') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() - 1, currentDate.getUTCMonth(), 1)));
        } else if (view === 'decade') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() - 10, currentDate.getUTCMonth(), 1)));
        } else {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() - 100, currentDate.getUTCMonth(), 1)));
        }
    };

    const shiftNext = (e) => {
        e.preventDefault();
        if (view === 'day') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 1)));
        } else if (view === 'month') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() + 1, currentDate.getUTCMonth(), 1)));
        } else if (view === 'decade') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() + 10, currentDate.getUTCMonth(), 1)));
        } else {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() + 100, currentDate.getUTCMonth(), 1)));
        }
    };

    const shiftPreviousLarge = (e) => {
        e.preventDefault();
        if (view === 'day') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() - 1, currentDate.getUTCMonth(), 1)));
        } else if (view === 'month') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() - 10, currentDate.getUTCMonth(), 1)));
        } else {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() - 100, currentDate.getUTCMonth(), 1)));
        }
    };

    const shiftNextLarge = (e) => {
        e.preventDefault();
        if (view === 'day') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() + 1, currentDate.getUTCMonth(), 1)));
        } else if (view === 'month') {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() + 10, currentDate.getUTCMonth(), 1)));
        } else {
            setCurrentDate(new Date(Date.UTC(currentDate.getUTCFullYear() + 100, currentDate.getUTCMonth(), 1)));
        }
    };
    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const daysArray = [];
        const previousMonthDays = new Date(year, month, 0).getDate();

        // Show previous month's days
        for (let i = firstDay.getDay() - 1; i >= 0; i--) {
            const day = previousMonthDays - i; // Getting days from the previous month
            daysArray.push(
                <div className="h-11 w-11 flex items-center justify-center text-gray-400" key={`prev-${day}`}>
                    {day}
                </div>
            );
        }

          // Show current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(Date.UTC(year, month, day));
            const isWeekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
            const isSelected = selectedDate &&
                new Date(selectedDate).getDate() === day &&
                new Date(selectedDate).getMonth() === month &&
                new Date(selectedDate).getFullYear() === year;

            daysArray.push(
                <div
                    className={`h-11 w-11 flex items-center justify-center cursor-pointer 
                        ${isSelected ? 'bg-maroon text-white rounded-lg' : 'hover:bg-gray-300'} hover:bg-gray-300 rounded-lg `}
                    key={day}
                    onClick={() => handleDateSelect(day)}
                >
                    <span className={isWeekend && !isSelected ? 'text-maroon' : ''}>
                        {day}
                    </span>
                </div>
            );
        }
        // Show next month's days
        const daysInNextMonth = 7 - lastDay.getDay() - 1;
        for (let day = 1; day <= daysInNextMonth; day++) {
            daysArray.push(
                <div className="h-11 w-11 flex items-center justify-center text-gray-400" key={`next-${day}`}>
                    {day}
                </div>
            );
        }

        return daysArray;
    };

    const renderMonths = () => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        return months.map((month, index) => (
            <div
                key={month}
                className="h-14 w-24 flex items-center justify-center cursor-pointer rounded hover:bg-gray-300 rounded-md"
                onClick={() => handleMonthSelect(index)}
            >
                {month}
            </div>
        ));
    };

    const renderDecades = () => {
        const startYear = Math.floor(currentDate.getFullYear() / 10) * 10+1;
        const yearsArray = [];

        for (let i = 0; i < 10; i++) {
            const year = startYear + i;
            yearsArray.push(
                <div
                    key={year}
                    className="h-14 w-24 flex items-center justify-center cursor-pointer rounded hover:bg-gray-300"
                    onClick={() => handleYearSelect(year)}
                >
                    {year}
                </div>
            );
        }
        return yearsArray;
    };

    
    return (
            <div className="calendar border border-gray-300 rounded-lg overflow-hidden shadow-lg pb-5" style={{ height: 'auto' }}>
            <div className="flex justify-between items-center p-4 bg-maroon text-white" style={{ height: '80px' }}>
                {view !== 'century' && (
                    <>
                        <button onClick={shiftPreviousLarge} className=" font-bold hover:bg-gray-500 p-2 rounded">&lt;&lt;</button>
                    </>
                )}
                <button onClick={shiftPrevious} className=" font-bold hover:bg-gray-500 p-2 rounded">&lt;</button>
                <span
                    className={`flex flex-col items-center justify-center font-semibold cursor-pointer p-3 rounded 
                        ${view === 'century' ? 'bg-gray-200 text-gray-400' : 'hover:bg-gray-500'}`}
                    onClick={() => setView(view === 'day' ? 'month' : view === 'month' ? 'decade' :'')}
                >
                    {view === 'day' ? (
                        <p>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getUTCFullYear()}</p>
                    ) : view === 'month' ? (
                        <p>{currentDate.getFullYear()}</p>
                    ) : (
                        <p>{Math.floor(currentDate.getUTCFullYear() / 10) * 10+1} - {Math.floor(currentDate.getUTCFullYear() / 10) * 10 + 10}</p>
                    )}
                </span>
                <button onClick={shiftNext} className=" font-bold hover:bg-gray-500 p-2 rounded">&gt;</button>
                {view !== 'century' && (
                    <>
                        <button onClick={shiftNextLarge} className=" font-bold hover:bg-gray-500 p-2 rounded">&gt;&gt;</button>
                    </>
                )}
            </div>

            {view === 'day' ? (
                <>
                <div className="grid grid-cols-7">
                       {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                           <div key={day} className="font-semibold text-center p-2 mb-5 text-sm cursor-pointer underline decoration-dashed">{day}</div>
                       ))}
                   </div>
                   <div className="grid grid-cols-7" >
                       {renderCalendar()}
                   </div>
                   </>

            ) : view === 'month' ? (
                <div className="grid grid-cols-3 gap-x-4 gap-y-3 px-3 py-3">{renderMonths()}</div>
            ) : (
                <div className="grid grid-cols-3 gap-x-4 gap-y-3 px-3 py-3">{renderDecades()}</div>
            )}
        </div>
    );
};

export default Calendar;


