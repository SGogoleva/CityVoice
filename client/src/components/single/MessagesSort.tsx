import { useAppDispatch } from "../../store/hooks";
import { setSortBy, setSortOrder } from "../../store/slices/message.slice";

const SortMessages = () => {
  const dispatch = useAppDispatch();

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sortRule = event.target.value.split(",");
    dispatch(setSortOrder(sortRule[1] as "asc" | "desc"));
    dispatch(setSortBy(sortRule[0]));
  };

  return (
    <div className="sort-options items-center">
      <label htmlFor="sort" className="mb-1 mr-4 text-sm font-semibold text-gray-700">Sort by: </label>
      <select id="sort" onChange={handleSortOrderChange} className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]">
        <option value="">None</option>
        <option value="dateCreated,asc">Oldest</option>
        <option value="dateCreated,desc">Newest</option>
        <option value="status,asc">Status ascending</option>
        <option value="status,desc">Status descending</option>
      </select>
    </div>
  );
};

export default SortMessages;
