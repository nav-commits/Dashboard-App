# Dashboard App

A modern, responsive dashboard for tracking customers and business data, built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.  
Designed for a clean UI, reusable components, and a scalable structure.  

<img width="1301" height="1081" alt="Dashboard Screenshot" src="https://github.com/user-attachments/assets/5fc3978f-50b8-4556-8d82-18f8854bbe46" />

---

## 🎨 Design Reference
The UI was designed and prototyped in Figma, then implemented using React and Tailwind CSS:  
[Figma Dashboard Design](https://www.figma.com/design/YoguCoCEfaYxg2cowvsqRu/CRM-Dashboard-Customers-List--Community-?node-id=0-1&p=f&t=nn51D6QSoKVj8xBN-0)

---

## 🚀 Features
- 📊 Dashboard layout with sidebar navigation  
- 👥 Customers page with responsive data cards and table  
- 🧩 Reusable UI components (cards, layout, sidebar)  
- 📱 Fully responsive design for mobile and desktop  
- ⚡ Built using **Next.js App Router**  
- 🎨 Styled with **Tailwind CSS**  
- ☁️ Data is stored in **Firestore** for a cloud-backed backend  
- 🖼️ Supports static assets and images  

---

## 🛠️ Tech Stack
- **Next.js 16**  
- **React 19**  
- **TypeScript**  
- **Tailwind CSS**  
- **Firestore** (Firebase) for backend data storage  
- **ESLint** for code quality  
- **clsx** for conditional class handling  

---

## 💻 Getting Started

### Prerequisites
- Node.js >= 20.x  
- npm >= 10.x (or Yarn)  
- Firebase project with Firestore enabled  

### Installation
```bash
git clone https://github.com/nav-commits/Dashboard-App.git
cd Dashboard-App

npm install
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint

/styles             # Tailwind CSS config & global styles

