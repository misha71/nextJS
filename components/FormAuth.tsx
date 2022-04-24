import React from 'react'
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux'
import {saveRegFields, login, register} from '../redux/actions'
export const FormAuth = () =>
{
    const dispatch = useDispatch()
    const {email, password} = useSelector((state: RootStateOrAny) => state.register)
    const registerHandler = async(e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        dispatch(register({email, password}))
    }

    const loginHandler = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(login({email, password}))
    }
    return(
        <>
        <div className="flex justify-center gap-10 mt-10">
            <div className="mb-3 xl:w-96">
                <label htmlFor="email_field"
                       className="form-label inline-block mb-2 text-gray-700"
                >Адрес электронной почты</label
                >
                <input
                    name="email"
                    value={email}
                    onChange={(event) => dispatch(saveRegFields(event))}
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
                    placeholder="Введите email"
                />
            </div>
            <div className="mb-3 xl:w-96">
                <label htmlFor="password_field"
                       className="form-label inline-block mb-2 text-gray-700"
                >пароль</label
                >
                <input
                    name="password"
                    value={password}
                    onChange={(event) => dispatch(saveRegFields(event))}
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
                    id="password_field"
                    placeholder="Введите пароль"
                />
            </div>
        </div>
    <div className="flex space-x-2 justify-center gap-10">
        <button type="button"
                onClick={registerHandler}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Регистрация
        </button>
        <button type="button"
                onClick={loginHandler}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Авторизация
        </button>
    </div>
    </>
    )
}
