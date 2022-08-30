import ExpenseDate from '../expense-date/ExpenseDate';
import './ExpenseItem.css';
import Card from '../../card/Card';

function ExpenseItem(props) {// props gets key-value pair of properties and values set from user of this component.
    //use as variables
    /*const expenseDate = new Date();
    const expenseTitle = 'Car Insurance';
    const expenseAmount = 250.99;

    return (
            <div className="expense-item">
                <div>{expenseDate.toString()}</div>
                <div className="expense-item__description">
                    <h2>{expenseTitle}</h2>
                </div>
                <div className="expense-item__price">$ {expenseAmount}</div>
            </div>
        )*/

        //pass values through props.
        /*
        const month = props.date.toLocaleString('en-US', {month: 'long'});
        const day = props.date.toLocaleString('en-US', {day: '2-digit'});
        const year = props.date.getFullYear();
        return (
            <div className="expense-item">
                <div>
                    <div>{month}</div>
                    <div>{year}</div>
                    <div>{day}</div>
                </div>
                <div className="expense-item__description">
                    <h2>{props.title}</h2>
                </div>
                <div className="expense-item__price">$ {props.amount}</div>
            </div>
        )*/ 
        //-- move date part to ExpenseDate
        /*return (
            <div className="expense-item">
                <ExpenseDate date={props.date}/>
                <div className="expense-item__description">
                    <h2>{props.title}</h2>
                </div>
                <div className="expense-item__price">$ {props.amount}</div>
            </div>
        );*/
        // introduce composition with Card (child props)
        return (
            <Card className="expense-item">
                <ExpenseDate date={props.date}/>
                <div className="expense-item__description">
                    <h2>{props.title}</h2>
                </div>
                <div className="expense-item__price">$ {props.amount}</div>
            </Card>
        );

        
}

export default ExpenseItem;