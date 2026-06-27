'use client';

import { useState } from 'react';
import SegmentedTabs from '@/components/ui/SegmentedTabs';
import ExcelUploader from '@/components/productos/ExcelUploader';
import ManualRegistro from '@/components/productos/ManualRegistro';

const TABS = [
  { value: 'excel', label: 'Subir Excel' },
  { value: 'manual', label: 'Registro manual' },
];

export default function ProductosModule() {
  const [tab, setTab] = useState('excel');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">Productos</h1>
        <p className="mt-1 text-sm text-ink-500">
          Sube tu lista de productos en Excel, o regístralos eligiendo marca y producto.
        </p>
      </div>

      <div className="rounded-xl2 border border-line-100 bg-white p-6 shadow-card">
        <SegmentedTabs options={TABS} value={tab} onChange={setTab} className="mb-6 w-full max-w-sm" />
        {tab === 'excel' ? <ExcelUploader /> : <ManualRegistro />}
      </div>
    </div>
  );
}
