# 📝 Dynamic Blog Engine

> A lightweight full-stack blogging application built with **Next.js 16**, **Prisma ORM**, and **PostgreSQL** — designed as a backend internship assessment project.

**Author:** Kartik Jagdale | **Version:** 1.0 | **Type:** Backend Internship Assessment

---

## 🧾 Overview

The Dynamic Blog Engine allows administrators to create blog posts through an admin interface while enabling readers to access articles via **SEO-friendly, auto-generated URLs**. The project emphasizes:

- REST API design with Next.js Route Handlers
- Relational database modeling with Prisma ORM
- Automatic slug generation & duplicate handling
- Dynamic routing with server-side rendering
- Clean, responsive UI with Tailwind CSS + shadcn/ui

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4, shadcn/ui, Radix UI |
| **ORM** | Prisma v7 |
| **Database** | PostgreSQL (via `pg` adapter) |
| **Validation** | Zod |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
blog-engine/
│
├── app/
│   ├── api/
│   │   └── posts/
│   │       ├── route.ts            # POST /api/posts
│   │       └── [slug]/
│   │           └── route.ts        # GET /api/posts/[slug]
│   │
│   ├── blog/
│   │   ├── create/
│   │   │   └── page.tsx            # Admin: create a new blog post
│   │   └── [slug]/
│   │       └── page.tsx            # Public: dynamic blog reader page
│   │
│   └── layout.tsx
│
├── components/
│   ├── BlogCard.tsx
│   └── BlogForm.tsx
│
├── lib/
│   ├── prisma.ts                   # Prisma client singleton
│   └── slug.ts                     # Slug generation utility
│
├── prisma/
│   └── schema.prisma               # Database schema
│
├── PRD.md
└── package.json
```

---

## 🗄️ Database Schema

### `Post` Table

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Primary Key |
| `title` | String | Blog title |
| `slug` | String (unique) | Auto-generated SEO URL |
| `image` | String | Cover image URL |
| `description` | String | Blog content |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last updated timestamp |

---

## 🔌 API Reference

### Create a Blog Post

```http
POST /api/posts
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Learning Prisma",
  "image": "https://example.com/image.png",
  "description": "An introduction to Prisma ORM..."
}
```

**Responses:**

| Status | Meaning |
|---|---|
| `201 Created` | Post created successfully |
| `400 Bad Request` | Missing or invalid fields |
| `409 Conflict` | Duplicate slug detected |
| `500 Internal Server Error` | Unexpected failure |

---

### Get a Blog Post

```http
GET /api/posts/[slug]
```

**Success Response (`200`):**
```json
{
  "title": "Learning Prisma",
  "image": "https://example.com/image.png",
  "description": "An introduction to Prisma ORM..."
}
```

**Not Found Response (`404`):**
```json
{
  "message": "Post not found"
}
```

---

## 🔤 Slug Generation

Slugs are automatically generated from the blog title:

```
"Learning Next.js!" → "learning-nextjs"
```

**Rules:**
1. Convert to lowercase
2. Remove special characters
3. Replace spaces with hyphens
4. Remove duplicate hyphens
5. Append a numeric suffix if slug already exists (e.g., `my-post-2`)

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18+
- **PostgreSQL** database (local or hosted, e.g. Neon, Supabase)
- **npm** or **pnpm**

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd blog-engine
```

### 2. Install Dependencies

```bash
npm install
```

> The `postinstall` script automatically runs `prisma generate` after install.

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

> For local development you can use SQLite by changing the `provider` in `prisma/schema.prisma` to `sqlite` and updating `DATABASE_URL` to `"file:./dev.db"`.

### 4. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client + build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🧪 Manual Testing

### Create a Post (via curl)
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","image":"https://picsum.photos/800/400","description":"Hello world!"}'
```

### Read a Post
```
http://localhost:3000/blog/my-first-post
```

---

## 🏗️ Architecture

```
         Browser
             │
             ▼
   Next.js App Router
             │
   ┌─────────┴─────────┐
   │                   │
   ▼                   ▼
Admin Pages     Dynamic Blog Pages
   │                   │
   └─────────┬─────────┘
             ▼
      API Route Handlers
             │
             ▼
         Prisma ORM
             │
             ▼
          PostgreSQL
```

---

## 🔮 Future Improvements

- [ ] User Authentication
- [ ] Rich Markdown Editor
- [ ] Image Uploads (S3 / Cloudinary)
- [ ] Categories & Tags
- [ ] Search & Pagination
- [ ] Comments & Likes
- [ ] Admin Dashboard
- [ ] Draft Posts
- [ ] SEO Metadata
- [ ] Dark Mode
- [ ] Analytics

---

## 📄 License

This project is for internship assessment purposes only.
