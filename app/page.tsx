import { Category } from "@/components/home/Category";
import { DialogDemo } from "@/components/home/DialogDemo";
import { AdminLayout } from "./_components/AdminLayout";

export default function Home() {
  return (
    <div>
      <AdminLayout>
        <DialogDemo />
      </AdminLayout>
    </div>
  );
}
