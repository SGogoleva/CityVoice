import { useAppDispatch } from "../../store/hooks";
import { setSortBy, setSortOrder } from "../../store/slices/project.slice";

const SortProjects = () => {
  const dispatch = useAppDispatch();
  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sortRule = event.target.value.split(",");
    dispatch(setSortOrder(sortRule[1]));
    dispatch(setSortBy(sortRule[0]));
  };
  return (
    <div className="sort-options">
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" onChange={handleSortOrderChange}>
        <option value="">None</option>
        <option value="dateCreated,asc">Oldest</option>
        <option value="dateCreated,desc">Newest</option>
        <option value="pollPrice,asc">Price low to high</option>
        <option value="pollPrice,desc">Price high to low</option>
      </select>
    </div>
  );
};
export default SortProjects;
