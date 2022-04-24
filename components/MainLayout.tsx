import React, {useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {getLogin, logout} from '../redux/actions'
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux'
import {Loader} from "./Loader";
import {Alert} from "./Alert";
interface Props{
    children: React.ReactNode
    title: string
    h1: string
}
export function MainLayout({ children, title = 'Next App', h1}: Props) {
    const {ready} = useSelector((state: RootStateOrAny) => state.load)
    const {auth} = useSelector((state: RootStateOrAny) => state.auth)
    const {visible} = useSelector((state: RootStateOrAny) => state.alert)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLogin())
    }, [])
      return (
        <>
          <Head>
            <title>{title} | Next Course</title>
            <meta name="keywords" content="next,javascript,nextjs,react" />
            <meta name="description" content="this is youtube tutorial for next" />
            <meta charSet="utf-8" />
          </Head>
          <nav>
            <Link href={'/'}><a>Главная</a></Link>
            <Link href = '/serverSidePage'>ServerSie rendering</Link>
            <Link href = '/staticPropsPage'>HTML static rendering</Link>
              {auth && <button  onClick={() => dispatch(logout())}><a>Выйти</a></button>}
              {auth && <Link href={'/items'}><a>Записи</a></Link>}
          </nav>
          <main className="max-w-7xl mx-auto ">
              <h1 className="text-3xl font-bold">{h1}</h1>
              {visible && <Alert />}
              {ready ? <Loader /> : children}
          </main>
        </>
      )
    }