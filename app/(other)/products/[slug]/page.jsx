import "./selectedProduct.css"
import {client} from "../../../../sanity/client"
import { PortableText } from "next-sanity"; //npm install @portabletext/react
import { urlFor } from "../../../../sanity/client";
export const dynamic = "force-dynamic";
export default async function Product({ params }) {
   const { slug } = await params;

   const peoductQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
    releaseDate,
    image,
    caption,
    slug,
    description,
    body,
    width,
    height,
    category -> {
      title,
      slug
    }
}`
const product = await client.fetch(peoductQuery,{slug})
console.log(product)

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      return (
        <img
          src={urlFor(value)
            .height(product.height)
            .width(product.width)
            .fit("crop")
            .auto("format")
            .url()
          }
          alt={value.alt || ""}
          loading="lazy"
          style={{ margin: "20px 0" }}
        />
      );
    },
  },
};

return (
  <div className="test">
    <h1>
      {product.title}
    </h1>
    <div>
    <PortableText
     value={product.body}
     components={components}
     />
    </div>
  </div>
)
} 









// import { reqUrl } from "../../../url"
// import "./selectedProduct.css"

// export async function generateMetadata({ params }) {
//  const { slug } = await params  
//   const req = await fetch(`${reqUrl}/products/?acf_format=standard&_fields=id,title,slug,acf&slug=${slug}`)
//   const products = await req.json()
//   const product = products[0]
//   return {
//    title: product.title.rendered,  
//    description: product.acf.summary
//   }
// }

// export const dynamic = "force-dynamic";

// export default async function Product({params}) {
//  const { slug } = await params  
// const req = await fetch(`${reqUrl}/products/?acf_format=standard&_fields=id,title,slug,acf&slug=${slug}`,{
//   cache: "no-store"  
// })
//   const products = await req.json()
//   const product = products[0]
//   return (
//     <div>  
//       <h1>{product.title.rendered}</h1>
//       <p>Slug: {product.slug}</p>
//       <p>Summary: {product.acf.summary}</p>
//       <img src={product.acf.large_image} alt={product.title.rendered} />
//     </div>
//   )
// }

// import { reqUrl } from "../../../url"
// import "./selectedProduct.css"

// async function getProducts(slug) {
//   const req = await fetch(`${reqUrl}/products/?acf_format=standard&_fields=id,title,slug,acf&slug=${slug}`,{
//   cache: "no-store"  
//   })
//   const products = await req.json()
//   console.log(products)
//   return products[0]
// }
// export const dynamic = "force-dynamic";

// export async function generateMetadata({ params }) {
//    const { slug } = await params  
//    const product = await getProducts(slug)
//    return {
//     title: product?.title?.rendered,  
//     description: product?.acf?.summary
//    }
// }

// export default async function Product({ params }) {
//    const { slug } = await params  
//   const product = await getProducts(slug)

//   return (
//      <div>  
//        <h1>{product?.title?.rendered}</h1>
//         <p>Slug: {product?.slug}</p>
//         <p>Summary: {product?.acf?.summary}</p>
//        <img src={product?.acf?.large_image} alt={product?.title?.rendered} />
//     </div>
//    )
// }

