"use client";
import { logout } from "@/app/lib/actions";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = ({ user }: { user: any }) => {
  const [open, setOpen] = useState(true);
  const handlerOpen = () => {
    setOpen(!open);
  };
  return (
    <div
      className={`flex ${
        open ? "w-60" : "max-w-16"
      } bg-[#222d32] h-full relative transition-all text-white`}
    >
      <ul
        className={`menu w-full rounded-box gap-2 ${
          open ? "block" : "hidden"
        } text-white`}
      >
        <li className="w-full">
          <div>
            <h2 className="text-center text-xl">{user.username}</h2>
          </div>
        </li>
        {user.rol === "Administrador" && (
          <>
             <li>
              <details>
                <summary>Estudiantes</summary>
                <ul>
                  <li>
                    <Link href={"/dashboard/alumnos"}>
                      Lista de estudiantes
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Pagos</summary>
                <ul>
                  <li>
                    <Link href={"/dashboard/pagos"}>Lista de pagos</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Usuarios</summary>
                <ul>
                  <li>
                    <Link href={"/dashboard/usuarios"}>Lista de usuarios</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary className="after:hidden">
                  <Link href={"/dashboard/cursos"}>Cursos</Link>
                </summary>
              </details>
            </li>
            <li>
              <details>
                <summary className="after:hidden">
                  <Link href={"/dashboard/materias"}>Materias</Link>
                </summary>
              </details>
            </li>
            <li>
              <details>
                <summary className="after:hidden">
                  <Link href={"/dashboard/inscripciones"}>Inscripciones</Link>
                </summary>
              </details>
            </li>
            <li>
              <details>
                <summary className="after:hidden">
                  <Link href={"/dashboard/reportes"}>Reportes</Link>
                </summary>
              </details>
            </li>
          </>
        )}
        {user.rol === "Secretario" && (
          <>
            <li>
              <details>
                <summary>Estudiantes</summary>
                <ul>
                  <li>
                    <Link href={"/dashboard/alumnos"}>
                      Lista de estudiantes
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary className="after:hidden">
                  <Link href={"/dashboard/cursos"}>Cursos</Link>
                </summary>
              </details>
            </li>
            <li>
              <details>
                <summary className="after:hidden">
                  <Link href={"/dashboard/inscripciones"}>Inscripciones</Link>
                </summary>
              </details>
            </li>
            <li>
              <details>
                <summary className="after:hidden">
                  <Link href={"/dashboard/reportes"}>Reportes</Link>
                </summary>
              </details>
            </li>
          </>
        )}
        {user.rol === "Estudiante" && (
          <>
            <li>
              <details>
                <summary className="after:hidden">
                  <Link href={"/dashboard/cursos"}>Cursos</Link>
                </summary>
              </details>
            </li>
            <li>
              <details>
                <summary className="after:hidden">
                  <Link href={"/dashboard/inscripciones"}>Inscripciones</Link>
                </summary>
              </details>
            </li>
          </>
        )}
      </ul>
      {/* <ul
        className={`menu w-full rounded-box gap-2 ${
          open ? "hidden" : "block"
        } text-black`}
      >
        <div className="flex items-center justify-start gap-4 py-5 w-full">
          <div className="avatar placeholder w-full">
            <div className="bg-neutral text-neutral-content rounded-full w-full">
              <span className="text-xl">{user.username.slice(0, 1)}</span>
            </div>
          </div>
        </div>
        <li className="dropdown dropdown-hover dropdown-right w-full">
          <button
            tabIndex={0}
            className="btn w-full bg-transparent rounded-full p-0 border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 640 512"
            >
              <path
                fill="#ffffff"
                d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52"
          >
            <li className="rounded-md bg-[#009688] text-black">
              <a>Usuarios</a>
            </li>
            <li>
              <Link href={"/dashboard/usuarios"}>Lista de usuarios</Link>
            </li>
          </ul>
        </li>
        <li className="dropdown dropdown-hover dropdown-right w-full">
          <button
            tabIndex={0}
            className="btn w-full bg-transparent rounded-full p-0 border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4l.11-.94L5 5.5L12 2l7 3.5v5h-1V6l-2.11 1.06zm-4 6c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52"
          >
            <li className="rounded-md bg-[#009688] text-black">
              <a>Estudiantes</a>
            </li>
            <li>
              <Link href={"/dashboard/alumnos"}>Lista de estudiantes</Link>
            </li>
          </ul>
        </li>
    
        <li className="dropdown dropdown-hover dropdown-right w-full">
          <button
            tabIndex={0}
            className="btn w-full bg-transparent rounded-full p-0 border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                fill="#ffffff"
                d="M14.222.03c-1.812 1.753-3.604 3.49-3.604 3.49l.644 1.31c.873-.864 1.75-1.625 2.587-2.472c1.762 3.869 2.963 6.987 4.44 11.109c.483 1.339.384 1.399-.771 2.122c-1.857.923-2.445 1.53-4.658 3.884h1.515c1.85-1.673 2.536-2.263 4.853-3.484c.82-.473.932-1.07.596-2C18.74 10.977 16.39 4.484 14.222.03"
              />
              <path
                fill="#ffffff"
                d="M9.498.071C8.172.966 7.149 2.254 5.996 3.358l.473 1.508c.903-.71 1.688-1.569 2.5-2.38l4.376 10.977c.252.743-.145 1.405-.944 2.125c-.956.769-2.925 2.56-3.818 3.926h1.358c1.426-1.464 1.683-1.663 3.306-3.068c1.09-1.112 2.074-1.681 1.56-3.106z"
              />
              <path
                fill="#ffffff"
                d="M5.023 0C4.67.12 4.376.347 4.1.588a880 880 0 0 0-3.889 3.75c-.196.182-.213.45-.21.718L.017 6.57S1.743 4.892 4.32 2.41c1.39 3.615 2.837 7.21 4.263 10.813c.195.544-.272.99-.864 1.585c-.818.798-2.53 2.44-4.281 4.635h1.756l4.22-4.629c.402-.552.9-1.091.69-1.591L5.024 0Z"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52"
          >
            <li className="rounded-md bg-[#009688] text-black">
              <Link href={"/dashboard/materias"}>Materias</Link>
            </li>
          </ul>
        </li>
        <li className="dropdown dropdown-hover dropdown-right w-full">
          <button
            tabIndex={0}
            className="btn w-full bg-transparent rounded-full p-0 border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 100 100"
            >
              <path
                fill="none"
                d="M32.092 55.916h14.575c1.087 0 2.563 2.496 4.734 4.039v-1.776s-.07-1.053.348-1.69c.424-.639 1.308-.809 1.584-.809h14.575s4.401-.74 9.294-3.044l-53.794.514c4.642 2.082 8.684 2.766 8.684 2.766"
              />
              <path
                fill="#ffffff"
                d="M16.868 55.111a24.875 24.875 0 0 1-1.061-.855c.247.396.609.703 1.061.855m2.67-39.55h60.708v35.516c2.128-1.18 3.271-1.984 4.054-2.499v-35.05a2.03 2.03 0 0 0-2.03-2.028H17.508c-1.123 0-2.033.91-2.033 2.028v35.14c.771.486 1.878 1.301 4.063 2.52z"
              />
              <path
                fill="#ffffff"
                d="M87.791 47.978c-.523-.417-1.247-.415-2.396 0c-.335.122-.674.325-1.095.6c-.783.515-1.925 1.319-4.054 2.499c-.657.36-1.373.748-2.241 1.183c-.272.136-.534.247-.803.377c-4.893 2.304-9.294 3.044-9.294 3.044H53.333c-.276 0-1.16.17-1.584.809c-.418.638-.348 1.69-.348 1.69v1.776c.526.373 1.082.707 1.695.918c4.394 1.498 7.367.192 8.664-1.628c1.517-2.134 2.289-3.329 3.955-2.705c1.666.624 0 4.68-2.08 6.763c-2.085 2.084-4.584 3.749-8.12 3.749c-1.486 0-2.926-.223-4.114-.476v15.131c0 4.27 4.538 6.552 7.658 6.552c3.119 0 9.367-1.768 12.387-9.263c3.017-7.493-.205-17.381-.205-17.381s4.888-2.191 9.991-5.414c5.098-3.225 6.455-6.246 6.559-6.67c.1-.427.516-1.136 0-1.554"
              />
              <path
                fill="#ffffff"
                d="M63.635 63.303c2.08-2.083 3.746-6.139 2.08-6.763c-1.666-.624-2.438.571-3.955 2.705c-1.297 1.82-4.27 3.126-8.664 1.628c-.613-.211-1.169-.545-1.695-.918c-2.17-1.543-3.647-4.039-4.734-4.039H32.092s-4.043-.684-8.684-2.766c-.466-.21-.935-.418-1.411-.657a59.295 59.295 0 0 1-2.459-1.306c-2.185-1.219-3.292-2.033-4.063-2.52c-.321-.203-.593-.355-.871-.455c-1.144-.416-1.873-.416-2.394 0c-.518.418-.104 1.128 0 1.553c.08.325.913 2.184 3.596 4.49a26.416 26.416 0 0 0 2.963 2.181c5.098 3.227 9.991 5.412 9.991 5.412s-3.227 9.886-.205 17.381c3.018 7.494 9.263 9.27 12.385 9.27c3.123 0 7.661-2.297 7.661-6.564V65.804s1.152.42 2.799.771c1.188.253 2.628.476 4.114.476c3.537.001 6.036-1.664 8.121-3.748m-2.618-28.922a9.059 9.059 0 0 0-9.058 9.057c0 4.999 4.055 9.056 9.058 9.056c4.998 0 9.052-4.057 9.052-9.056c0-5-4.054-9.057-9.052-9.057"
              />
              <path
                fill="#ffffff"
                d="M39.544 34.381c-5 0-9.053 4.057-9.053 9.057c0 4.999 4.052 9.056 9.053 9.056c5.003 0 9.058-4.057 9.058-9.056c0-5-4.055-9.057-9.058-9.057"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52"
          >
            <li className="rounded-md bg-[#009688] text-black">
              <Link href={"/dashboard/cursos"}>Cursos</Link>
            </li>
          </ul>
        </li>
        <li className="dropdown dropdown-hover dropdown-right w-full">
          <button
            tabIndex={0}
            className="btn w-full bg-transparent rounded-full p-0 border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                d="M6 20q-.825 0-1.412-.587T4 18q0-.825.588-1.412T6 16q.825 0 1.413.588T8 18q0 .825-.587 1.413T6 20m0-6q-.825 0-1.412-.587T4 12q0-.825.588-1.412T6 10q.825 0 1.413.588T8 12q0 .825-.587 1.413T6 14m0-6q-.825 0-1.412-.587T4 6q0-.825.588-1.412T6 4q.825 0 1.413.588T8 6q0 .825-.587 1.413T6 8m6 0q-.825 0-1.412-.587T10 6q0-.825.588-1.412T12 4q.825 0 1.413.588T14 6q0 .825-.587 1.413T12 8m6 0q-.825 0-1.412-.587T16 6q0-.825.588-1.412T18 4q.825 0 1.413.588T20 6q0 .825-.587 1.413T18 8m-6 6q-.825 0-1.412-.587T10 12q0-.825.588-1.412T12 10q.825 0 1.413.588T14 12q0 .825-.587 1.413T12 14m1 6v-3.075l6.575-6.55l3.075 3.05L16.075 20zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52"
          >
            <li className="rounded-md bg-[#009688] text-black">
              <Link href={"/dashboard/inscripciones"}>Inscripciones</Link>
            </li>
          </ul>
        </li>
        <li className="dropdown dropdown-hover dropdown-right w-full">
          <button
            tabIndex={0}
            className="btn w-full bg-transparent rounded-full p-0 border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-7.08-7.69c-.24-.77-.77-3.23.63-3.27c1.4-.04.48 3.12.48 3.12c.39 1.49 2.02 2.56 2.02 2.56c.5-.15 3.35-.48 2.95 1c-.43 1.48-3.5.09-3.5.09c-1.95.14-3.41.66-3.41.66c-1.13 2.11-2.45 3.03-2.99 2.14c-.67-1.11 2.13-2.54 2.13-2.54c1.45-2.35 1.67-3.72 1.69-3.76m.65.84c-.4 1.3-1.2 2.69-1.2 2.69c.85-.34 2.71-.73 2.71-.73c-1.14-1-1.49-1.95-1.51-1.96m3.14 2.17s1.75.65 1.79.39c.07-.27-1.33-.51-1.79-.39m-5.66 1.49c-.77.3-1.51 1.58-1.33 1.58c.18.01.91-.6 1.33-1.58m2.52-5.55c0-.05.43-1.68 0-1.73c-.3-.03-.01 1.69 0 1.73z"
                fill="#ffffff"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52"
          >
            <li className="rounded-md bg-[#009688] text-black">
              <Link href={"/dashboard/reportes"}>Reportes</Link>
            </li>
          </ul>
        </li>
      </ul>
      <button
        className="btn absolute bottom-3 left-3 p-2"
        onClick={handlerOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <path
            fill="#ffffff"
            d="M28 4H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 22H12V6h16Z"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default Sidebar;
