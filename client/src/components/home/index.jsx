import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Featured from "./featured";
import SlimPromotion from "../../utils/promotions/slim.block";
import CardBlock from "../../utils/products/ card.blocks";
import Loader from "../../utils/loader";

import { loadProductsBySold, getProducts } from "../../store/products";

const slimPromotion = {
  img: "/images/featured/featured_home_3.jpg",
  lineOne: "Up to 40% off",
  lineTwo: "In second hand guitar",
  linkTitle: "Show Now",
  linkTo: "/shop",
};

const Home = () => {
  const dispatch = useDispatch();
  const { productsBySold: bySold } = useSelector(getProducts);

  useEffect(() => {
    dispatch(loadProductsBySold());
  }, [dispatch]);

  return (
    <div>
      <Featured />
      {bySold ? (
        <CardBlock items={bySold} title="Best Selling guitars" />
      ) : (
        <Loader />
      )}
      <SlimPromotion items={slimPromotion} />
    </div>
  );
};

export default Home;
