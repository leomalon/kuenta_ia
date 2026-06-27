'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { obtenerProductosPorMarca } from '@/lib/api';

export default function ProductoChecklist({ marcaId, marcaNombre, onAgregar, yaRegistrados }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    setCargando(true);
    setSeleccionados([]);
    obtenerProductosPorMarca(marcaId).then((data) => {
      setProductos(data);
      setCargando(false);
    });
  }, [marcaId]);

  function toggle(productoId) {
    setSeleccionados((prev) =>
      prev.includes(productoId) ? prev.filter((id) => id !== productoId) : [...prev, productoId]
    );
  }

  function handleAgregar() {
    const items = productos
      .filter((producto) => seleccionados.includes(producto.id))
      .map((producto) => ({ productoId: producto.id, productoNombre: producto.nombre }));
    onAgregar(items);
    setSeleccionados([]);
  }

  if (cargando) {
    return <p className="text-sm text-ink-300">Cargando productos de {marcaNombre}…</p>;
  }

  if (productos.length === 0) {
    return (
      <EmptyState
        title="Sin productos para esta marca"
        description="Por ahora no hay productos precargados de esta marca."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-ink-700">2. Elige los productos de {marcaNombre}</p>

      <div className="thin-scroll flex max-h-64 flex-col divide-y divide-line-100 overflow-y-auto rounded-xl border border-line-200">
        {productos.map((producto) => {
          const yaEstaba = yaRegistrados.includes(producto.id);
          return (
            <label
              key={producto.id}
              className={`flex items-center gap-3 px-3.5 py-2.5 text-sm
                ${yaEstaba ? 'cursor-not-allowed text-ink-300' : 'cursor-pointer text-ink-900 hover:bg-surface-app'}`}
            >
              <input
                type="checkbox"
                checked={seleccionados.includes(producto.id)}
                disabled={yaEstaba}
                onChange={() => toggle(producto.id)}
                className="h-4 w-4 rounded border-line-200 text-accent-500 focus:ring-accent-100"
              />
              <span>{producto.nombre}</span>
              {yaEstaba && <span className="ml-auto text-xs">Ya agregado</span>}
            </label>
          );
        })}
      </div>

      <Button
        variant="secondary"
        size="sm"
        type="button"
        disabled={seleccionados.length === 0}
        onClick={handleAgregar}
        className="self-start"
      >
        Agregar {seleccionados.length > 0 ? `(${seleccionados.length})` : ''}
      </Button>
    </div>
  );
}
