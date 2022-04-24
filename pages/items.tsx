import {MainLayout} from '../components/MainLayout'
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux'
import {deleteItems, getItems} from '../redux/actions'
import {useEffect} from "react";
import {FormItem} from "../components/FormItem";
import {ViewItem} from "../components/ViewItem";

interface ItemMap{
    _id: string | number,
    title: string,
    date: string
}
export default function ItemsPage() {
    const {items} = useSelector((state: RootStateOrAny) => state.items)
    const {auth} = useSelector((state: RootStateOrAny) => state.auth)
    const dispatch = useDispatch()

    const deleteItemsView = (id: number | string) => {
        dispatch(deleteItems(id))
    }

    useEffect(() => {
        console.log('здесь')
        dispatch(getItems())
    }, [])
    return (
        <MainLayout title={'Записи'} h1={'Добавить новую запись'}>
            {auth && <FormItem />}
                <div className="mt-10">
                {items.map((item: ItemMap) => (
                    <ViewItem data = {item} onDelete = {deleteItemsView} key = {item._id}  />
                ))}
            </div>
        </MainLayout>
    )
}
