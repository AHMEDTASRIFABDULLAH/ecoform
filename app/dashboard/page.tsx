import DynamicForm from "@/Pages/DynamicForm";
import PrivateRoute from "@/Rootpages/PrivateRoute";

import React from "react";

export default function Dashboard() {
  return (
    <>
      <PrivateRoute>
        <DynamicForm />
      </PrivateRoute>
    </>
  );
}
