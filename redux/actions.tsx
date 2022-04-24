import React from 'react'
import getConfig from 'next/config'
import {
    SHOW_ALERT,
    HIDE_ALERT,
    SHOW_LOADER,
    HIDE_LOADER,
    IS_AUTH,
    NO_AUTH,
    FIELDS_SAVE,
    GET_ITEMS,
    DELETE_ITEMS,
    ADD_ITEMS
} from './types'
import axios from 'axios'
const storageName = 'userData'
const {publicRuntimeConfig = {}} = getConfig() || {}
const {API_URL} = publicRuntimeConfig
function getToken(){
    const data = JSON.parse(localStorage.getItem(storageName) || '{}')
    if(data && data.token){
        return data.token;
    }
}
export function showAlert(text: string, view='warning'){
    return {type: SHOW_ALERT, payload: {text, view}}
}
export function hideAlert(){
    return {type: HIDE_ALERT}
}

export function showLoader(){
    return {type: SHOW_LOADER}
}

export function hideLoader(){
    return {type: HIDE_LOADER}
}

export function saveRegFields(event: React.ChangeEvent<HTMLInputElement>){
    return {type: FIELDS_SAVE, payload: {[event.target.name]: event.target.value}}
}

export function getLogin(){
    return (dispatch: any) => {
        const data = JSON.parse(localStorage.getItem(storageName) || '{}')
        if(data && data.token){
            dispatch({type: IS_AUTH, payload: {userId: data.userId, token: data.token}})
        }
        dispatch(hideLoader())
    }
}
export function login(auth: {}){
    return async (dispatch: any) => {
        try{
            dispatch(showLoader())
            const res = await axios.post(`${API_URL}/api/auth`, auth)
            dispatch(hideLoader())
            const {userId, token} = res.data
            if(token){
                localStorage.setItem(storageName, JSON.stringify({
                    userId, token
                }))
                dispatch({type: IS_AUTH, payload: {userId, token}})
            }
            dispatch(showAlert(res.data.message, res.data.type))
        }
        catch(e){}
    }
}
export function register(auth: {}){
    return async(dispatch: any) =>{
        try{
            dispatch(showLoader())
            const res = await axios.post(`${API_URL}/api/register`, auth)
            dispatch(hideLoader())
            dispatch(showAlert(res.data.message, res.data?.type))
        }
        catch(e){}
    }
}

export function logout(){
    return (dispatch: any) =>{
        localStorage.removeItem(storageName)
        dispatch({type: NO_AUTH})
    }
}
export function getItems(){
    const token = getToken()
    return async (dispatch: any) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            dispatch(showLoader())
            const res = await axios.get(`${API_URL}/api/items`, config)
            dispatch(hideLoader())
            dispatch({type: GET_ITEMS, payload: res.data.items})
            if (res.data.error) {
                dispatch(showAlert(res.data.message))
            }
        }
        catch(e){}
    }
}
export function deleteItems(id: number | string){
    const token = getToken()
    return async (dispatch: any) => {
        try{
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            console.log('test')
            const res = await axios.delete(`${API_URL}/api/item/${id}`, config)
            dispatch({type: DELETE_ITEMS, payload: id})
            dispatch(showAlert(res.data.message, res.data.type))
        }
        catch(e){}
    }
}
export function addItem(title: string){
    const token = getToken()
    return async (dispatch: any) => {
        try {
            const item = {title}
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            dispatch(showLoader())
            const res = await axios.post(`${API_URL}/api/items`, item, config)
            dispatch(hideLoader())
            if (res.data && res.data.item) {
                dispatch({type: ADD_ITEMS, payload: res.data.item})
            }
            dispatch(showAlert(res.data.message, res.data.type))
        }
        catch (e){}
    }
}
