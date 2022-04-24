import {MainLayout} from '../components/MainLayout'
interface PropsData{
    data: [{
        name: string,
        id: number
    }]

 }
 function ServerSidePage({data}: PropsData){
    return(
        <MainLayout title={'Pre rendering'} h1={'Server Side Rendering'}>
          {data.map((item: any) => (
              <div className="mt-10" key = {item.id}>{item.name} - {item.email}</div>
          ))}
        </MainLayout>
    );
}
 export async function getServerSideProps() {
     const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
     const data = await res.json()
     return { props: { data } }
 }
 export default ServerSidePage