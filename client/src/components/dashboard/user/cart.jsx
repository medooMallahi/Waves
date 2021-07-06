import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../../hoc/ dashboardLayout";
import Loader from "../../../utils/loader";
import CartDetail from "./cartDetail";

import { PayPalButton } from "react-paypal-button-v2";
import { PurchaseSuccess } from "../../../store/user";

const UserCart = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.entities.notifications);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    let total = 0;
    props.user.cart.forEach((item) => {
      total += parseInt(item.price, 10);
    });
    return total;
  };

  const generateUnits = () => [
    {
      description: "Guitars and accessories",
      amount: {
        currency_code: "USD",
        value: calculateTotal(),
        breakdown: {
          item_total: {
            currency_code: "USD",
            value: calculateTotal(),
          },
        },
      },
      items: generateItems(),
    },
  ];

  const generateItems = () => {
    let items = props.user.cart.map((item) => ({
      unit_amount: {
        currency_code: "USD",
        value: item.price,
      },
      quantity: 1,
      name: item.model,
    }));
    return items;
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/dashboard");
    }
    if (notifications && notifications.error) {
      setLoading(false);
    }
  }, [notifications, props.history]);

  return (
    <DashboardLayout title="Your Cart">
      {props.user.cart && props.user.cart.length > 0 ? (
        <>
          <CartDetail products={props.user.cart} />
          <div className="user_cart_sum">
            <div>Total amount: ${calculateTotal()}</div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="pp_button">
              <PayPalButton
                options={{
                  clientId:
                    "ARVTreP8znmxKSRPmZfSCC6oVwTAV0JM-hDHJvr7OsXJB0uh4571j4x7eunhn76PYzwJiHO-bpRksf8P",
                  currency: "USD",
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: generateUnits(),
                  });
                }}
                onSuccess={(details, data) => {
                  let purchaseDetails = { orderID: details.id };
                  dispatch(PurchaseSuccess(purchaseDetails));
                  setLoading(true);
                }}
                onCancel={(data) => {
                  setLoading(false);
                }}
              />
            </div>
          )}
        </>
      ) : (
        <div>There is nothing in your cart</div>
      )}
    </DashboardLayout>
  );
};

export default UserCart;
