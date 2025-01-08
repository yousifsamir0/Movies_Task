## Setup Instructions

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
