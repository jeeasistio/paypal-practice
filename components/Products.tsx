import { Product } from '@prisma/client'
import Link from 'next/link'

const Products = ({ products }: { products?: Product[] }) => {
    return (
        <div>
            <h1>Products</h1>

            {products?.map((product, index) => (
                <div key={index} style={{ padding: 12 }}>
                    <h3>{product.name}</h3>
                    <h2>$ {product.price}</h2>
                    <p>{product.description}</p>

                    <Link href={`/${product.id}`}>
                        <a>
                            <button style={{ padding: '4px 8px', cursor: 'pointer' }}>Buy</button>
                        </a>
                    </Link>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default Products
