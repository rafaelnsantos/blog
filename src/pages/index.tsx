import { GetStaticProps } from 'next'

export default function Index(props) {
  return (
    <div>
      {props.a}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      a: 1
    }
  }
}