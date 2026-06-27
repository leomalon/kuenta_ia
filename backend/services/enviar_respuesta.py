#services/enviar_respuesta.py

import requests
import os
from dotenv import load_dotenv

load_dotenv()


# Evolution API config variables

environment = os.getenv("ENVIRON")

if environment=="DEV":
    EVOLUTION_API_URL = os.getenv("EVOLUTION_LOCAL_API")
else: 
    EVOLUTION_API_URL = os.getenv("EVOLUTION_PROD_API")

API_KEY = os.getenv("API_KEY_EVOLUTION")

def enviar_mensaje_wsp(numero: str, mensaje: str):
    """
    Docstring for sending wsp messages.
    """
    url = f"{EVOLUTION_API_URL}/message/sendText/Kapo_IA"
    payload = {
        "number": numero,
        "text": mensaje
    }

    try:
        requests.post(url, json=payload, 
                headers={
                "apikey": API_KEY,
                "Content-Type": "application/json"
                },
                timeout=100)

    except RuntimeError as e:
        raise RuntimeError(str(e)) from e