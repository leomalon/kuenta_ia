# services/servicio_inventario.py

#Local modules
from backend.repositories.repo_producto import obtener_producto_por_nombre
from backend.repositories.registro_inventario import crear_ingreso,crear_venta_item,crear_venta


#Function to register entry of products
def registrar_ingreso(db, business_id, mensaje_clasificado):

    items = mensaje_clasificado.get("items", [])
    costo_total = mensaje_clasificado.get("costo_total")

    if not items:
        return {
            "status": "error",
            "message": "No hay productos en el ingreso"
        }

    ingresos_creados = []

    for item in items:
        print(item)

        producto = obtener_producto_por_nombre(
            db,
            business_id,
            item["producto"]
        )

        if not producto:
            continue

        cantidad = item["cantidad"]

        costo_unitario = None
        if costo_total:
            costo_unitario = float(costo_total) / float(cantidad)

        ingreso = crear_ingreso(
            db=db,
            producto_id=producto.id,
            cantidad=cantidad,
            costo_total=costo_total,
            costo_unitario=costo_unitario
        )

        ingresos_creados.append(ingreso)

    return {
        "status": "ok",
        "mensaje": "Listo, Registrado con éxito en tu almacén! 😊",
        "data": ingresos_creados
    }

def registrar_venta(db, business_id, mensaje_clasificado):

    items = mensaje_clasificado.get("items", [])

    if not items:
        return {
            "status": "error",
            "message": "Venta sin productos"
        }

    # 1. crear cabecera de venta
    venta = crear_venta(db=db)

    ventas_items_creados = []

    for item in items:

        producto = obtener_producto_por_nombre(
            db,
            business_id,
            item["producto"]
        )

        if not producto:
            continue

        venta_item = crear_venta_item(
            db=db,
            ventas_id=venta.id,
            producto_id=producto.id,
            cantidad=item["cantidad"]
        )

        ventas_items_creados.append(venta_item)

    return {
        "status": "ok",
        "mensaje": "Listo, Registrado con éxito en ventas! 😊",
        "data": {
            "venta_id": venta.id,
            "items": ventas_items_creados
        }
    }