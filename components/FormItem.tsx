import React, {useState} from 'react'
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux'
import {addItem} from '../redux/actions'
export const FormItem = () =>
{
    const dispatch = useDispatch()
    const [value, SetValue] = useState('')
    return(
        <>
            <div className="flex gap-10 mt-10">
                <div className="mb-3 xl:w-96">
                    <label htmlFor="email_field"
                           className="form-label inline-block mb-2 text-gray-700"
                    >Новая запись</label
                    >
                    <input
                        name="title"
                        value={value}
                        onChange={(e) => SetValue(e.target.value)}
                        type="text"
                        className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
                        id="email_field"
                        placeholder="Введите запись"
                    />
                </div>
            </div>
            <div className="flex space-x-2  gap-10">
                <button type="button"
                        onClick={() => dispatch(addItem(value))}
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Добавить запись
                </button>
            </div>
        </>
    )
}
