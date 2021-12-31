import React, { useState, useEffect } from 'react';
import Box from 'react/material/Box';
import Collapse from 'react/material/Collapse';
import IconButton from 'react/material/IconButton';
import Table from 'react/material/Table';
import TableBody from 'react/material/TableBody';
import TableCell from 'react/material/TableCell';
import TableContainer from 'react/material/TableContainer';
import TableHead from 'react/material/TableHead';
import TableRow from 'react/material/TableRow';
import TablePagination from 'react/material/TablePagination';
import Typography from 'react/material/Typography';
import Paper from 'react/material/Paper';
import KeyboardArrowDownIcon from 'react/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from 'react/icons-material/KeyboardArrowUp';

import { Delete, DisabledByDefault, Edit } from 'react/icons-material';
import { Tooltip } from 'react/material';


const camelCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const Row = (props) => {
  const { product, onAction } = props;
  const [open, setOpen] = React.useState(false);

  const onActionClicked = (type, product) => {
    onAction && onAction({ type, product });
  };


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >

            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        </TableCell>
        <TableCell align="center">{product.id}</TableCell>
        <TableCell align="center">{product.productName}</TableCell>
        <TableCell align="center">{product.productCost}</TableCell>
        <TableCell align="center">{product.productStatus}</TableCell>
        <TableCell align="center">{product.productModified}</TableCell>
        <TableCell align="center">
        <Tooltip title="Delete">
            
        <IconButton
            color="error"
              onClick={() => {
              onActionClicked('delete', product);
              }}
            >
            <Delete/>
          </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => {
                onActionClicked('edit', product);
              }}

            >
          <Edit />
          </IconButton>
          </Tooltip>

          <Tooltip
            title={
              product.productStatus.toString().toLowerCase() === 'active'
                ? 'Inactive'
                : 'Active'
            }
          >
            <IconButton
              color="warning"
              onClick={() => {
                onActionClicked('status', product);
              }}
            >
            <DisabledByDefault />
            </IconButton>
            </Tooltip>
            </TableCell>
            </TableRow>
            <TableRow>
        
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{
              backgroundColor: '#efffff',
              borderRadius: 5,
              border: '1px solid #aaa',
              margin: 1,
              padding: 1,
            }}
          >

            <Box sx={{ margin: 1 }}>
              <Typography variant="h7" gutterBottom component="div">
                Product Description
                
                <Typography
                  gutterBottom
                  component="div"
                  sx={{ color: '#999', fontSize: 14 }}
                >

                  {product.productDesc}
              </Typography>
              </Typography>
              
              <Typography variant="h7" gutterBottom component="div" mt={3}>
                Product Filters
              </Typography>
              
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#333' }}>
                    {product['filters'].map((filter, index) => (
                      // filter title (type)
                  <TableCell key={index} sx={{ color: 'white' }}>
                        {camelCase(filter[0])}
                      </TableCell>
                    ))}

                </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow sx={{ backgroundColor: '#eee' }}>
                    {product['filters'].map((filter, index) => (
                      // filter variant
                      <TableCell key={index}>{camelCase(filter[1])}</TableCell>
                    ))}

                </TableRow>
                </TableBody>
                </Table>
              
              <Typography variant="h7" gutterBottom component="div" mt={3}>
                Product Inventory
                <Typography
                  gutterBottom
                  component="div"
                  sx={{ color: '#999', fontSize: 14 }}
                >

                  {product.productInventory}
                </Typography>
                </Typography>
                </Box>
                </Collapse>
                </TableCell>
                </TableRow>
    </React.Fragment>
  );
};

const ProductTable = (props) => {
const { data, onProductAction } = props;

  // DATA
  const [products, setProduts] = useState([]);
  useEffect(() => {
    
    let rows = [];

    data.forEach((product) => {
      let info = {};
      let filters = [];
      
      for (const [key, value] of Object.entries(product)) {
        switch (key) {
          case 'productFilters':
            for (const [, variant] of Object.entries(value)) {
              filters.push([variant['filterType'], variant['filterVariant']]);
            }
            break;

          default:
            info[key] = value;
            break;
        }
      }

      // add the filters 
      info['filters'] = filters.sort((a, b) => (a > b ? 1 : -1));

      // add this info row to 'Rows'
      rows.push(info);
    });

    setProduts(rows);
  }, [data]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // CALLBACK
  const onAction = (props) => {
    onProductAction && onProductAction(props);
  };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Product ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Cost</TableCell>
              <TableCell align="center">Statue</TableCell>
              <TableCell align="center">Modified</TableCell>
          
          </TableRow>
          </TableHead>

          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
                  <Row key={product.id} product={product} onAction={onAction} />
                );
              })}

      </TableBody>
      </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
