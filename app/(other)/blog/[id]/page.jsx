import { reqUrl } from "../../../url"
import "./selectedBlog.css"
export async function generateMetadata({ params }) {
  const { id } = await params
  const req = await fetch(`${reqUrl}/posts/${id}?&acf_format=standart&_fields=id,title,content,date`);
  const posts = await req.json()
  return {
    title: "Blogs: " + posts.title.rendered,
    description: posts.content.rendered
  }
} //МЕТАДАННЫЕ

export const dynamic = "force-dynamic";

export default async function Blogs ({params}) {
  const { id } = await params
  const req = await fetch(`${reqUrl}/posts/${id}?&acf_format=standart&_fields=id,title,content,date`,{
    cache: "no-store"
  });
  const posts = await req.json()
  console.log(posts)
  return (
    <div className="about">
        <div>
            <h1 className="about-title">{posts.title.rendered}</h1>
        </div>
        <div className="about-text" dangerouslySetInnerHTML={{__html: posts.content.rendered}} >
        </div>
    </div>
  )
}