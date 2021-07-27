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

import Layout from '../components/Layout';

const heading = [
  'Booking ID',
  'Booking Date',
  'Check In Date',
  'Check Out Date',
  'Amount'
];

const BookingHistoryPage = () => {
  return (
    <Layout>
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
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Layout>
  );
};

export default BookingHistoryPage;
