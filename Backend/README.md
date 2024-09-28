# FastAPI Product Transactions
This project implements a set of APIs for managing product transactions using FastAPI.

## Requirements
- Python 3.8+
- FastAPI
- Uvicorn
- SQLAlchemy

## Installation
1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Run the FastAPI server: `uvicorn app.main:app --reload`

## API Endpoints
- `POST /initialize` - Initialize the database with seed data
- `GET /transactions` - List transactions with pagination and search
- `GET /statistics` - Get statistics for the selected month
- `GET /price-range-bar-chart` - Get bar chart data
- `GET /category-pie-chart` - Get pie chart data
- `GET /combined` - Get combined data
