import ExpenseItem from "./expense-item/ExpenseItem";

function Expenses(){
    const expenses = [
        {title: 'Grosseries', amount: 10.90, date: new Date()},
        {title: 'Trip', amount: 100.90, date: new Date()},
        {title: 'Clothes', amount: 20.50, date: new Date()},
        {title: 'Car Insurance', amount: 15.44, date: new Date()},
      ];

    return (
        <div>
            {
                expenses.map(expense=><ExpenseItem title={expense.title} amount={expense.amount} date={expense.date}></ExpenseItem>)
            }
        </div>
        
    );
}

export {Expenses}