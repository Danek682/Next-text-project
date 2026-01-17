import { ProductBlock } from "../../components/ProductBlock/ProductBlock";
import "./products.css";

import {client} from "../../../sanity/client" //скорпировали папку sanity из my-sanity-project в test-project
// import { reqUrl } from "../../url"

export const metadata = {
  title: 'Главная',
  description: 'Наши продукты'
}

// const req = await fetch(`${reqUrl}/products/?acf_format=standard&_fields=id,slug,title,acf`, {
//   cache: "no-store"
// });
// const products = await req.json(); 

const productsQuery = `*[_type == "product"] {
  _id,
  title,
    releaseDate,
    image,
    caption,
    slug,
    description,
    body,
    category -> {
      title,
      slug
    }
}`
export const dynamic = "force-dynamic";
export default async function Products() {
  const products = await client.fetch(productsQuery)
  console.log(products)

    return (
        <div className="products"> 
        <h1 className="products-title">Продукты</h1>
          <ProductBlock 
          products = {products}
          />  
        </div>
    );
}