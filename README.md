# 🔗 LinkShrink

A modern full-stack URL shortener built with **React**, **Express**, and **Supabase**. It allows users to create custom or randomly-generated short URLs, copy them easily, and even generate a QR code for fast access. Built-in rate limiting and validations ensure safety and reliability.

---

## 🛠️ Features

- ✅ Shorten long URLs with ease
- 🆔 Option to create custom short codes
- 🔁 Automatic redirection via shortened URL
- 📈 Tracks click count on each short URL
- 📱 QR code generation for mobile scanning
- ⚙️ Backend rate-limiting (5 requests/min)
- 🔒 Input validation with Zod
- ☁️ Supabase as the database backend

---

## 🌐 Live Demo 
> _To be added once deployed_

---

## 🧪 API Endpoints

>### POST /shorten

Shorten a long URL with or without a custom code.

- Request Body
>```
>{
>  "url": "https://example.com/very/long/path",
>  "customCode": "mycode123" // optional
>}
>```

- Success Response

>```
>{
>  "shorten_url": "http://localhost:3000/s/mycode123",
> "original_url": "https://example.com/very/long/path"
>}
>```

- Error Responses
```
400: Invalid input

409: Custom code already taken

429: Too many requests
```
>### GET /s/:code
Redirects to the original URL and increments click count.

---

## 🧾 Supabase Table Schema

| Column               | Type      | Description                         |
| -------------------- | --------- | ----------------------------------- |
| `id`                 | `text`    | Unique short code (primary key)     |
| `url`                | `text`    | Original long URL                   |
| `created_ip_address` | `text`    | IP address that created the URL     |
| `clicks`             | `integer` | Number of times the URL was clicked |


## 🧰 Tech Stack
| Frontend    | Backend    | Database | Other Libraries                           |
| ----------- | ---------- | -------- | ----------------------------------------- |
| React, Vite | Express.js | Supabase | Zod, NanoID, Toastify, SweetAlert, QRCode |

## ⚠️ Rate Limiting

To prevent abuse, the `/shorten` endpoint is limited to 5 requests per minute per IP address.