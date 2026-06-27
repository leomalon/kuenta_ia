#Standard modules
from datetime import datetime, timedelta, timezone
import requests
import base64
import subprocess
import os

#Modules
from backend.services.ai_interprete import analizar_mensaje
from backend.services.clasificacion_accion import router_de_acciones
from backend.core.database import get_db
from backend.services.enviar_respuesta import enviar_mensaje_wsp
from backend.llm.openai import ChatOpenAI

#Third-party modules
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dotenv import load_dotenv

router = APIRouter()

load_dotenv()

openai_api_key = os.environ.get("OPENAI_API_KEY")
API_KEY_EVOLUTION = os.environ.get("API_KEY_EVOLUTION")

llm_client = ChatOpenAI(api_key=openai_api_key,model="gpt-4.1-mini")

def descargar_audio_evolution_api(api_url, apikey, message_payload):

    body = {
        "message": message_payload["data"]["message"],
        "convertToMp4": False
    }

    headers = {
        "apikey": apikey
    }

    response = requests.post(
        f"{api_url}/chat/getBase64FromMediaMessage/Kapo_IA",
        json=body,
        headers=headers
    )

    return response.json()

def guardar_audio(base64_audio, output_path):

    audio_bytes = base64.b64decode(base64_audio)

    with open(output_path, "wb") as f:
        f.write(audio_bytes)

    return output_path

def convertir_audio(input_path: str, output_path: str):
    """
    Convierte audio OGG (WhatsApp) a MP3 usando ffmpeg
    """

    command = [
        "ffmpeg",
        "-y",              # sobrescribir si existe
        "-i", input_path, # input
        "-ar", "16000",   # sample rate recomendado para STT
        "-ac", "1",       # mono audio (mejor para speech)
        output_path
    ]

    subprocess.run(command, check=True)

    return output_path


@router.post("")
def webhook(payload: dict,  db: Session = Depends(get_db)):

    # #Protection against late messages
    # timestamp_mensaje_usuario = payload["data"]["messageTimestamp"]

    # tiempo_mensaje = datetime.fromtimestamp(
    #     timestamp_mensaje_usuario,
    #     tz=timezone.utc
    # )

    # ahora = datetime.now(timezone.utc)


    # if ahora - tiempo_mensaje > timedelta(minutes=2):
    #     return
    
    mensaje = payload.get("data").get("message")

    # if "audioMessage" in mensaje:

    #     evo_response = descargar_audio_evolution_api(
    #         api_url="http://localhost:8080",
    #         apikey=API_KEY_EVOLUTION,
    #         message_payload=payload
    #     )

    #     audio_b64 = evo_response["base64"]

    #     ogg_path = "/tmp/audio.ogg"
    #     mp3_path = "/tmp/audio.mp3"

    #     guardar_audio(audio_b64, ogg_path)
    #     convertir_audio(ogg_path, mp3_path)

    #     texto = llm_client.transcribir(mp3_path)

    #     mensaje_analizado = analizar_mensaje(texto)

    mensaje_texto = (
        mensaje.get("conversation")
    )

    numero = (
        payload.get("data").get("key").get("remoteJid")
    )

    #split phone
    numero = str(numero)[0:11]

    if numero != "51934311273":#!= "51934311273":51940241398
        return {"status": "ignored"}


    if not mensaje_texto:
        return {"error": "no message found"}

    mensaje_analizado = analizar_mensaje(str(mensaje_texto))
    print(mensaje_analizado)

    accion = mensaje_analizado.get("accion")

    # 1. PREGUNTAS
    if accion == "PREGUNTA":
        # aquí luego conectas tu módulo LLM / query DB
        return {
            "status": "ok",
            "type": "question"
        }

    # 2. INGRESO / VENTA
    resultado = router_de_acciones(
        accion,
        mensaje_analizado,
        db,
        1  # business_id fijo
    )

    if resultado.get("status") == "ok":
        enviar_mensaje_wsp(numero, resultado["mensaje"])

    if accion=="DESCONOCIDO":
        enviar_mensaje_wsp(numero)

    return {"status": "ok"}
