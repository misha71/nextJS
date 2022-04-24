import {MainLayout} from '../components/MainLayout'
interface PropsData{
    data: [{
        name: string,
        id: number
    }]

}
function staticPropsPage({data}: PropsData){
    return(
        <MainLayout title={'Pre rendering'} h1={'HTML Static Rendering'}>
            {data.map((item: any) => (
                <div className="mt-10" key = {item?.id}>{item?.name} - {item?.email}</div>
            ))}
        </MainLayout>
    );
}
export async function getStaticProps() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const data = await res.json()
    // без параметра revalidate страница будет браться из кэша всегда, с revalidate будет браться сервера не чаще, чем раз в 10 сек
    //return { props: { data },  revalidate: 10}
    return { props: { data }}
}
export default staticPropsPage