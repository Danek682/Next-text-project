import Image from "next/image"
import Link from "next/link";
import { reqUrl } from "../../url"
import "./products.css";
export const metadata = {
  title: 'Главная',
  description: 'Наши продукты'
}

export default async function Products() {
    const req = await fetch(`${reqUrl}/products/?acf_format=standard&_fields=id,slug,title,acf`);
    const products = await req.json(); 
    console.log(products);

    return (
        <div className="products"> 
        <h1 className="products-title">Продукты</h1>
            <div className="products-wrapper">
              {products.map((product)=> (
                <div className="product-wrapper" key={product.id}>
                  <div className="product-box">
                    <Image
                    src={`${product.acf.large_image}`}
                    alt={product.title.rendered}
                    className="product-box__img"
                    width={500}
                    height={500}
                    loading="eager"
                    />
                    <h3 className="product-box__title">{product.title.rendered}</h3>
                    <p className="product-box__category">{product.acf.category.name}</p>
                    <Link href={`products/${product.slug}`}>
                      Узнать больше
                    </Link>
                  </div>
                </div>
              ))}
            </div>
        </div>
    );
}