import React from 'react';
import ReactDOM from 'react-dom';
import classes from "./NotificationBox.module.css";

function Backdrop(props) {
    return (
        <div className={classes.backdrop} onClick={props.close_handler}></div>
    )
}

function Notification(props) {
    return (
        <div className={classes.box}>
            <h1>{props.message}</h1>
            <div>
                {props.ok && <button onClick={props.okHandler}>Ok</button>}
                <button onClick={props.close_handler}>Close</button>
            </div>
        </div>
    )
}

export default function NotificationBox(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop close_handler={props.close_handler} />, document.getElementById("overlay"))};
            {ReactDOM.createPortal(<Notification message={props.message} close_handler={props.close_handler} ok={props.ok} okHandler={props.notificationOk_handler} />, document.getElementById("overlay"))};
        </React.Fragment>
    )
}
