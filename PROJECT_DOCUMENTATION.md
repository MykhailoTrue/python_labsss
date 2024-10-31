
# Проєкт: База Медичних Показників для Спортсменів

## Опис проєкту

Цей проєкт є веб-додатком для управління медичними показниками спортсменів та тренувальними сесіями. Він складається з бекенду на **FastAPI** та фронтенду на **React** із використанням **Material-UI** для стилізації та **React Router v6** для маршрутизації.

## Структура проєкту

```
project-root/
├── alembic/
├── app/
│   ├── main.py             # Головний файл FastAPI додатка
│   ├── models.py           # Моделі SQLAlchemy для бази даних
│   ├── schemas.py          # Схеми для FastAPI
│   ├── database.py         # Налаштування підключення до бази даних
│   ├── auth.py             # Аутентифікація (реєстрація, логін)
│   ├── crud.py             # CRUD-операції для взаємодії з БД
│   ├── config.py           # Конфігурація
│   ├── auth_endpoints.py   # Ендпоінти для аутентифікації
│   └── athlete_endpoints.py # Ендпоінти для функціоналу спортсменів
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/            # Запити Axios до бекенду
│   │   ├── context/        # Контекст для управління аутентифікацією
│   │   ├── pages/          # Сторінки реєстрації, входу та головна сторінка
│   │   ├── components/     # Захищений маршрут
│   │   ├── App.js          # Головний компонент додатка
│   │   └── index.js        # Вхідна точка додатка React
└── README.md               # Документація
```

## Налаштування бекенду

1. **Встановіть залежності**:
   ```bash
   pip install fastapi sqlalchemy alembic psycopg2-binary
   ```

2. **Запустіть міграції**:
   Виконайте команду для запуску `alembic` міграцій та створення структури таблиць у PostgreSQL.

3. **Запуск FastAPI сервера**:
   ```bash
   uvicorn app.main:app --reload
   ```

4. **CORS Middleware**:
   FastAPI використовує `CORSMiddleware` для дозволу запитів з React фронтенду.

## Налаштування фронтенду

1. **Створіть новий проєкт React**:
   ```bash
   npx create-react-app frontend
   cd frontend
   ```

2. **Встановіть залежності**:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled axios react-router-dom
   ```

3. **Запустіть React сервер**:
   ```bash
   npm start
   ```

## Конфігурація Axios

У файлі `src/api/axiosConfig.js` створіть екземпляр Axios із базовою URL бекенду:

```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: { 'Content-Type': 'application/json' },
});

export default instance;
```

## Контекст аутентифікації (`AuthContext`)

Створіть контекст `AuthContext` для управління станом аутентифікації у файлі `src/context/AuthContext.js`:

```javascript
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
```

## Захищений маршрут (`ProtectedRoute`)

Для обмеження доступу до головної сторінки, створіть компонент `ProtectedRoute` у `src/components/ProtectedRoute.js`:

```javascript
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

## Маршрутизація

У `App.js` налаштуйте маршрути для реєстрації, входу та доступ до `MainPage` лише для авторизованих користувачів.

```javascript
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
```

## Використання

1. **Реєстрація**: Перейдіть на сторінку `/register` для створення нового облікового запису.
2. **Авторизація**: На сторінці `/login` введіть ім'я користувача та пароль, щоб увійти в систему.
3. **Головна сторінка**: Після авторизації користувач отримає доступ до `MainPage` з інформацією про спортсменів, медичні записи та тренувальні сесії.

## Логаут

На головній сторінці є кнопка **Logout**, яка видаляє токен і перенаправляє користувача на сторінку входу.

---

Ця документація надає огляд налаштувань проєкту та ключові частини коду для його налаштування і використання.
