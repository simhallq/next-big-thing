import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function Post({ username, content, date }) {
    return (
        <div className="px-6 py-6 border-t hover:bg-stone-100">
            <p className="text-m font-bold">{username}</p>
            <p className="text-m">{content}</p>
            <p className="text-stone-500 text-sm">{dayjs(date).fromNow()}</p>
        </div>
    )
}