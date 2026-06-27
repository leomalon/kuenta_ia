"""
main.py

Initializes FastAPI app and registers routes

"""

# app.include_router(events.router, prefix="/events")


from fastapi import FastAPI, Request
# from backend.db import get_product_by_name, create_batch, create_product
# from backend.services.parser import analizar_ingreso_inventario
# from backend.evolution import send_message
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import webhook,auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(webhook.router, prefix="/webhook")
app.include_router(auth.router)