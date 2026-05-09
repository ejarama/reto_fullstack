import { Outlet } from 'react-router-dom';
import NavBar from '../organisms/NavBar/NavBar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-blackand-bg text-blackand-text-primary selection:bg-white selection:text-black">
      <NavBar />
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
