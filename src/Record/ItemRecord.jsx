import React from 'react';

export const ItemRecord = ({dataRecord, onDellRecord, onEditRecord}) => {
    // удаление
    const dellRecord = () => onDellRecord(dataRecord)
    // редактирование
    const editRecord = () => onEditRecord(dataRecord)

    return (
        <div className="item_block" >
            <div>{dataRecord.data}</div>
            <div>{dataRecord.distance} km</div>
            <div className="button_block">
                <button onClick={editRecord}>✎</button>
                <button onClick={dellRecord}>✘</button>
            </div>
        </div>
    );
}

