import { Edit2, Layers, Plus, Search, Upload } from 'lucide-react';
import { Badge, Button, Card, ElementGlyph } from '@components/ui';
import { PRODUCTS } from '@/data/products';
import { formatVND } from '@/utils/formatters';

export function AdminProductsPage() {
  return (
    <div className="space-y-5 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="lab-label">// Catalog · PIM</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Sản phẩm</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" leftIcon={<Upload className="h-4 w-4" />}>
            Bulk Push lên sàn
          </Button>
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Sản phẩm mới
          </Button>
        </div>
      </div>

      <Card padding="md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <input
              placeholder="Tên / SKU"
              className="h-9 w-full rounded-lg border border-black/[0.06] bg-transparent pl-8 pr-3 text-sm outline-none focus:border-amber-500 dark:border-white/[0.06]"
            />
          </div>
          <select className="h-9 rounded-lg border border-black/[0.06] bg-transparent px-3 text-sm outline-none dark:border-white/[0.06]">
            <option>Mọi Element</option>
            <option>[Ba] Base</option>
            <option>[Sc] Scholar</option>
            <option>[Ki] Kinetic</option>
            <option>[Hm] Home</option>
          </select>
          <select className="h-9 rounded-lg border border-black/[0.06] bg-transparent px-3 text-sm outline-none dark:border-white/[0.06]">
            <option>Mọi trạng thái</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </Card>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-black/[0.06] bg-ink-50 text-left dark:border-white/[0.06] dark:bg-ink-800">
              <tr className="font-mono text-[10px] uppercase tracking-widest text-muted">
                <th className="p-4"><input type="checkbox" /></th>
                <th className="p-4">Sản phẩm</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Element</th>
                <th className="p-4">Variants</th>
                <th className="p-4 text-right">Giá</th>
                <th className="p-4 text-right">Tồn kho</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
              {PRODUCTS.map((p) => {
                const totalStock = p.sizes.reduce((sum, s) => sum + s.stock, 0);
                return (
                  <tr key={p.id} className="transition-colors hover:bg-amber-50/40 dark:hover:bg-amber-500/[0.03]">
                    <td className="p-4"><input type="checkbox" /></td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.thumbnail} alt="" className="h-12 w-10 rounded-md object-cover" />
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-caption text-muted">{p.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-xs">{p.sku}</span>
                    </td>
                    <td className="p-4"><ElementGlyph code={p.element} variant="inline" /></td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-caption">
                        <Layers className="h-3 w-3 text-muted" />
                        {p.colors.length}c · {p.sizes.length}s
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono">{formatVND(p.price)}</td>
                    <td className="p-4 text-right">
                      <span
                        className={`font-mono text-sm ${
                          totalStock < 30 ? 'text-danger' : totalStock < 80 ? 'text-warning' : ''
                        }`}
                      >
                        {totalStock}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge tone="success">Active</Badge>
                    </td>
                    <td className="p-4">
                      <button className="rounded-md p-1.5 hover:bg-ink-100 dark:hover:bg-white/5">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
