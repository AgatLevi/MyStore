import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Box, Button, Skeleton } from 'react/material';
import { Close, Create } from 'react/icons-material';

import FilterAdd from '../components/FilterAdd';
import ProductAdd from '../components/ProductAdd';
import ProductTable from '../components/ProductTable';


import Theme from '../../constants/Theme';


const Dashboard = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const products = useSelector((state) => state.products);


  // PRODUCTS

  // create button
  const [productButton, setProductButton] = useState(false);
  const createProductClicked = () => {
    setProductButton(!productButton);
  };

  // API 
  const onCreateProduct = (product) => {
  
    dispatch(createProduct(product));
  };


  // TABLE 
  const onProductAction = (props) => {
    const { type, product } = props;
    switch (type.toString().toLowerCase()) {
      case 'delete':
        
  // delete
      dispatch(deleteProduct(product.id));
        break;
      case 'edit':
        
  // edit
        break;
      case 'status':
        
  // status
        let prod = { ...product };
        prod['productStatus'] =
          prod['productStatus'].toString().toLowerCase() === 'active'
            ? 'inactive'
            : 'active';
        dispatch(patchProduct(prod));

        break;

      default:
        break;
    }
  };


  // WAIT FOR CHANGES
  useEffect(() => {
    setProductButton(false);
  }, [products]);



  //MOUNT
  useEffect(() => {
    dispatch(getFilters());
    dispatch(getProducts());
  }, []);



    // FILTERS
  // create button
  const [filterButton, setFilterButton] = useState(false);
  const createFilterClicked = () => {
    setFilterButton(!filterButton);
  };

  //  api
  const onCreateFilter = (filter) => {
    dispatch(createFilter(filter));
  };

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} justifyContent={'center'}>
          <span style={styles.title}>Filters</span>
        </Grid>
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          {filterButton ? (
            <Button
              variant="contained"
              color="error"
              onClick={createFilterClicked}
              startIcon={<Close />}
            >
              Close
            </Button>
          ) : (

            <Button
              variant="contained"
              onClick={createFilterClicked}
              startIcon={<Create />}
            >
              Create new Filter
            </Button>
          )}

        </Grid>
        {filterButton && (
          <Grid item xs={12}>
            <FilterAdd
              filters={filters}
              onCreateFilter={onCreateFilter}
              alert={filters.alert}
            />
          </Grid>
        )}
      </Grid>

      <Grid container spacing={2} padding={2} mt={5}>
      <Grid item xs={12} justifyContent={'center'}>
          
        <span style={styles.title}>Product</span>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            {productButton ? (
              <Button
                variant="contained"
                color="error"
                onClick={createProductClicked}
                startIcon={<Close />}
              >
                Close
              </Button>
            ) : (

              <Button
                variant="contained"
                onClick={createProductClicked}
                startIcon={<Create />}
              >
                Create new Product
              </Button>
            )}
          </Grid>
        </Grid>

        {productButton && (
          <Grid item xs={12}>
            <ProductAdd
              filters={filters}
              onCreateProduct={onCreateProduct}
              alert={products.alert}
            />
          </Grid>
        )}
      </Grid>

      <Grid container spacing={2} padding={2} mt={5}>
        <Grid item xs={12} justifyContent={'center'}>
          <span style={styles.title}>Products List</span>
        </Grid>

        {products.productsList.length > 0 ? (
          <Grid item xs={12}>
            <ProductTable
              data={products.productsList}
              onProductAction={onProductAction}
            />
          </Grid>
        ) : (

          <Grid item xs={12} justifyContent={'center'}>
            {products.loading === 'loading' ? (
              <Grid
                item
                xs={12}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <span style={styles.subtitle}>Loading...</span>
                <Box sx={{ width: 1 / 2 }}>
                  <Skeleton height={50} />
                  <Skeleton height={50} animation="wave" />
                  <Skeleton height={50} animation="wave" />
                </Box>
              </Grid>
            ) : (

              <span style={styles.subtitle}>Products List is empty</span>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    width: '80%',
    padding: 8,
    backgroundColor: 'azure',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: { fontSize: 24, color: Theme.colors.pageTitle },
  subtitle: { fontSize: 18, color: Theme.colors.pageSubTitle },
};
export default Dashboard;
