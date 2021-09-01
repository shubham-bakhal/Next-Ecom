import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React, { useContext } from 'react';
import NextLink from 'next/link';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';

export default function Fav() {
  const { state, dispatch } = useContext(Store);
  const favItems = state.fav.favItems;

  const classes = useStyles();
  const router = useRouter();
  const addToCartHandler = async product => {
    const existItem = state.cart.cartItems.find(x => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  const FavHandler = async product => {
    const existItem = state.fav.favItems.filter(x => x._id === product._id);
    if (existItem.length > 0) {
  
      dispatch({ type: 'FAV_REMOVE_ITEM', payload: { ...product } });
    } else {
   
      dispatch({ type: 'FAV_ADD_ITEM', payload: { ...product } });
    }
  };
  return (
    <Layout>
    <Grid className={classes.section} container spacing={3}>
      {favItems.map(product => (
        <Grid item md={4} key={product.name}>
          <Card>
            <NextLink href={`/product/${product.slug}`} passHref>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={product.image}
                  title={product.name}
                ></CardMedia>
                <CardContent>
                  <Typography>{product.name}</Typography>
                </CardContent>
              </CardActionArea>
            </NextLink>
            <CardActions>
              <Typography>${product.price}</Typography>
              <Button
                onClick={() => addToCartHandler(product)}
                size="small"
                color="primary"
              >
                Add to cart
              </Button>
              <Button onClick={() => FavHandler(product)} size="small">
                {state.fav.favItems.filter(item => item._id === product._id)
                  .length > 0 ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Layout>
  );
}
