'use client';

// Componente presentacional: recibe la lista de marcas ya cargada desde
// ManualRegistro (que es quien la pide a la API), así evitamos pedirla
// dos veces y de paso tenemos a mano el nombre de la marca elegida.
export default function MarcaSelector({ marcas, cargando, marcaSeleccionada, onSeleccionar }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="marca" className="text-sm font-medium text-ink-700">
        1. Elige la marca
      </label>
      <select
        id="marca"
        value={marcaSeleccionada || ''}
        disabled={cargando}
        onChange={(event) => onSeleccionar(event.target.value || null)}
        className="h-11 w-full rounded-xl border border-line-200 bg-white px-3.5 text-[15px] text-ink-900
          focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100
          disabled:bg-surface-app disabled:text-ink-300"
      >
        <option value="" disabled>
          {cargando ? 'Cargando marcas…' : 'Selecciona una marca'}
        </option>
        {marcas.map((marca) => (
          <option key={marca.id} value={marca.id}>
            {marca.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
