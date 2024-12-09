'use client';

import { useRouter } from 'next/navigation';

interface FilterControlsProps {
  categories: { category: string }[];
  tiers: number[];
  currentCategory?: string;
  currentTier?: string;
  searchParams: Record<string, string>;
}

export default function FilterControls({
  categories,
  tiers,
  currentCategory,
  currentTier,
  searchParams,
}: FilterControlsProps) {
  const router = useRouter();

  const buildUrl = (params: Record<string, string>) => {
    const urlParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      urlParams.set(key, value);
    });
    return `/?${urlParams.toString()}`;
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <select
        className="border rounded px-3 py-2"
        onChange={(e) => router.push(buildUrl({ category: e.target.value, page: '1' }))}
        value={currentCategory || 'all'}
      >
        <option value="all">所有分类</option>
        {categories.map(({ category }) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      
      <select
        className="border rounded px-3 py-2"
        onChange={(e) => router.push(buildUrl({ tier: e.target.value, page: '1' }))}
        value={currentTier || 'all'}
      >
        <option value="all">所有等级</option>
        {tiers.map((tier) => (
          <option key={tier} value={tier}>{tier}</option>
        ))}
      </select>
    </div>
  );
} 