export const metadata = {
  title: 'О нас',
  description: 'Основная информация про нашу деятельность'
}
import "./about.css"
import { reqUrl } from "../../url"
export const dynamic = "force-dynamic";
export default async function About () {
    const res = await fetch(`${reqUrl}/pages?&acf_format=standart&_fields=id,slug,title,content`, {
        cache: "no-store"
    })
    const products = await res.json();
    const about = products[1]
    console.log(about)
    return (
     <div className="about">
        <div>
            <h1 className="about-title">{about.title.rendered}</h1>
        </div>
        <div className="about-text" dangerouslySetInnerHTML={{__html: about.content.rendered}}>
        </div>
    </div>
    )
}