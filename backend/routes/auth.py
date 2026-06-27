from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/otp/solicitar")
async def solicitar_otp(payload):
    try:
        telefono = payload.telefono
        modo = payload.modo
        datos_negocio = payload.datos_negocio

        # -------------------------
        # Aquí tu lógica real
        # -------------------------

        # ejemplo: generar OTP
        otp = "893428"

        # aquí normalmente:
        # - guardar OTP en DB o cache (Redis)
        # - asociarlo al teléfono
        # - enviar SMS o WhatsApp

        print(f"OTP generado para {telefono}: {otp}")

        return {
            "success": True,
            "message": "Código OTP enviado",
            "telefono": telefono
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.post("/otp/verificar")
async def verificar_otp(payload):
    try:
        telefono = payload.telefono
        codigo = payload.codigo

        # -------------------------
        # Lógica de verificación OTP
        # -------------------------

        # ejemplo básico (reemplazar por Redis/DB real)
        codigo_valido = "893428"

        if codigo != codigo_valido:
            raise HTTPException(
                status_code=400,
                detail="Código OTP inválido"
            )

        return {
            "success": True,
            "message": "Código verificado correctamente",
            "telefono": telefono
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))