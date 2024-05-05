from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


class TeamCode(BaseModel):
    code: str


@app.post("/api/teams/checkCode")
async def checkTeamCode(team_code: TeamCode):
    if team_code.code == "abcde":
        return {"teamId": "abcder"}
    raise HTTPException(status_code=404, detail="TEAM_CODE_NOT_FOUND")


# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="127.0.0.1", port=8000)
