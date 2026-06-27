// Datos de respaldo SOLO para que la pantalla sea navegable mientras el
// backend de FastAPI no esté disponible (por ejemplo, en desarrollo del
// frontend en paralelo). En producción, lib/api.js siempre intenta la API
// real primero; esto nunca debería usarse si el backend responde.

export const MARCAS_DEMO = [
  { id: 'mk-01', nombre: 'Alicorp' },
  { id: 'mk-02', nombre: 'Gloria' },
  { id: 'mk-03', nombre: 'Backus' },
  { id: 'mk-04', nombre: 'Nestlé' },
  { id: 'mk-05', nombre: 'P&G' },
];

export const PRODUCTOS_DEMO = {
  'mk-01': [
    { id: 'pr-101', nombre: 'Aceite Primor 1L' },
    { id: 'pr-102', nombre: 'Fideos Don Vittorio 500g' },
    { id: 'pr-103', nombre: 'Detergente Bolivar 850g' },
  ],
  'mk-02': [
    { id: 'pr-201', nombre: 'Leche Gloria Evaporada 400g' },
    { id: 'pr-202', nombre: 'Yogurt Gloria Fresa 1L' },
  ],
  'mk-03': [
    { id: 'pr-301', nombre: 'Cerveza Pilsen Callao 633ml' },
    { id: 'pr-302', nombre: 'Cerveza Cristal 355ml x6' },
  ],
  'mk-04': [
    { id: 'pr-401', nombre: 'Nescafé Clásico 170g' },
    { id: 'pr-402', nombre: 'Maggi Sopa de Pollo' },
  ],
  'mk-05': [
    { id: 'pr-501', nombre: 'Detergente Ariel 700g' },
    { id: 'pr-502', nombre: 'Pampers Etapa 3 x30' },
  ],
};
