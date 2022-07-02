import Layout from "../../components/Layout"

export default function primerPost({data}) {
  return (
    <Layout>
        <h1>{data.id} - {data.title}</h1>
        <p>{data.body}</p>
    </Layout>
  )
}

export async function getStaticPaths() {       // crea todas las rutas según la cantidad de posts
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    const paths = data.map(({id}) => ({params: {id: `${id}`}}))         //con comillas invertidas para trasformar a string
    return {
        paths,
        fallback: false     // genera en forma automática la página 404
    }

  } catch (error) {
    console.log(error)
  }
}

export async function getStaticProps({params}) {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + params.id)
      const data = await res.json()
      return {
        props: {
          data
        }
      }
  
    } catch (error) {
      console.log(error)
    }
}