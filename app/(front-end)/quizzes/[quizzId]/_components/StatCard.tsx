"use client";
const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number | undefined;
}) => {
  return (
    <div className="p-5 border rounded-md bg-primary  dark:text-gray-800 text-center text-2xl">
      <h3 className="uppercase text-base text-green-600">{title}</h3>
      <span className="text-gray-500">{value}</span>
    </div>
  );
};

export default StatCard;
