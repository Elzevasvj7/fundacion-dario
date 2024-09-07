import React from "react";
import Sidebar from "./components/Sidebar";
import { getSession, logout } from "../lib/actions";
import Link from "next/link";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default async function DashboardLayaout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <Layout style={{minHeight: '100vh'}}>
      <header className="w-full z-[1030] flex items-center">
        <div className="navbar h-full min-h-full bg-red-500">
          <div className="flex-1">
            <a className="btn btn-ghost text-white text-xl">EL COMPA</a>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="w-10 rounded-full flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="#ffffff"
                        d="M16 14a5 5 0 0 1 4.995 4.783L21 19v1a2 2 0 0 1-1.85 1.995L19 22H5a2 2 0 0 1-1.995-1.85L3 20v-1a5 5 0 0 1 4.783-4.995L8 14zM12 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-100 text-black rounded-box w-52"
              >
                <li>
                  <Link
                    href={`/dashboard/${session.username}`}
                    className="justify-between"
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <form action={logout}>
                    <button type="submit">Cerrar sesion</button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <Layout>
        <Sidebar user={session} />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
