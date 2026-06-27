'use client';

import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { subirExcelProductos, ApiError } from '@/lib/api';

const EXTENSIONES_VALIDAS = ['.xlsx', '.xls', '.csv'];

function esArchivoValido(file) {
  return EXTENSIONES_VALIDAS.some((ext) => file.name.toLowerCase().endsWith(ext));
}

function descargarPlantilla() {
  const encabezado = 'marca,producto,sku,stock_inicial,precio\n';
  const ejemplo = 'Alicorp,Aceite Primor 1L,,10,9.90\n';
  const blob = new Blob([encabezado + ejemplo], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'plantilla-productos-kapo.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export default function ExcelUploader() {
  const inputRef = useRef(null);
  const [archivo, setArchivo] = useState(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  function elegirArchivo(file) {
    if (!file) return;
    if (!esArchivoValido(file)) {
      setError('Solo aceptamos archivos .xlsx, .xls o .csv.');
      return;
    }
    setError(null);
    setMensaje(null);
    setArchivo(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    setArrastrando(false);
    elegirArchivo(event.dataTransfer.files?.[0]);
  }

  async function handleSubir() {
    if (!archivo) return;
    setSubiendo(true);
    setError(null);
    try {
      await subirExcelProductos(archivo);
      setMensaje('Tu archivo se subió correctamente. Estamos procesando tus productos.');
      setArchivo(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos subir tu archivo. Intenta de nuevo.');
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setArrastrando(true);
        }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center gap-2 rounded-xl2 border-2 border-dashed px-6 py-10 text-center transition-colors
          ${arrastrando ? 'border-accent-500 bg-accent-100/50' : 'border-line-200'}`}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent-500" aria-hidden="true">
          <path
            d="M12 16V4m0 0 4 4m-4-4-4 4M5 16v2.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm font-medium text-ink-900">
          Arrastra tu archivo aquí, o{' '}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-semibold text-accent-600 hover:text-accent-700"
          >
            elige uno
          </button>
        </p>
        <p className="text-xs text-ink-300">Formatos aceptados: .xlsx, .xls, .csv</p>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(event) => elegirArchivo(event.target.files?.[0])}
        />
      </div>

      {archivo && (
        <div className="flex items-center justify-between rounded-xl border border-line-200 px-3.5 py-2.5 text-sm">
          <span className="truncate font-medium text-ink-900">{archivo.name}</span>
          <button
            type="button"
            onClick={() => setArchivo(null)}
            className="text-xs font-semibold text-ink-300 hover:text-danger"
          >
            Quitar
          </button>
        </div>
      )}

      <Alert type="success">{mensaje}</Alert>
      <Alert type="error">{error}</Alert>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={descargarPlantilla}
          className="text-sm font-medium text-accent-600 hover:text-accent-700"
        >
          Descargar plantilla de ejemplo
        </button>
        <Button disabled={!archivo} loading={subiendo} onClick={handleSubir}>
          Subir archivo
        </Button>
      </div>
    </div>
  );
}
