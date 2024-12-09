import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { products } from '@/db/schema-sqlite'

export type ProductCardProps = {
  product: typeof products.$inferSelect
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    id,
    name,
    description,
    tags,
    category,
    launchDate,
    websiteUrl,
    screenshotUrl,
    avatarUrl,
    tier
  } = product

  return (
    <div className="group relative flex flex-col space-y-3 rounded-2xl border p-5 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        {/* 左侧头像和名称 */}
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <img
              src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}
              alt={name || 'avatar'}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm">{category}</p>
          </div>
        </div>

        {/* 右侧标签 */}
        <div className="flex items-center gap-2">
          {tier === 0 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-400 text-white">
              Free
            </span>
          )}
          {tier === 1 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-teal-400 text-white">
              Paid
            </span>
          )}
        {tier === 2 && (
            <span className="px-2 py-1 text-xs rounded-full text-white bg-blue-500">
                Free&Paid
            </span>
        )}
        </div>
      </div>

      {/* 添加截图区域 */}
      {screenshotUrl && (
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <img
            src={screenshotUrl}
            alt={`${name} screenshot`}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* 描述 */}
      <p className="line-clamp-2">{description}</p>

      {/* 标签 */}
      <div className="flex flex-wrap gap-2">
        {tags?.split(',').map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>


      {/* 链接覆盖整个卡片 */}
          <Link href={websiteUrl} target="_blank" className="absolute inset-0">
        <span className="sr-only">view</span>
      </Link>
    </div>
  )
}

export default ProductCard 