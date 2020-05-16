import { GetStaticProps, GetStaticPaths } from "next"
import ReactMarkdown from 'react-markdown'
import { NextSeo } from 'next-seo'
import { getPostBySlug, getPosts } from "~/utils/blogUtils"
import { CodeBlock } from "~/components/markdown/CodeBlock"

export default function Post (props) {
  return (
    <div>
      <NextSeo 
        title={props.metaTitle} 
        description={props.metaDescription} 
        openGraph={{
          title: props.metaTitle,
          description: props.metaDescription,
          url: `${process.env.URL}/blog/${props.slug}`,
          images: [{
            url: props.metaImage,
            width: 1200,
            height: 630,
            alt: props.metaTitle
          }],
          type: 'article'
        }}
      />
      <div>{props.title}</div>
      <div>{props.date}</div>
      <ReactMarkdown source={props.content} renderers={{ code: CodeBlock }} />
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