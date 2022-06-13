import moment from 'moment'
import Link from 'next/link'
import React,{useState , useEffect} from 'react'
import {getRecentPost , getSimilarPosts} from '../services/index'


const PostWidget = ({categories, slug }) => {

  const [relatedPosts, setrelatedPosts] = useState([])

  useEffect(() => {
    if(slug){
      getSimilarPosts(categories , slug)
        .then((res) => setrelatedPosts(res))
    }else{
      getRecentPost()
        .then((res) => setrelatedPosts(res))
    }
  }, [slug])

  console.log(relatedPosts);
  

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>{slug ? 'Related Post' : 'Recent Posts'}</h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className='flex items-center w-full mb-4'>
          <div className="w-16 flex-none">
            <img src={post.featuredImage.url} alt={post.title} height='60px' width={'60px'} className='align-middle rounded-full' />
          </div>
          <div className="flex-grow ml-4">
            <p className='text-grey-500 font-xs'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title} className='text-md'>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget