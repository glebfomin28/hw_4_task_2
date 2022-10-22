import React, {useState} from 'react';
import {ItemRecord} from "./ItemRecord";

export const Record = () => {

    const [form, setForm] = useState({
        data: "",
        record: "",
    })
    const [recordList, setRecordList] = useState([]);
    const [edit, setEdit] = useState([false, null]);

    const handleChangeData = (evt) => {
        setForm({data: evt.target.value, record: form.record})

    }
    const handleChangeRec = (evt) => {
        setForm({data: form.data, record: evt.target.value})
    }

     const addItem = (evt) => {
        evt.preventDefault();
        const data = form.data;
        const distance = Number(form.record);

         if (!data || !distance || typeof distance !== "number" || distance <= 0) return

         !edit[0]? handleAddBook(data, distance) : editRecord(data, distance)

         form.data = '';
         form.record = '';
    }

    // удаление
    const dellRecord = (el) => {
        setRecordList(current =>
            current.filter(obj => {
                return obj !== el;
            }),
        );
    }

    // Редактирование
    const editRecord = (data, distance) => {
        return (
            (setRecordList([...recordList.slice(0, Number(edit[1])),
                {data: data, distance: distance},
                ...recordList.slice(edit[1] + 1)]), setEdit([false, null]))
        );
    }

    const clickEdit = (obj) => {
        setForm({data: obj.data, record: obj.distance});
        const indexEdit = recordList.indexOf(obj)
        setEdit([true, indexEdit]);
    }


    // Обновление
    const handleAddBook = (data, distance) => {
        if (recordList.length === 0) return setRecordList([...recordList, {data: data, distance: distance}])
        for (let i=0; i < recordList.length; i++) {
            if (recordList[i].data === data) {
                return setRecordList(
                    [...recordList.slice(0, i),
                        {data: data, distance: recordList[i].distance + distance},
                        ...recordList.slice(i + 1)]);
            }
        }
        return setRecordList([...recordList, {data: data, distance: distance}])
    }

    // Сортировка по дате
    const newRecordList = recordList.sort(function(a,b){
        return new Date(b.data) - new Date(a.data);
    });

    //
    const printItemsRecord = newRecordList.map(el =>
        <ItemRecord key={el.data} dataRecord={el} onDellRecord={dellRecord} onEditRecord={clickEdit}/>
    )

    return (
        <>
            <form onSubmit={addItem}>
                <div className="input_block">

                    <div style={{marginRight: "20px"}}>
                        <p className="input_text">Дата (ДД.ММ.ГГ)</p>
                        <input className="input" type="date" value={form.data} onChange={handleChangeData}/>
                    </div>
                    <div>
                        <p className="input_text">Пройдено км</p>
                        <input className="input" type="text" value={form.record} onChange={handleChangeRec}/>
                    </div>
                    <button className="button"  >ОК</button>
                </div>
            </form>

            <div>
                <div className="body_head_text">
                    <div>Дата (ДД.ММ.ГГ)</div>
                    <div>Пройдено км</div>
                    <div>Действия</div>
                </div>

                <div className="body_content">
                    {printItemsRecord}
                </div>
            </div>
        </>

    );
}

