import React from "react"
import classes from "./options.module.css"

export interface StateProps
{
    name: string
    details: string
    isDirectory: boolean
}

export interface DispatchProps
{
    updateDetails: Function
}

interface OwnProps
{
    tabName: string
}

type Props = StateProps & DispatchProps & OwnProps;

function onTextAreaChanged(updateText: Function, event: React.FormEvent)
{
    let textArea = event.target as HTMLTextAreaElement;
    updateText(textArea.value);
}

export function DetailsTab(props: Props)
{
    let formatString: string = "--";
    if(!props.isDirectory)
    {
        formatString = props.name.split('.')[1]||formatString;
    }
    return (
        <div className={classes.tab}>
            <h1>{props.tabName}</h1>
            <div className={classes.section}>
                <div className={classes.infoWrapper}>
                    <h3 className={classes.infoBox}>
                        <span className={classes.infoBox__header}>
                            Формат
                        </span>
                        {formatString}
                    </h3>
                    <h3 className={classes.infoBox}>
                        <span className={classes.infoBox__header}>
                            Описание
                        </span>
                        <textarea placeholder="Описание"
                               value={props.details}
                               onChange={onTextAreaChanged.bind(null, props.updateDetails)}
                               className={`${classes.section__textEdit} ${classes.section__input} commonInput`}/>
                    </h3>
                </div>
            </div>
        </div>
    );
}