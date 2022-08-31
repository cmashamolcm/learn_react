import React from "react";
import ExpenseItem from "../expenses/expense-item/ExpenseItem";

function CreateElemenet() {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Hello From Created H1 in DIV"),
    React.createElement("p", {}, "Hello From Created paragraph in DIV"),
    React.createElement(
      "div",
      {},
      React.createElement(ExpenseItem, {
        title: "Testing React.createElement",
        amount: 10.9,
        date: new Date(),
      })
    )
  );
}

export default CreateElemenet;
