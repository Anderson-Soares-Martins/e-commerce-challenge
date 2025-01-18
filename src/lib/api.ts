import {products} from "@/lib/data/dataProducts"
import {productFull} from "@/lib/data/dataProductFull"

export async function fetchProducs(page: number, perPage: number) {
  const allProducts = products.slice((page - 1) * perPage, page * perPage)
  const totalProducts = products.length
  return { allProducts, totalProducts }
}

export async function fetchProductById(id: string) {
  return productFull.find(product => product.id === id)
}