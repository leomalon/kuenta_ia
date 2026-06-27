from sqlalchemy import Column, Integer, ForeignKey, DateTime,Numeric,String,Boolean,Text
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base


Base = declarative_base() #Any class that inherits from Base is a database table mapping

class LoteInventario(Base):
    __tablename__ = "lotes_inventario"

    id = Column(Integer, primary_key=True, index=True)

    producto_id = Column(
        Integer,
        ForeignKey("productos.id"),
        nullable=False,
        index=True
    )

    proveedor_id = Column(
        Integer,
        ForeignKey("proveedores.id"),
        nullable=True,
        index=True
    )

    cantidad_recibida = Column(Numeric(12, 2), nullable=False)
    costo_total = Column(Numeric(12, 2), nullable=False)
    costo_unitario = Column(Numeric(12, 4), nullable=False)

    fecha_recepcion = Column(
        DateTime(timezone=False),
        server_default=func.now(),
        nullable=False
    )

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)

    marca_id = Column(Integer, index=True, nullable=True)

    nombre = Column(String(200), nullable=False)

    unidad = Column(String(20), nullable=False)

    active = Column(
        Boolean,
        nullable=False,
        server_default="true"
    )

    creado_a = Column(
        DateTime(timezone=False),
        nullable=False,
        server_default=func.now()
    )

    precio_venta = Column(
        Numeric(12, 2),
        nullable=True
    )

class Proveedor(Base):
    __tablename__ = "proveedores"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(String(150), nullable=False)

    numero = Column(String(30), nullable=True)

    email = Column(String(150), nullable=True)

    creado_a = Column(
        DateTime(timezone=False),
        nullable=False,
        server_default=func.now()
    )


class Venta(Base):
    __tablename__ = "ventas"

    id = Column(Integer, primary_key=True, index=True)

    fecha_venta = Column(
        DateTime(timezone=False),
        server_default=func.now(),
        nullable=False
    )

    notes = Column(Text, nullable=True)

    # relación con detalle

class VentaItem(Base):
    __tablename__ = "ventas_items"

    id = Column(Integer, primary_key=True, index=True)

    ventas_id = Column(
        Integer,
        ForeignKey("ventas.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    producto_id = Column(
        Integer,
        ForeignKey("productos.id"),
        nullable=False,
        index=True
    )

    cantidad = Column(Numeric(12, 2), nullable=False)

class Marca(Base):
    __tablename__ = "marcas"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(Integer, index=True, nullable=True)

    creado_a = Column(
        DateTime(timezone=False),
        nullable=False,
        server_default=func.now()
    )