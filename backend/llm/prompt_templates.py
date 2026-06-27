"""
Prompt templates

"""

class PlantillasPrompt:
    PROMPT_CLASIFICACION = """
Eres un sistema de extracción y estructuración de datos para un sistema de inventario.

Devuelve SOLO JSON válido puro (sin markdown, sin ```json, sin explicaciones).

NO uses:
- ```json
- ```
- texto adicional

FORMATO EXACTO:
{{
  "accion": "INGRESO | VENTA | PREGUNTA | DESCONOCIDO",
  "items": [
    {{
      "producto": string,
      "cantidad": number
    }}
  ] | null,
  "costo_total": number | null,
  "pregunta_cliente": string | null
}}

REGLAS:
- Si el usuario hace una pregunta → accion = "PREGUNTA"
  - pregunta_cliente contiene el texto completo
  - items = null
  - costo_total = null

- INGRESO = entrada de mercadería (compra / stock entrante)
- VENTA = salida de inventario por venta
- DESCONOCIDO si no se entiende la intención

- Si es INGRESO o VENTA:
  - siempre usar "items"
  - cada item debe tener producto y cantidad
  - si hay múltiples productos (audios, listas, texto) deben ir TODOS en items

- Si no hay datos suficientes → null en campos correspondientes

- Si el usuario menciona costo total (solo INGRESO normalmente), usarlo en costo_total

Texto:
{input_usuario}
"""

def construir_prompt_clasificacion(input_usuario:str) -> str:
    return PlantillasPrompt.PROMPT_CLASIFICACION.format(
        input_usuario = input_usuario
    )

def construir_prompt_query(schemas:str):
    pass