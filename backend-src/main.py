from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager
from . import models, schemas, database

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Code to run on startup
    models.Base.metadata.create_all(bind=database.engine)
    yield
    # Code to run on shutdown
    print("Shutting down")

app = FastAPI(lifespan=lifespan, debug=True)

# Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get all products
@app.get("/products", response_model=list[schemas.Product])
def read_products(db: Session = Depends(get_db)):
    print('read')
    return db.query(models.Product).all()

# Get a single product by ID
@app.get("/products/{id}", response_model=schemas.Product)
def read_product(id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Create a new product
@app.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = models.Product(name=product.name, price=product.price)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# Delete a product by ID
@app.delete("/products/{id}", response_model=dict)
def delete_product(id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"detail": "Product deleted successfully"}