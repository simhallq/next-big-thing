import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'

import Post from './Post'


export default function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        let { data: posts, error } = await supabase.from('posts').select("*").order("created_at", { ascending: false })
        // debugger
        if (error) console.log('error', error)
        else setPosts(posts)
    }




    return (
        <div className="bg-white grow max-w-xl border py-20">
            {posts.map((p) => (<Post username={p.poster_name} content={p.content} date={p.created_at} />))}
        </div>
    )
}

