import { Link } from 'react-router-dom';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

type PropType = {
  page: number;
  filteredRoomCount: number;
  itemsPerPage: number;
};
const PaginationComp = ({
  page,
  filteredRoomCount,
  itemsPerPage
}: PropType) => {
  const numOfPages = Math.round(filteredRoomCount / itemsPerPage);

  return (
    <Pagination
      page={page}
      count={numOfPages}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/rooms${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};

export default PaginationComp;
