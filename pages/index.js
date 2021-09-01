import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardActions,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import InputLabel from '@material-ui/core/InputLabel';
import { useContext, useState } from 'react';
import Layout from '../components/Layout';
import Product from '../models/Product';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import db from '../utils/db';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import { useEffect } from 'react';

export default function Home(props) {
  const { products, categoriesSet } = props;

  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();

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
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Layout>
      <div>
        <div className={classes.flex}>
          <h1>Products</h1>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Category
            </InputLabel>
            <Select
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categoriesSet.map(it => (
                <MenuItem key={Math.random(100)} value={it}>
                  {it}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Grid container spacing={3}>
          {products.map(product =>
            product.category === category || category === '' ? (
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
                  <CardActions style={{ justifyContent: 'right' }}>
                    <Typography>${product.price}</Typography>
                    <Button
                      onClick={() => addToCartHandler(product)}
                      size="small"
                      color="primary"
                    >
                      Add to cart
                    </Button>
                    <Button onClick={() => FavHandler(product)} size="small">
                      {state.fav.favItems.filter(
                        item => item._id === product._id
                      ).length > 0 ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ) : (
              <></>
            )
          )}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  var categoriesSet = new Set();
  products.map(product => categoriesSet.add(product.category));
  return {
    props: {
      products: products.map(db.convertDocToObj),
      categoriesSet: [...categoriesSet],
    },
    revalidate: 10,
  };
}
