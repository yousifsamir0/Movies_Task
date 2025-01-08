## Setup Instructions
## Environment Variables
### Backend
Create a `.env` file in the `backend` folder with the following content:

```
POSTGRES_USER=<YOUR_DATABASE_USERNAME>
POSTGRES_PASSWORD=<YOUR_DATABASE_PASSWORD>
POSTGRES_DB=<YOUR_DATABASE_NAME>
DATABASE_URL="<YOUR_DATABASE_URL>"
OMDB_BASE_URL=<YOUR_OMDB_API_BASE_URL>
OMDB_API_KEY=<YOUR_OMDB_API_KEY>
```

### Frontend
Create a `.env` file in the `frontend` folder with the following content:

```
OMDB_BASE_URL=<YOUR_OMDB_API_BASE_URL>
```

---
### Backend Setup
1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Set Up the Database**:
   - Create a PostgreSQL database.
   - Update the `.env` file in the `backend` folder with your database credentials.

3. **Run Migrations**:
   ```bash
   npm run migrate:deploy
   ```

4. **Start the Server**:
   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Variables**:
   - Update the `.env` file in the `frontend` folder with the backend's base URL.

3. **Start the Frontend**:
   ```bash
   npm run dev
   ```
