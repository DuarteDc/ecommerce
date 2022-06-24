import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Pagination = ({ page, count, handelClickPage }) => {


  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        onChange={handelClickPage}
        size="large"
      />
    </Stack>
  );
};

export default Pagination;
