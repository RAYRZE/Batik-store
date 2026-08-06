from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import product
from app.config import CORS_ORIGINS
from app.database.database import Base, SessionLocal, engine
from app.models.product import Product

INITIAL_PRODUCTS = [
    {
        "name": "Batik Parang",
        "price": 250000,
        "category": "Batik Pria",
        "description": "Batik tulis dengan motif parang klasik yang elegan dan penuh makna.",
        "stock": 12,
        "image": "/batik/parang.jpeg",
    },
    {
        "name": "Batik Kawung",
        "price": 220000,
        "category": "Batik Wanita",
        "description": "Motif kawung simetris yang melambangkan kebijaksanaan dan keseimbangan.",
        "stock": 8,
        "image": "/batik/kawung.jpeg",
    },
    {
        "name": "Batik Mega Mendung",
        "price": 275000,
        "category": "Batik Pria",
        "description": "Awan bergulung khas Cirebon dengan gradasi warna yang lembut.",
        "stock": 0,
        "image": "/batik/megamendung.jpeg",
    },
    {
        "name": "Batik Sekar Jagad",
        "price": 240000,
        "category": "Batik Wanita",
        "description": "Motif bunga dan warna-warni yang mewakili keberagaman nusantara.",
        "stock": 20,
        "image": "/batik/sekarjagad.jpeg",
    },
    {
        "name": "Kemeja Batik Parang Seling",
        "price": 285000,
        "category": "Batik Pria",
        "description": "Kemeja batik dengan motif parang seling yang rapi dan formal untuk berbagai acara.",
        "stock": 15,
        "image": "/batik/kemeja-parang-seling.jpeg",
    },
    {
        "name": "Cardigan Batik",
        "price": 320000,
        "category": "Batik Wanita",
        "description": "Cardigan berbahan batik yang hangat dan elegan, cocok untuk gaya kasual hingga semi formal.",
        "stock": 10,
        "image": "/batik/cardigan-batik.jpeg",
    },
    {
        "name": "Jaket Patchwork Batik",
        "price": 350000,
        "category": "Batik Pria",
        "description": "Jaket batik patchwork dengan perpaduan motif beragam yang unik dan stylish.",
        "stock": 8,
        "image": "/batik/jaket-patchwork.jpeg",
    },
    {
        "name": "Jas Batik Tradisional",
        "price": 395000,
        "category": "Batik Pria",
        "description": "Jas bernuansa batik tradisional yang berwibawa dan memperlihatkan karakter yang anggun.",
        "stock": 6,
        "image": "/batik/jas-batik.jpeg",
    },
    {
        "name": "Lukisan Batik",
        "price": 450000,
        "category": "Aksesoris",
        "description": "Lukisan khas batik sebagai dekorasi rumah bernilai seni tinggi.",
        "stock": 5,
        "image": "/batik/lukisan-batik.jpeg",
    },
    {
        "name": "Syal Batik",
        "price": 210000,
        "category": "Batik Wanita",
        "description": "Syal batik lembut dan ringan sebagai pelengkap penampilan sehari-hari.",
        "stock": 12,
        "image": "/batik/syal-batik.jpeg",
    },
]


def seed_products():
    db = SessionLocal()
    try:
        if db.query(Product).count() > 0:
            return
        db.add_all([Product(**data) for data in INITIAL_PRODUCTS])
        db.commit()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    seed_products()
    yield


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(product.router)


@app.get("/")
def root():
    return {"message": "Hello BRO"}
