import { db } from '@/db'
import ProductCard from '@/components/ProductCard'
import { products as productsTable } from '@/db/schema-sqlite'
import { count, eq, and } from 'drizzle-orm';
import Footer from '@/components/footer'

export const runtime = 'edge'

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string, cat?: string, tier?: string }
}) {
  const currentPage = Number(searchParams.page) || 1;
  const selectedCategory = searchParams.cat || '';
  const selectedTier = searchParams.tier || '';
  const pageSize = 6;
  
  const totalProducts = await db.select({ count: count() }).from(productsTable);
  const totalPages = Math.ceil(totalProducts[0].count / pageSize);
  
  const products = await db.query.products.findMany({
    where: (fields) => {
      const conditions = [];
      if (selectedCategory) {
        conditions.push(eq(fields.category, selectedCategory));
      }
      if (selectedTier) {
        conditions.push(eq(fields.tier, Number(selectedTier)));
      }
      return conditions.length > 0 ? and(...conditions) : undefined;
    },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
  });
  
  const categories = await db.select({ name: productsTable.category }).from(productsTable).groupBy(productsTable.category);
  
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold m-4">AI Could be Fun</h1>
      <main className='flex-grow max-w-6xl mx-auto'>
        {/* 类别筛选器改为表单提交 */}
        <form method="GET" className="flex justify-center items-center space-x-2 mb-4">
          <select
            name="cat"
            defaultValue={selectedCategory}
            className="px-4 py-2 border rounded"
          >
            <option value="" >All Categories</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="tier"
            defaultValue={selectedTier}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Tiers</option>
            <option value="0">Free</option>
            <option value="1">Paid</option>
            <option value="2">Free & Paid</option>
          </select>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Filter
          </button>
        </form>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* 分页控件 */}
        <div className="flex justify-center items-center space-x-2 my-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <a
              key={pageNum}
              href={`/?page=${pageNum}${selectedCategory ? `&cat=${selectedCategory}` : ''}`}
              className={`px-4 py-2 border rounded ${
                currentPage === pageNum
                  ? 'bg-blue-500 text-white'
                  : ''
              }`}
            >
              {pageNum}
            </a>
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  )
}
