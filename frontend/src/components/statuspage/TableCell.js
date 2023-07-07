import React, { useEffect, useState } from 'react';

const TableCell = ({ habit, date, changeStatus }) => {
    // Helper function to get the entry for a habit on a specific date
    const getEntryForDate = (habit, date) => {
        const entry = habit.record.find(record => new Date(record.date).toDateString() === date.toDateString());
        return entry || null;
    }

    const entry = getEntryForDate(habit, date);
    const [status, setStatus] = useState(entry?.status);

    useEffect(() => {
        // Empty useEffect hook to trigger side effects when status changes
    }, [status]);

    const handleClick = async () => {
        try {
            const updatedStatus = await changeStatus(habit._id, entry?._id);
            setStatus(updatedStatus); // Update the status state variable
        } catch (error) {
            console.error("An error occurred while updating the status: " + error);
        }
    };

    return (
        <td key={`${habit._id}-${date}`}>
            {/* Render the status icon and handle click event */}
            <span id={`${habit._id},${entry?._id}`} onClick={handleClick}>
                {status === 'Done' ? '✅' : status === 'Not done' ? '❌' : '⬜'}
            </span>
        </td>
    );
};

export default TableCell;