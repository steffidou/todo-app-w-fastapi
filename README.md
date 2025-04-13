# FastAPI Todo App

A simple backend API for managing a Todo List using **FastAPI**. It supports full CRUD operations and can be connected to a React frontend.

---

## 🚀 Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/todo-app-fastapi.git
   cd todo-app-fastapi
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the development server**
   ```bash
   uvicorn main:app --reload
   ```

5. **Open your browser and go to**
   ```
   http://localhost:8000/docs
   ```
   to view the Swagger UI and interact with the API.

---

## 🌐 API Endpoints

### Base URL
```
https://todo-app-w-fastapi.onrender.com
```

---

### 🔹 `GET /todos/`
**Description:** Get a list of all todos  
**Response:**
```json
[
  {
    "id": 1,
    "title": "Example Task",
    "completed": false
  }
]
```

---

### 🔹 `GET /todos/{id}`
**Description:** Get a single todo item by ID  
**Response:**
```json
{
  "id": 1,
  "title": "Example Task",
  "completed": false
}
```

---

### 🔹 `POST /todos/`
**Description:** Create a new todo  
**Request:**
```json
{
  "title": "New Task",
  "completed": false
}
```
**Response:**
```json
{
  "id": 2,
  "title": "New Task",
  "completed": false
}
```

---

### 🔹 `PUT /todos/{id}`
**Description:** Update an existing todo  
**Request:**
```json
{
  "title": "Updated Task",
  "completed": true
}
```
**Response:**
```json
{
  "id": 2,
  "title": "Updated Task",
  "completed": true
}
```

---

### 🔹 `DELETE /todos/{id}`
**Description:** Delete a todo  
**Response:**
```json
{
  "id": 2,
  "title": "Updated Task",
  "completed": true
}
```

---

## 📦 Deployment Notes

- This API is deployed at:  
  [https://todo-app-w-fastapi.onrender.com](https://todo-app-w-fastapi.onrender.com)

- You can test endpoints using the Swagger documentation:  
  [https://todo-app-w-fastapi.onrender.com/docs](https://todo-app-w-fastapi.onrender.com/docs)

---

## 📄 License

This project is open-source and available under the MIT License.