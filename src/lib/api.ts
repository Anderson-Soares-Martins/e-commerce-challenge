import {products} from "@/lib/data/dataProducts"
import {productFull} from "@/lib/data/dataProductFull"

interface FetchProductsProps {
  currentPage: number
  perPage: number
  news?: boolean
  technology?: string[]
  productsOptions?: string[]
}

export async function fetchProducs({currentPage, perPage = 12, news, technology, productsOptions}: FetchProductsProps) {
  const filtredProducts = products.filter(product => {
    if (news && !product.isNew) return false
    if (technology && !technology.includes(product.family || "")) return false
    if (productsOptions && (!product.options || !productsOptions.some(option => product.options!.includes(option)))) return false
    return true
  }
  )
  const allProducts = filtredProducts.slice((currentPage - 1) * perPage, currentPage * perPage)
  const totalProducts = filtredProducts.length

  return { allProducts, totalProducts }
}

export async function fetchProductById(id: string) {
  return productFull.find(product => product.id === id)
}