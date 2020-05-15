import { fetcher } from '~/services/fetcher'
import { slugfy } from '~/utils/slugfy'
import styled from 'styled-components'

const Movie = styled.div`
  height: var(--min-tap-target-height);
`

export default function Index(props) {
  return (
    <div>
      {props.allFilms.map(film => (
        <Movie key={film.id}><a href={`/film/${slugfy(film.title)}`}>{film.title}</a></Movie>
      ))}
    </div>
  )
}

export async function getStaticProps () {
  const props = await fetcher(`query{
    allFilms{
      id
      title
    }
  }`)
  
  return {
    props
  }

}