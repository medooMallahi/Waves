import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GridOffIcon from "@material-ui/icons/GridOff";
import GridOnIcon from "@material-ui/icons/GridOn";
import CardBlock from "../../utils/products/ card.blocks";

import { productsByPaginate } from "../../store/products";
import { getAllBrands } from "../../store/brand";
import CollapseCheckbox from "./collapseCheckbox";
import RangeSelect from "./ rangeSelect";
import SearchBar from "./ searchBar";
import PaginationComponent from "../../utils/ paginateNav";

const defaultValues = {
  keywords: "",
  brand: [],
  min: 0,
  max: 100000,
  frets: [],
  page: 1,
};

const Shop = () => {
  const [grid, setGrid] = useState(false);

  const [searchValues, setSearchValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );

  const brands = useSelector((state) => state.entities.brands);
  const { productsByPaginate: byPaginate } = useSelector(
    (state) => state.entities.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsByPaginate(searchValues));
  }, [searchValues, dispatch]);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const handleFilters = (filters, category) => {
    if (category === "brands") {
      setSearchValues({ brand: filters, page: 1 });
    }
    if (category === "frets") {
      setSearchValues({ frets: filters, page: 1 });
    }
  };

  const handleRange = (values) => {
    setSearchValues({ min: values[0], max: values[1], page: 1 });
  };

  const handleKeywords = (values) => {
    setSearchValues({ keywords: values, page: 1 });
  };

  const handleResetSearch = () => {
    setSearchValues({ keywords: "", page: 1 });
  };

  const handleGrid = () => setGrid(!grid);
  const goToPage = (page) => {
    setSearchValues({ page: page });
  };

  return (
    <div className="page_container">
      <div className="page_top">
        <div className="container">
          <SearchBar handleKeywords={(values) => handleKeywords(values)} />
        </div>
      </div>
      <div className="container">
        <div className="shop_wrapper">
          <div className="left">
            <CollapseCheckbox
              initState={true}
              title="Brands"
              list={brands.all}
              handleFilters={(filters) => handleFilters(filters, "brands")}
            />
            <CollapseCheckbox
              initState={false}
              title="Frets"
              list={[
                { _id: 20, name: 20 },
                { _id: 21, name: 21 },
                { _id: 22, name: 22 },
                { _id: 24, name: 24 },
              ]}
              handleFilters={(filters) => handleFilters(filters, "frets")}
            />
            <RangeSelect
              title="Price range"
              handleRange={(values) => handleRange(values)}
            />
          </div>
          <div className="right">
            <div className="shop_options">
              <div className="shop_grids clear">
                <div
                  className={`grid_btn ${grid ? "" : "active"}`}
                  onClick={() => handleGrid()}
                >
                  <GridOnIcon />
                </div>
                <div
                  className={`grid_btn ${!grid ? "" : "active"}`}
                  onClick={() => handleGrid()}
                >
                  <GridOffIcon />
                </div>
              </div>
              <div>
                {byPaginate && byPaginate.docs ? (
                  <>
                    <CardBlock
                      grid={grid}
                      items={byPaginate.docs}
                      shop={true}
                    />
                    <PaginationComponent
                      prods={byPaginate}
                      prev={(page) => goToPage(page)}
                      next={(page) => goToPage(page)}
                      resetSearch={() => handleResetSearch()}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
