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
// create file logs/app.log.jsonl
python3 ./main.py
```


## 📖 Endpoints
- `POST /users` - Create user
- `GET /users` - Read Users
- `GET /users/me` - Read your user (requires auth)
- `PUT /users/me` - Update your user (requires auth)
- `DELETE /users/me` - Delete your user (requires auth)
- `GET /users/{user_id}` - Read user by ID
- `GET /users/{user_id}/posts` - Read user posts by ID
- `GET /users/{user_id}/comments` - Read user comments by ID
- `GET /users/{user_id}/likes` - Read user likes by ID

- `POST /posts` - Create Post (requires auth)
- `GET /posts` - Get Posts
- `GET /posts/{post_id}` - Get Post by ID
- `DELETE /posts/{post_id}` - Delete Post by ID (requires auth)
- `PUT /posts/{post_id}` - Update Post by ID (requires auth)
- `GET /posts/{post_id}/comments` - Get comments by Post ID
- `POST /posts/{post_id}/comments` - Create comments to Post by ID (requires auth)
- `GET /posts/{post_id}/likes` - Get likes on post by ID 
- `POST /posts/{post_id}/like` - Add like on post by ID  (requires auth)
- `DELETE /posts/{post_id}/like` - Delete like on post by ID  (requires auth)

- `GET /comments/{comment_id}` - Get comment by ID
- `PUT /comments/{comment_id}` - Update comment by ID (requires auth)
- `DELETE /comments/{comment_id}` - Delete comment by ID (requires auth)

- `POST /auth/token` - Login endpoint using Oauth2 flow
- `POST /auth/refresh` - Generate Refresh token
- `DELETE /auth/logout` - Revoke token
