import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { fetcher } from '~/services/fetcher'
import { deslugfy } from '~/utils/slugfy'

export default function Character({ Person }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div>
        <Head>
          <title>Loading...</title>
        </Head>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>{Person.name}</title>
      </Head>
      {Person.name}
      {Person.species.map(specie=><div key={specie.name}>{specie.name}</div>)}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () =>{
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { Person } = await fetcher(`query($name: String){
    Person(name: $name){
      name
      species {
        name
      }
    }
  }`, {name: deslugfy(params.slug)})
  
  return {
    props:{
      Person
    }
  }
}
