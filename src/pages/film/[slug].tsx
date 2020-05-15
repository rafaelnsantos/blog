import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { fetcher } from '~/services/fetcher'
import { slugfy, deslugfy } from '~/utils/slugfy'
import Link from 'next/link'

export default function Movie({ Film }) {
  return (
    <div>
      <Head>
        <title>{Film.title}</title>
      </Head>
      Director: {Film.director}
      {Film.characters.map(character => <div key={character.id}>
        <a href={`/person/${slugfy(character.name)}`}>{character.name}</a>
      </div>)}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () =>{
  const { allFilms } = await fetcher(`query{
    allFilms{
      title
    }
  }`)
  return {
    paths: allFilms.map(film=>({params: {slug: slugfy(film.title)}})),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { Film } = await fetcher(`query($title: String){
    Film(title: $title){
      director
      title
      characters{
        id
        name
      }
    }
  }`, {title: deslugfy(params.slug)})
  
  return {
    props:{
      Film
    }
  }
}
