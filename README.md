# 🎓 SkillMentor – Mentorship Booking Platform

SkillMentor is a full-stack web application that enables students to discover classrooms, view available mentors, and schedule 1-on-1 mentorship sessions with proof of payment. Admins can review, approve, and track bookings.

---

## 🌐 Live Demo

- 🔗 **Frontend (React + Vite):** [https://skill-mentor-client.vercel.app](https://skill-mentor-client.vercel.app)
- 🔗 **Backend (Spring Boot):** [https://skill-mentor-q08r.onrender.com](https://skill-mentor-q08r.onrender.com)



## 🚀 Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Clerk Authentication](https://clerk.dev/)

### Backend
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Java 17](https://openjdk.org/projects/jdk/17/)
- [JPA (Hibernate)](https://spring.io/projects/spring-data-jpa)
- [MySQL](https://www.mysql.com/)
- RESTful API design

---

## 🆓 100% Free Hosting Setup

| Component  | Platform      | Notes                        |
|------------|---------------|------------------------------|
| **Frontend**  | [Vercel](https://vercel.com)        | Free static site hosting for React |
| **Backend**   | [Render](https://render.com)        | Free tier for Spring Boot APIs     |
| **Auth**      | [Clerk](https://clerk.com)          | Free authentication & user management |

---

## 📦 How to Run Locally

### Prerequisites
- Node.js v18+
- Java 17
- MySQL or PlanetScale DB
- Clerk API Keys

### Clone the Repositories

```bash
git clone https://github.com/your-username/skillmentor.git

cd skillmentor/server
# Make sure to set application.properties with your DB and Clerk secrets
./mvnw spring-boot:run

cd skillmentor/client
npm install
npm run dev


