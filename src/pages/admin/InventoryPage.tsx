import { Box, MapPin, RotateCcw, ScanLine, TrendingDown } from 'lucide-react';
import { Badge, Button, Card, ProgressBar } from '@components/ui';
import { INVENTORY_BY_WAREHOUSE } from '@/data/dashboardMetrics';
import { PRODUCTS } from '@/data/products';
import { formatCompactVND } from '@/utils/formatters';

export function AdminInventoryPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="lab-label">// Inventory · Multi-warehouse</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Tồn kho</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" leftIcon={<RotateCcw className="h-4 w-4" />}>
            Chuyển kho
          </Button>
          <Button size="sm" leftIcon={<ScanLine className="h-4 w-4" />}>
            Quét Barcode kiểm kê
          </Button>
        </div>
      </div>

      {/* Warehouse cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {INVENTORY_BY_WAREHOUSE.map((w) => (
          <Card key={w.warehouse} padding="md">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" />
              <h3 className="font-display text-base font-semibold">{w.warehouse}</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="lab-label">SKU đơn vị</p>
                <p className="font-display text-2xl font-semibold">{w.stock.toLocaleString('vi-VN')}</p>
              </div>
              <div>
                <p className="lab-label">Giá trị tồn</p>
                <p className="font-mono text-lg">{formatCompactVND(w.value)}</p>
              </div>
              <ProgressBar
                value={(w.stock / 15_000) * 100}
                label="Tỷ lệ lấp đầy"
                showValue
                tone="amber"
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Low stock alert */}
      <Card padding="md">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-danger" />
            <h3 className="font-display text-lg font-semibold">SP dưới định mức tồn kho</h3>
          </div>
          <Badge tone="danger">14 SP</Badge>
        </div>
        <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
          {PRODUCTS.slice(0, 5).map((p) => {
            const minStock = Math.min(...p.sizes.map((s) => s.stock));
            return (
              <li key={p.id} className="flex items-center gap-4 py-3">
                <img src={p.thumbnail} alt="" className="h-12 w-10 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="font-mono text-caption text-muted">{p.sku}</p>
                </div>
                <div className="flex gap-1.5">
                  {p.sizes.map((s) => (
                    <span
                      key={s.id}
                      className={`flex h-8 w-8 flex-col items-center justify-center rounded text-[10px] ${
                        s.stock === 0 ? 'bg-danger/20 text-danger' : s.stock < 10 ? 'bg-warning/20 text-warning' : 'bg-ink-100 dark:bg-ink-800'
                      }`}
                    >
                      <Box className="h-2 w-2" />
                      <span className="font-mono">{s.stock}</span>
                    </span>
                  ))}
                </div>
                <Badge tone={minStock === 0 ? 'danger' : 'warning'}>
                  Min: {minStock}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
