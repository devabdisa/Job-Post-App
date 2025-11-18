---

# Build a Job Board App with Next.js & Prisma

<div align="center">
  <br />
  <div>
    <img src="https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/-React_Hooks-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Hooks" />
    <img src="https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  </div>
  <h3 align="center">Job Board App with Next.js, Prisma, PostgreSQL, and TailwindCSS</h3>
  <br />
</div>

## ⚙️ Tech Stack

* **Next.js 15** – For building the React fullstack app with server components
* **Prisma** – For database ORM and relations
* **PostgreSQL** – As the relational database
* **TailwindCSS** – For styling with utility-first CSS
* **React Hooks** – For managing client-side state & interactivity
* **TypeScript** – Type safety and tooling
* **NextAuth** or custom session handling – For user authentication (depending on your implementation)

---

## ⚡️ Features

* 📝 **Post Job Offers**
  Authenticated users can post new job offers with title, description, type, and location.

* 🔍 **Advanced Search**
  Filter jobs by **keyword**, **type** (Full-time, Part-time, Contract), and **location** — all with Prisma query filters.

* 👤 **User Dashboard**
  Users can view their posted jobs and see how many applicants each job has received.

* ✅ **Job Applications**
  Users can apply for any job. The dashboard lists all applications with statuses.

* 🔄 **Dynamic Routes & Pages**
  Each job has its own dynamic detail page with full information and "Apply" button.

* 🔐 **Authentication & Authorization**
  Users must be signed in to post jobs or apply for them.

---

## 👌 Quick Start

### Prerequisites

* [Node.js](https://nodejs.org/)
* [PostgreSQL Database](https://www.postgresql.org/)
* [Prisma CLI](https://www.prisma.io/docs/getting-started)
* [Next.js](https://nextjs.org/)

### Clone and Run

```bash
git clone https://github.com/yourusername/job-board-next-prisma.git
cd job-board-next-prisma
npm install

# Configure your database in .env
npx prisma generate
npx prisma migrate dev

npm run dev
```

Your app will be available at: [http://localhost:3000](http://localhost:3000)

---

