import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price : <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(cntrl => (
      <BuildControl
        key={cntrl.label}
        type={cntrl.type}
        label={cntrl.label}
        added={() => props.ingrdientAdded(cntrl.type)}
        removed={() => props.ingrdientRemoved(cntrl.type)}
        disabled={props.disbabled[cntrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
    {props.isAuth ? 'Order Now' : 'Sign In to Order'}
    </button>
  </div>
);

export default buildControls;
