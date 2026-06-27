from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

pass_pg = os.getenv("DB_PASSWORD")

DATABASE_URL = "postgresql://kato_user:admin@localhost:5432/kato_db"

engine = create_engine(DATABASE_URL, pool_pre_ping=True) #Checks if connection is alive before using it)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()