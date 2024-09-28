from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import get_db
from .models import ProductTransaction
import requests
from datetime import datetime

router = APIRouter()

THIRD_PARTY_API_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json"

@router.post("/initialize")
def initialize_database(db: Session = Depends(get_db)):
    response = requests.get(THIRD_PARTY_API_URL)
    data = response.json()

    for item in data:
        transaction = ProductTransaction(
            product_title=item['title'],
            product_description=item['description'],
            price=item['price'],
            category=item['category'],
            date_of_sale=datetime.strptime(item['dateOfSale'], "%Y-%m-%d"),
            sold=item['sold']
        )
        db.add(transaction)

    db.commit()
    return {"message": "Database initialized with seed data"}
