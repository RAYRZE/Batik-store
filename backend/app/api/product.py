from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.product import Product
from app.schemas.product import ProductOut

router = APIRouter()


@router.get("/products", response_model=list[ProductOut])
def get_products(
    search: str = Query(default="", max_length=100),
    category: str = Query(default="", max_length=100),
    db: Session = Depends(get_db),
):
    stmt = select(Product).order_by(Product.id)

    if search:
        term = search.lower()
        stmt = stmt.where(Product.name.ilike(f"%{term}%"))

    if category:
        stmt = stmt.where(Product.category == category)

    products = db.scalars(stmt).all()
    return products


@router.get("/products/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@router.get("/categories", response_model=list[str])
def get_categories(db: Session = Depends(get_db)):
    categories = db.scalars(select(Product.category).distinct()).all()
    return sorted(categories)
