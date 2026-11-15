
type Props = {
  description: string;
};

export default function TaskDescription({
  description,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800 mb-3">
        Description
      </h2>

      <p className="text-sm text-gray-600 leading-7 whitespace-pre-wrap">
        {description || "No description added."}
      </p>
    </div>
  );
}
