import Sidebar from "../components/dashboard/sidebar"


export default function DashboardLayout({ children }) {

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />
      <main className="flex-1 px-10 py-10">
        {children}
      </main>
    </div>
  );
}
