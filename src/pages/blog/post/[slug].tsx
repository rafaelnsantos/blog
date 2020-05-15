import { GetStaticProps, GetStaticPaths } from "next"
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getPosts } from "~/utils/blogUtils"

export default function Post (props) {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.date}</div>
      <ReactMarkdown source={props.content} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts()
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } }) ),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params

  const post = getPostBySlug(slug)

  return { props: { ...post } }
}