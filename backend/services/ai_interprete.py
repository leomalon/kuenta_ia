#Standard modules
import os
import json

#Third-party modules
from dotenv import load_dotenv

#Local modules
from backend.llm.openai import ChatOpenAI
from backend.llm.prompt_templates import construir_prompt_clasificacion


# ==========================================
# 1. CONFIG VARIABLES
# ==========================================
load_dotenv()

openai_api_key = os.environ.get("OPENAI_API_KEY")

llm_client = ChatOpenAI(api_key=openai_api_key,model="gpt-4.1-mini")

import json
import re

SCHEMA_TABLAS = """

TABLE proveedores:
- id (int, pk)
- nombre (varchar)
- numero (varchar)
- email (varchar)
- creado_a (timestamp)

TABLE marcas:
- id (int, pk)
- nombre (varchar)
- creado_a (timestamp)

TABLE productos:
- id (int, pk)
- marca_id (integer,fk -> marcas.id)
- nombre (varchar)
- unidad (varchar)
- active (boolean)
- creado_a (timestamp)
- precio_venta (numeric)

TABLE lotes_inventario:
- id (int, pk)
- producto_id (fk -> productos.id)
- proveedor_id (fk -> proveedores.id,null)
- cantidad_recibida (numeric)
- costo_total (numeric)
- costo_unitario (numeric)
- fecha_recepcion (timestamp)

TABLE ventas:
- id (int, pk)
- fecha_venta (timestamp)
- notes

TABLE ventas_items:
- id (int, pk)
- ventas_id (int, fk -> ventas.id)
- producto_id (int, fk-> productos.id)
- cantidad (numeric)

"""


def sanitizar_respuesta_llm(text: str):
    # elimina ```json y ```
    text = re.sub(r"```json", "", text)
    text = re.sub(r"```", "", text)

    return text.strip()

def analizar_mensaje(mensaje_usuario: str):
    
    prompt = construir_prompt_clasificacion(mensaje_usuario)

    respuesta = llm_client.invoke(prompt)

    respuesta_limpia = sanitizar_respuesta_llm(respuesta)

    return json.loads(respuesta_limpia)