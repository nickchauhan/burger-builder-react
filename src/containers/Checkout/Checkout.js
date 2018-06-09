import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  //   state = {
  //     ingredients: null,
  //     totalprice: 0
  //   };

  //   componentWillMount() {
  //     // console.log(this.props.location.query);
  //     const query = new URLSearchParams(this.props.location.search);
  //     const ingredients = {};
  //     let totalprice = 0;
  //     // console.log(query.entries());
  //     for (let param of query.entries()) {
  //       if (param[0] === "totalprice") {
  //         totalprice = param[1];
  //       } else {
  //         ingredients[param[0]] = +param[1];
  //       }
  //     }
  //     this.setState({ ingredients: ingredients, totalprice: totalprice });
  //     console.log(ingredients);
  //   }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinued}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
