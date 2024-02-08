import ApplyForm from "@/components/apply/ApplyForm";

export const metadata = {
  title: "Apply"
}

export default async function ApplyPage() {
  // await new Promise((resolve) => setTimeout(resolve, 500000));
  return (
    <div className="flex-1 flex justify-center items-center w-full">
      <ApplyForm />
    </div>
  );
}
