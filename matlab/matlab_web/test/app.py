#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import threading
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

import matlab
import matlab.engine
import uvicorn

HERE = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(HERE, "static")
os.makedirs(STATIC_DIR, exist_ok=True)

app = FastAPI(title="MATLAB Web App - Minimal Demo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


_eng = None
_lock = threading.Lock()


def _get_eng():
    global _eng
    if _eng is None:
        with _lock:
            if _eng is None:
                print("[MATLAB] starting MATLAB Engine ...")
                _eng = matlab.engine.start_matlab()
                _eng.cd(HERE, nargout=0)
                print(f"[MATLAB] ready in {HERE}")
    return _eng


@app.on_event("startup")
async def startup_event():
    _get_eng()


class Item(BaseModel):
    id: Optional[int] = None
    name: str
    value: float


class ItemCreate(BaseModel):
    name: str
    value: float


class ItemUpdate(BaseModel):
    name: Optional[str] = None
    value: Optional[float] = None


class ComputeRequest(BaseModel):
    a: float
    b: float


ITEMS = [
    {"id": 1, "name": "alpha", "value": 1.1},
    {"id": 2, "name": "beta", "value": 2.2},
]
_ID_LOCK = threading.Lock()
_NEXT_ID = 3


@app.get("/")
async def root():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))


@app.get("/health")
async def health():
    return {"ok": True, "matlab": _eng is not None}


@app.post("/api/compute")
async def compute(req: ComputeRequest):
    try:
        eng = _get_eng()
        with _lock:
            ret = eng.calc_sum(matlab.double([req.a]), matlab.double([req.b]))
        return {"a": req.a, "b": req.b, "sum": float(ret)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/items")
async def list_items():
    return ITEMS


@app.get("/api/items/{item_id}")
async def get_item(item_id: int):
    for it in ITEMS:
        if it["id"] == item_id:
            return it
    raise HTTPException(status_code=404, detail="item not found")


@app.post("/api/items")
async def create_item(data: ItemCreate):
    global _NEXT_ID
    with _ID_LOCK:
        new_id = _NEXT_ID
        _NEXT_ID += 1
    new_item = {"id": new_id, "name": data.name, "value": data.value}
    ITEMS.append(new_item)
    return new_item


@app.put("/api/items/{item_id}")
async def update_item(item_id: int, data: ItemUpdate):
    for it in ITEMS:
        if it["id"] == item_id:
            if data.name is not None:
                it["name"] = data.name
            if data.value is not None:
                it["value"] = data.value
            return it
    raise HTTPException(status_code=404, detail="item not found")


@app.delete("/api/items/{item_id}")
async def delete_item(item_id: int):
    for i, it in enumerate(ITEMS):
        if it["id"] == item_id:
            return ITEMS.pop(i)
    raise HTTPException(status_code=404, detail="item not found")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)
