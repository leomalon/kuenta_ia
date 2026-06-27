'use client';

import EmptyState from '@/components/ui/EmptyState';

export default function StagedProductsTable({ items, onCambiarStock, onQuitar }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="Aún no agregaste productos"
        description="Elige una marca y sus productos para empezar tu lista."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-app text-xs uppercase tracking-wide text-ink-300">
          <tr>
            <th className="px-3.5 py-2.5 font-semibold">Marca</th>
            <th className="px-3.5 py-2.5 font-semibold">Producto</th>
            <th className="px-3.5 py-2.5 font-semibold">Stock inicial</th>
            <th className="px-3.5 py-2.5" />
          </tr>
        </thead>
        <tbody className="divide-y divide-line-100">
          {items.map((item) => (
            <tr key={item.productoId}>
              <td className="px-3.5 py-2.5 text-ink-500">{item.marcaNombre}</td>
              <td className="px-3.5 py-2.5 font-medium text-ink-900">{item.productoNombre}</td>
              <td className="px-3.5 py-2.5">
                <input
                  type="number"
                  min={0}
                  value={item.stockInicial}
                  onChange={(event) => onCambiarStock(item.productoId, event.target.value)}
                  className="h-9 w-24 rounded-lg border border-line-200 px-2 font-tabular text-sm
                    focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100"
                />
              </td>
              <td className="px-3.5 py-2.5 text-right">
                <button
                  type="button"
                  onClick={() => onQuitar(item.productoId)}
                  className="text-xs font-semibold text-ink-300 hover:text-danger"
                  aria-label={`Quitar ${item.productoNombre}`}
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
