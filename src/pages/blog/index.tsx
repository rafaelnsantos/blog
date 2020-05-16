import { GetStaticProps } from "next"
import { getPosts } from "~/utils/blogUtils"

export default function Blog (props: BlogProps) {
  return <div>{props.posts.map(post => <a key={post.slug} href={`/blog/${post.slug}`}>{post.title}</a>)}</div>
}

interface BlogProps {
  posts: any[]
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = getPosts()

  return {
    props: {
      posts
    }
  }
}