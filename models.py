from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base

class ProductTransaction(Base):
    __tablename__ = "product_transactions"
    id = Column(Integer, primary_key=True, index=True)
    product_title = Column(String, index=True)
    product_description = Column(String)
    price = Column(Float)
    category = Column(String)
    date_of_sale = Column(Date)
    sold = Column(Integer)  # 1 for sold, 0 for not sold
