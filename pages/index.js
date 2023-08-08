import Head from 'next/head'
import { PostCard, Categories, PostWidget, LogoCard } from '@/components/';
import { getPosts } from '@/services/';
import { FeaturedPosts } from '@/sections/';


export default function Home({ posts }) {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>PLN con Deep Learning</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='author' content='Raúl Ernesto Gutiérrez de Piñerez Reyes' />
        <meta name='description' content='Curso de Procesamiento de Lenguaje Natural con Deep Learning' />
        <meta name='keywords' content='PLN, Transformers, Embeddings, NER' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => (
            <PostCard post={post.node} key={post.node.title} />
          ))}
        </div>

        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
            <LogoCard />
          </div>
        </div>

      </div>

    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
};

