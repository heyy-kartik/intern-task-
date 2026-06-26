# Product Requirements Document (PRD)

# Dynamic Blog Engine

Version: 1.0

Author: Kartik Jagdale

Project Type: Backend Internship Assessment

---

# 1. Overview

The Dynamic Blog Engine is a lightweight full-stack blogging application designed to demonstrate modern backend development practices using Next.js App Router, Prisma ORM, and PostgreSQL (or SQLite).

The application enables administrators to create blog posts through an administrative interface while allowing readers to access blog articles using SEO-friendly dynamic URLs generated automatically from the blog title.

The project emphasizes backend architecture, REST API design, relational database modeling, dynamic routing, clean UI implementation, and production-ready coding standards.

---

# 2. Problem Statement

Traditional static pages require manually creating routes and pages for every article.

This project solves that problem by allowing content to be created dynamically through an admin interface while automatically generating unique URLs and rendering pages using server-side data.

The application demonstrates how modern content management systems operate internally.

---

# 3. Goals

Primary Goals

- Build a backend using Next.js App Router.
- Design a relational database using Prisma ORM.
- Automatically generate SEO-friendly slugs.
- Create RESTful API endpoints.
- Display blog posts using dynamic routing.
- Build a responsive and modern UI.
- Follow clean architecture and coding practices.

---

# 4. Success Criteria

The project is considered complete when:

✅ Admin can create blog posts.

✅ Blog data is stored in the database.

✅ Slugs are automatically generated.

✅ Duplicate slugs are handled safely.

✅ Blog pages render dynamically.

✅ Invalid blog URLs return a proper 404 response.

✅ Application runs locally with minimal setup.

---

# 5. Target Users

## Administrator

Responsibilities

- Create blog posts
- Upload image URL
- Write blog description
- Publish articles

---

## Reader

Responsibilities

- Visit blog URLs
- Read blog articles
- View images
- Access content using SEO-friendly links

---

# 6. User Stories

## Admin Stories

As an administrator,

I want to create blog posts

So that readers can access them online.

---

As an administrator,

I want slugs to be created automatically

So that I don't manually manage URLs.

---

As an administrator,

I want duplicate slugs handled gracefully

So that database constraints never fail.

---

## Reader Stories

As a reader,

I want to open a blog using its URL

So that I can read its content.

---

As a reader,

I want clean page layouts

So that articles are easy to read.

---

# 7. Functional Requirements

## Blog Creation

The administrator can:

- Enter blog title
- Enter image URL
- Enter description
- Submit the form

System will:

- Validate input
- Generate slug
- Store data
- Return success response

---

## Blog Retrieval

The application should:

- Accept slug parameter
- Query database
- Return blog data
- Render page dynamically

---

## Error Handling

The application should return:

400 Bad Request

Missing fields

---

404 Not Found

Blog does not exist

---

409 Conflict

Duplicate slug detected

---

500 Internal Server Error

Unexpected server failure

---

# 8. Non Functional Requirements

Performance

- Fast page loading
- Efficient indexed queries
- Server-side rendering

---

Reliability

- No duplicate slugs
- Database consistency
- Stable API responses

---

Maintainability

- Modular folder structure
- Reusable components
- Clear code organization

---

Scalability

Architecture should support future additions like:

- Categories
- Authentication
- Comments
- Rich text editor
- Pagination

---

# 9. Tech Stack

Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS

Backend

- Next.js Route Handlers

Database

- PostgreSQL (Prisma ORM)

ORM

- Prisma

Deployment

- Vercel

---

# 10. Project Architecture

```
                Browser
                    │
                    ▼
          Next.js App Router
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
 Admin Pages             Dynamic Blog Pages
        │                       │
        ▼                       ▼
          API Route Handlers
                    │
                    ▼
               Prisma ORM
                    │
                    ▼
              PostgreSQL
```

---

# 11. Folder Structure

