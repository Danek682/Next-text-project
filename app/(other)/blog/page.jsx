export const metadata = {
  title: 'Блог',
  description: 'Страницы нашего блога'
}

export const dynamic = "force-dynamic";

import Link from "next/link"
import './blog.css'
import { reqUrl } from "../../url"
export default async function Blog () {
  const req = await fetch(`${reqUrl}/posts?&acf_format=standart&_fields=id,title,content,date`, {
    cache: "no-store"
  })
  const posts = await req.json()
    return (
        <div className="blog">
            <h1 className="blog-title">Blog</h1>
              <div className="blog-main">
                {posts.map((post,index)=> (
                <div className="blog-main-wrapper" key={index}>
                  <Link href={`/blog/${post.id}`} className="blog-main__theme">{post.title.rendered}</Link>
                  <p className="blog-main__author">{new Date(post.date)
                  .toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</p>
                </div>
                ))}
              </div>
        </div>
    )
} 