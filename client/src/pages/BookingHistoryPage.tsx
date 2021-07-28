import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';

import Layout from '../components/Layout';
import { RootStore } from '../redux/reducers';
import { getBooking } from '../redux/actions';

const heading = [
  'Booking ID',
  'Booking Date',
  'Check In Date',
  'Check Out Date',
  'Amount'
];

const BookingHistoryPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { booking, error, loading } = useSelector(
    (state: RootStore) => state.booking
  );

  useEffect(() => {
    dispatch(getBooking());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color='secondary'>{error}</Typography>;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
      {booking.length && (
        <Container>
          <Typography variant='h6'>My bookings</Typography>
          <Paper>
            <TableContainer>
              <Table stickyHeader aria-label='booking table'>
                <TableHead>
                  <TableRow>
                    {heading.map((item) => (
                      <TableCell key={item}>{item}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {booking.length &&
                    booking
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            key={row._id}
                            hover
                            role='checkbox'
                            tabIndex={-1}
                          >
                            <TableCell>{row._id}</TableCell>
                            <TableCell>
                              {moment(new Date(row.createdAt)).format('LL')}
                            </TableCell>
                            <TableCell>
                              {moment(new Date(row.startDate)).format('LL')}
                            </TableCell>
                            <TableCell>
                              {moment(new Date(row.endDate)).format('LL')}
                            </TableCell>
                            <TableCell>{`€ ${row.amount}`}</TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component='div'
            count={booking.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      )}
    </Layout>
  );
};

export default BookingHistoryPage;
