'use client';

import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import MarcaSelector from '@/components/productos/MarcaSelector';
import ProductoChecklist from '@/components/productos/ProductoChecklist';
import StagedProductsTable from '@/components/productos/StagedProductsTable';
import { obtenerMarcas, registrarProductos, ApiError } from '@/lib/api';

export default function ManualRegistro() {
  const [marcas, setMarcas] = useState([]);
  const [cargandoMarcas, setCargandoMarcas] = useState(true);
  const [marcaId, setMarcaId] = useState(null);
  const [items, setItems] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerMarcas().then((data) => {
      setMarcas(data);
      setCargandoMarcas(false);
    });
  }, []);

  const marcaActual = useMemo(() => marcas.find((m) => m.id === marcaId), [marcas, marcaId]);
  const idsYaRegistrados = useMemo(() => items.map((item) => item.productoId), [items]);

  function handleSeleccionarMarca(id) {
    setMarcaId(id);
    setMensaje(null);
  }

  function handleAgregarProductos(nuevosItems) {
    if (!marcaActual) return;
    setItems((prev) => [
      ...prev,
      ...nuevosItems.map((item) => ({
        ...item,
        marcaId: marcaActual.id,
        marcaNombre: marcaActual.nombre,
        stockInicial: 0,
      })),
    ]);
    setMensaje(null);
  }

  function handleCambiarStock(productoId, valor) {
    const cantidad = Math.max(0, Number(valor) || 0);
    setItems((prev) =>
      prev.map((item) => (item.productoId === productoId ? { ...item, stockInicial: cantidad } : item))
    );
  }

  function handleQuitar(productoId) {
    setItems((prev) => prev.filter((item) => item.productoId !== productoId));
  }

  async function handleGuardar() {
    setGuardando(true);
    setError(null);
    try {
      await registrarProductos(items);
      setMensaje(`Guardamos ${items.length} producto(s) en tu inventario.`);
      setItems([]);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos guardar tus productos. Intenta de nuevo.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <MarcaSelector
        marcas={marcas}
        cargando={cargandoMarcas}
        marcaSeleccionada={marcaId}
        onSeleccionar={handleSeleccionarMarca}
      />

      {marcaActual && (
        <ProductoChecklist
          marcaId={marcaActual.id}
          marcaNombre={marcaActual.nombre}
          onAgregar={handleAgregarProductos}
          yaRegistrados={idsYaRegistrados}
        />
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-ink-700">3. Confirma tu lista</p>
        <StagedProductsTable items={items} onCambiarStock={handleCambiarStock} onQuitar={handleQuitar} />
      </div>

      <Alert type="success">{mensaje}</Alert>
      <Alert type="error">{error}</Alert>

      <Button
        disabled={items.length === 0}
        loading={guardando}
        onClick={handleGuardar}
        className="self-start"
      >
        Guardar productos
      </Button>
    </div>
  );
}
