import EnrollmentForm from "@/app/components/enrollment/EnrollmentForm";
import { TeacherForm } from "@/app/components/teacher/TeacherForm";
import React from "react";

export default function CreateTeacher() {
  return (
    <div className="p-5">
      <TeacherForm />
    </div>
  );
}
