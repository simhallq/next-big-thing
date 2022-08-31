
import { useEffect, useState } from 'react'
import { supabase } from '../lib/initSupabase'



export default function Posts({ user }) {
  const [posts, setPosts] = useState([])
  const [newTaskText, setNewTaskText] = useState('')
  const [errorText, setError] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    let { data: posts, error } = await supabase.from('posts').select('*').order('id', true)
    if (error) console.log('error', error)
    else setPosts(posts)
  }
  const addPost = async (postText) => {
    let post = postText.trim()
    if (post.length) {
      let { data: post, error } = await supabase
        .from('posts')
        .insert({ content: post, poster_id: user.id })
        .single()
      if (error) setError(error.message)
      else setPosts([...posts, post])
    }
  }
  debugger
  const deletePost = async (id) => {
    try {
      await supabase.from('posts').delete().eq('id', id)
      setPosts(posts.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="w-full">
      <h1 className="mb-12">Post List.</h1>
      <div className="flex gap-2 my-2">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="What's on your mind?"
          value={newTaskText}
          onChange={(e) => {
            setError('')
            setNewTaskText(e.target.value)
          }}
        />
        <button className="btn-black" onClick={() => addPost(newTaskText)}>
          Add
        </button>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {posts.map((post) => (user.id==post.id) ?
            <Post key={post.id} post={post} isDeleteable={true} onDelete={() => deletePost(post.id)} />:
            <Post key={post.id} post={post} isDeleteable={false} onDelete={() => deletePost(post.id)} />
          )}
        </ul>
      </div>
    </div>
  )
}

const Post = ({ post,isDeleteable, onDelete }) => {
  debugger


  return (
    <li
      className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">{post.content}</div>
        </div>
        <button
          disabled={!isDeleteable}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  )
}

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)