# repositories/product_repo.py
from backend.models.models import Producto,Marca


def obtener_producto_por_nombre(db, business_id, nombre: str):

    return db.query(Producto).filter(
        # Product.business_id == business_id,
        Producto.nombre.ilike(f"%{nombre}%") #ignore mayusculas minusculas
    ).first()

def obtener_marca_por_nombre(db, business_id, nombre: str):

    return db.query(Marca).filter(
        # Product.business_id == business_id,
        Marca.nombre.ilike(f"%{nombre}%")
    ).first()

def crear_producto(db, business_id: int, nombre: str,marca:str,unidad:str,precio_venta:float|None):

    #validar marca o crear una nueva y obtener el ID para crear el producto
    marca_id = 1

    product = Producto(
        marca_id = marca_id,
        nombre=nombre,
        unidad=unidad,
        precio_venta = precio_venta
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product