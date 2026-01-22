# 🚀 CRM Dashboard – Customer List App

A modern, responsive dashboard for tracking customers and business data, built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.  
Designed for a clean UI, reusable components, and a scalable structure.

Website url: https://dashly.ca/public

<img width="1301" height="1081" alt="Dashboard Screenshot" src="https://github.com/user-attachments/assets/5fc3978f-50b8-4556-8d82-18f8854bbe46" />

---

## 🎨 Design Reference

The UI was designed and prototyped in **Figma**, then implemented using React and Tailwind CSS.

**Figma Design:**  
https://www.figma.com/design/YoguCoCEfaYxg2cowvsqRu/CRM-Dashboard-Customers-List--Community-

---

## 🚀 Features

- 📊 Dashboard layout with sidebar navigation  
- 👥 Customers page with responsive cards and table layout  
- 🧩 Reusable UI components (layout, sidebar, cards)  
- 📱 Fully responsive for mobile, tablet, and desktop  
- ⚡ Built using **Next.js App Router**  
- 🎨 Utility-first styling with **Tailwind CSS**  
- ☁️ Cloud-backed data storage using **Firebase Firestore**  
- 🔐 **Firebase Authentication** (email/password, ready for role-based access)  
- 🖼️ Optimized image and static asset support  
- 🧪 Mock data generation for development  

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** – App Router, SSR/SSG, optimized builds  
- **React 19** – Component-based UI architecture  
- **TypeScript** – Static typing and improved developer experience  

### Styling & UI
- **Tailwind CSS v4** – Utility-first CSS framework  
- **clsx** – Conditional class name handling  
- **React Icons** – Icon library  

### Backend & Database
- **Firebase Firestore** – NoSQL cloud database  
- **Firebase Authentication** – Secure user authentication  
- **Firebase Admin SDK** – Secure server-side database & auth access  
- **Firebase Client SDK** – Frontend data fetching and auth handling  

### Tooling & Development
- **ESLint** – Linting and code quality  
- **@faker-js/faker** – Mock data generation  
- **PostCSS** – CSS processing for Tailwind  

### Deployment & Hosting
- **Vercel** – Deployment platform  
  - CI/CD integration  
  - Environment variable support  
  - Serverless & Edge Functions  

## 💻 Getting Started

Follow these steps to run the dashboard locally:

```bash
git clone https://github.com/nav-commits/Dashboard-App.git
cd Dashboard-App

npm install
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint



