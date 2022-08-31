import { supabase } from '../lib/initSupabase'
import Feed from '../components/Feed'


export default function Home() {
  return (
    <div className="w-full h-full bg-white flex justify-center">
    {/* Navbar */}
    {/* Title */}
    <Feed />
    {/* Footer */}
    </div>
  )
}