# ShareIt: Blog post API endpoints using FastAPI
A minimal blog post API endpoints for • Creating user • Create or view posts • Like & Comment • Manage User Profile 

## Motivation
I wanted to dive more into Python and initially wanted to create a website & API using Django, but quickly scraped that idea. Then i happened to find a new framework
called FastAPI, and it immediately caught my attention due to it's high-speed performance, validation using Pydantic and Starlette,
and how quickly to develop new features. So i decides to give Python and FastAPI framework a try. It's a minimal blog post API, but i wanted to make a project
that covered all aspects of FastAPI and Python.
. So i decides to give Python and FastAPI framework a try. It's a minimal blog post API, but i wanted to make a project
that covered all aspects of FastAPI and Python.

## Tech Stack
* **Backend**: FastAPI(Python)
* **Database**: PostgreSQL
* **Authentication**: JWT using OAuth2 Password flow schema in FastAPI

# 🚀 Quick Start 

### Clone repository

```bash
git clone https://github.com/Jepsens1/ShareIt.git
cd ShareIt
```

### Create virtual environment
```
python -m venv .venv
```
#### Activate on Windows
```bash
# cmd
.venv\Scripts\activate
#
# PowerShell
.venv\Scripts\Activate.ps1
```
#### Activate on macOS / Linux
```bash
source .venv/bin/activate
```

### Install dependencies
```bash
pip install -r ./backend/requirements.txt
```
### Create .env file
Create a .env file in root directory of the project and fill out the values you wan't
```env
APP_NAME=ShareIt
JWT_SECRET_KEY=< use openssl rand -hex 32 >
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
DATABASE_URL=< postgres connection string>
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<supersecret>
POSTGRES_DB=ShareIt
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```

## Start the application

### Run docker
```bash
cd ShareIt
docker compose up -d
```

### Apply migration & run project
> [!NOTE] 
> Make sure you have activated virtual environment otherwise refer to [Create virtual environment](#create-virtual-environment)
```bash
cd ShareIt/backend
alembic upgrade head
python3 ./main.py
```
## Features
* **User Registration & Login**: Create an account and log in to access the platform.
* **Create & View Posts**: Create your own post and view other users posts.
* **User Profiles**: Manage your account and see your posts, view which post you have liked or commented
* **Like & Comment**: Able to like/unlike and/or comment or remove comment on a post

