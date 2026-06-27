# services/inventory_router.py

from backend.services.servicio_inventario import registrar_ingreso,registrar_venta
# from backend.services.servicio_pregunta import ejecutar_consulta_natural


def router_de_acciones(accion,mensaje_analizado, db, business_id):

    if accion == "INGRESO":
        return registrar_ingreso(db, business_id, mensaje_analizado)

    if accion == "VENTA":
        return registrar_venta(db, business_id, mensaje_analizado)

    if accion == "PREGUNTA":
        ejecutar_consulta_natural(db, mensaje_analizado["pregunta_cliente"])
        # futuro
        # construir_sql_responder_pregunta()

    return {"status": "unknown action"}