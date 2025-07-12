import PrivateRoute from "@/Rootpages/PrivateRoute";
import DynamicForm from "@/Pages/DynamicForm";
export default function Dashboard() {
  return (
    <PrivateRoute>
      <div className=" min-h-screen">
        <DynamicForm />
      </div>
    </PrivateRoute>
  );
}
