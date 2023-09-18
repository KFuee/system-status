import { Suspense } from "react";

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="line-clamp-4 text-gray-500 text-lg leading-7 font-medium lg:w-1/2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem sunt
          qui consectetur eligendi tempore id laboriosam numquam beatae
          exercitationem, ullam ut adipisci officia nulla fugit voluptas.
          Voluptatibus at consequuntur mollitia?
        </p>
      </div>
    </Suspense>
  );
}
