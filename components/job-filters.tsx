import { filterSchema } from "@/lib/validators";

type Props = {
  initialValues: Record<string, string | undefined>;
};

const jobTypes = [
  { label: "Any type", value: "" },
  { label: "Full-time", value: "FULL_TIME" },
  { label: "Part-time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Freelance", value: "FREELANCE" },
];

export function JobFilters({ initialValues }: Props) {
  const parsed = filterSchema.partial().safeParse(initialValues);
  const filters = parsed.success ? parsed.data : {};

  return (
    <form
      action="/"
      method="GET"
      className="grid w-full gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4"
    >
      <input
        type="text"
        name="keyword"
        placeholder="Search by title or company"
        defaultValue={filters.keyword ?? ""}
        className="rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        defaultValue={filters.location ?? ""}
        className="rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
      />
      <select
        name="type"
        defaultValue={filters.type ?? ""}
        className="rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
      >
        {jobTypes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
      >
        Filter Jobs
      </button>
    </form>
  );
}
