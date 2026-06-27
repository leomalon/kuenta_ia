# repositories/ingresos_repo.py
from backend.models.models import LoteInventario,Venta,VentaItem

def crear_ingreso(db, producto_id, cantidad,costo_total,costo_unitario):

    ingreso = LoteInventario(
        producto_id=producto_id,
        proveedor_id=None,
        cantidad_recibida=cantidad,
        costo_total = costo_total,
        costo_unitario=costo_unitario
    )

    db.add(ingreso)
    db.commit()
    db.refresh(ingreso)

    return ingreso

def crear_venta(db, notes=None):

    venta = Venta(
        notes=notes
    )

    db.add(venta)
    db.commit()
    db.refresh(venta)

    return venta

def crear_venta_item(db, ventas_id, producto_id, cantidad):

    venta_item = VentaItem(
        ventas_id=ventas_id,
        producto_id=producto_id,
        cantidad=cantidad
    )

    db.add(venta_item)
    db.commit()
    db.refresh(venta_item)

    return venta_item