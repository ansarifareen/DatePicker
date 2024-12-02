import React, { useState,useEffect } from 'react';
import Calendar from './Calender';

const DatePicker = ({ selectedDate, onDateChange }) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [inputValue, setInputValue] = useState(selectedDate ? formatDate(selectedDate) : '');

    function formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleDateChange = (newDate) => {
        onDateChange(newDate);
        setInputValue(formatDate(newDate));
        setIsCalendarVisible(false);
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        let formattedValue = '';

        if (newValue.length <= 2) {
            formattedValue = newValue;
        } else if (newValue.length <= 4) {
            formattedValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
        } else {
            formattedValue = `${newValue.slice(0, 2)}/${newValue.slice(2, 4)}/${newValue.slice(4, 8)}`;
        }

        setInputValue(formattedValue);

        if (formattedValue.length === 10) {
            const parsedDate = parseDate(formattedValue);
            if (parsedDate) {
                onDateChange(parsedDate);
                setIsCalendarVisible(true);  // Showing calendar immediately after date is entered
            }
        }
    };

    const parseDate = (input) => {
        const [day, month, year] = input.split('/').map(Number);
        if (day && month && year) {
            const parsedDate = new Date(year, month - 1, day);
            if (!isNaN(parsedDate)) return parsedDate;
        }
        return null;
    };

    const handleInputClick = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };

    const handleIconClick = (e) => {
        e.stopPropagation();
        setIsCalendarVisible(!isCalendarVisible);
    };

    useEffect(() => {
        setInputValue(selectedDate ? formatDate(selectedDate) : '');
    }, [selectedDate]);

    return (
        <div className="relative w-100">
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm h-11">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    maxLength={10}
                    placeholder="DD/MM/YYYY"
                    onClick={handleInputClick}
                    className="w-full p-2 pl-3 pr-12 h-full border-l-0 focus:outline-none focus:ring-2 focus:ring-maroon rounded-l-lg"
                />
                
                <button
                    onClick={handleIconClick}
                    className="p-2 text-gray-500 cursor-pointer focus:outline-none w-12 h-full flex items-center justify-center"
                >
                    <i className="fas fa-calendar-alt"></i>
                </button>
            </div>

            {isCalendarVisible && (
                <div className="absolute top-full left-0 mt-2 w-auto max-w-none bg-white rounded-lg shadow-lg border border-gray-300 z-10">
                    <Calendar 
                        selectedDate={selectedDate} 
                        onChange={handleDateChange} 
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;
