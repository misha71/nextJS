import Link from 'next/link'
import {MainLayout} from '../components/MainLayout'
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux'
import {showAlert} from '../redux/actions'
import {useEffect} from "react";
import {Loader} from "../components/Loader";
import {FormAuth} from "../components/FormAuth";

export default function Index() {
    const {ready} = useSelector((state: RootStateOrAny) => state.load)
    const {userId, auth, token} = useSelector((state: RootStateOrAny) => state.auth)
    const dispatch = useDispatch()

  return (
    <MainLayout title={'Home Page'} h1={'Главная'}>
        {auth ? `Вы успешно зарегистрированы под логином ${userId} и ваш текуий токен: ${token}` : <FormAuth />}
    </MainLayout>
  )
}
