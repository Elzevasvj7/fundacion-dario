"use client";
import { enrollmentCourse } from "@/app/lib/course/actions";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs"
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner loading-md"></span>}
      Inscribirme
    </button>
  );
};

export const EnrollmentCourse = ({ courseId }: any) => {
  const [state, action] = useFormState(enrollmentCourse, undefined);
  return (
    <form action={() => action({ courseId: courseId })}>
      <SubmmitButton />
    </form>
  );
};
