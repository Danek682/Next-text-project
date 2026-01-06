import { reqUrl } from "../../../url"
import "./selectedProduct.css"

export async function generateMetadata({ params }) {
 const { slug } = await params
  const req = await fetch(`${reqUrl}/products/?acf_format=standard&_fields=id,title,slug,acf&slug=${slug}`)
  const products = await req.json()
  const product = products[0]
  return {
   title: product.title.rendered,
   description: product.acf.summary
  }
}

export const dynamic = "force-dynamic";

export default async function Product({params}) {
 const { slug } = await params
const req = await fetch(`${reqUrl}/products/?acf_format=standard&_fields=id,title,slug,acf&slug=${slug}`,{
  cache: "no-store"
})
  const products = await req.json()
  const product = products[0]
  return (
    <div>
      <h1>{product.title.rendered}</h1>
      <p>Slug: {product.slug}</p>
      <p>Summary: {product.acf.summary}</p>
      <img src={product.acf.large_image} alt={product.title.rendered} />
    </div>
  )
}