```
app/
│
├── api/
│   └── posts/
│        ├── route.ts
│        └── [slug]/
│             route.ts
│
├── blog/
│    ├── create/
│    │      page.tsx
│    │
│    └── [slug]/
│           page.tsx
│
components/
│
├── BlogCard.tsx
├── BlogForm.tsx
│
lib/
│
├── prisma.ts
├── slug.ts
│
prisma/
│
└── schema.prisma
```

---

# 12. Database Design

## Post Table

| Field | Type | Description |
|---------|------|-------------|
| id | UUID | Primary Key |
| title | String | Blog title |
| slug | String | Unique URL |
| image | String | Cover image URL |
| description | String | Blog content |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last updated timestamp |

---

# 13. API Design

## Create Blog

POST

```
/api/posts
```

Request

```json
{
  "title":"Learning Prisma",
  "image":"https://...",
  "description":"..."
}
```

Success

201 Created

```json
{
   "message":"Post Created"
}
```

---

## Get Blog

GET

```
/api/posts/[slug]
```

Success

```json
{
  "title":"",
  "image":"",
  "description":""
}
```

404

```json
{
   "message":"Post not found"
}
```

---

# 14. Slug Generation

Rules

- Convert to lowercase
- Remove special characters
- Replace spaces with hyphen
- Remove duplicate hyphens
- Ensure uniqueness

Example

```
Learning Next.js

↓

learning-nextjs
```

---

# 15. User Flow

## Creating Blog

```
Admin

↓

Fill Form

↓

Submit

↓

Validate

↓

Generate Slug

↓

Save Database

↓

Success Message
```

---

## Reading Blog

```
Reader

↓

Visit URL

↓

Fetch API

↓

Database Lookup

↓

Return Blog

↓

Render Page
```

---

# 16. UI Requirements

## Create Page

Contains

- Title Input
- Image URL Input
- Description Textarea
- Submit Button

Button States

- Idle
- Loading
- Disabled
- Success

---

## Blog Page

Contains

- Featured image
- Blog title
- Publication date
- Description

Layout

Centered

Responsive

Readable typography

---

# 17. Validation Rules

Title

- Required
- Minimum 3 characters

Image

- Required
- Must be a valid URL

Description

- Required

Slug

- Automatically generated

---

# 18. Security Considerations

- Validate all incoming requests
- Prevent duplicate records
- Return proper HTTP status codes
- Sanitize user input
- Handle unexpected exceptions

---

# 19. Future Improvements

- User Authentication
- Rich Markdown Editor
- Image Uploads
- Categories
- Tags
- Search
- Pagination
- Comments
- Likes
- Admin Dashboard
- Draft Posts
- SEO Metadata
- Dark Mode
- Analytics

---

# 20. Acceptance Criteria

The project will be accepted if:

- Prisma schema is implemented correctly.
- Database migrations execute successfully.
- Blog creation API functions properly.
- Dynamic blog retrieval works.
- Slug generation is automatic.
- Duplicate slugs are handled.
- Responsive UI is implemented.
- Proper HTTP status codes are returned.
- README contains setup instructions.
- Project follows clean coding practices.

---

# 21. Assumptions

- Only administrators create blog posts.
- Authentication is out of scope.
- Images are provided using external URLs.
- One blog contains one cover image.
- Database is managed using Prisma ORM.

---

# 22. Out of Scope

The following features are intentionally excluded:

- Login system
- User registration
- Blog editing
- Blog deletion
- Comment system
- Rich text editor
- File uploads
- Notifications
- Email integration
- Search engine
- Categories

---

# 23. Conclusion

The Dynamic Blog Engine demonstrates the core concepts of modern backend development, including RESTful API design, relational database modeling, Prisma ORM integration, dynamic routing, server-side rendering, and responsive frontend development. The architecture is intentionally modular and scalable, making it a strong foundation for extending into a complete content management system in the future.