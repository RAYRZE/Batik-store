from pydantic import ConfigDict, BaseModel


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    price: float
    stock: int
    category: str
    image: str | None
