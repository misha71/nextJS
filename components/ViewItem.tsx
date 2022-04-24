import React from 'react'
import {addItem} from "../redux/actions";
interface ViewProps{
    data: {title: string, date: string,_id: string | number}
    onDelete: any
}
export const ViewItem = ({data, onDelete}: ViewProps) => {
    return (
        <div className='mt-5'>
            <div className="flex gap-10">
                <div>{data.title}</div>
                <div>{data.date}</div>
                <button type="button"
                        onClick={() => onDelete(data._id)}
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Удалить
                </button>
            </div>
     </div>
    )
}