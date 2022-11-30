import React from "react"
import classes from "./options.module.css";

export interface StateProps
{
    isDirectory: boolean
    creationTime: string
    changeTime: string
    size: string
    name: string
}

export interface DispatchProps
{
    updateName: Function
}

interface OwnProps
{
    tabName: string
}

type Props = StateProps & DispatchProps & OwnProps;

function onInputTextChanged(updateText: Function,event: React.FormEvent)
{
    let inputElement = event.target as HTMLInputElement;
    updateText(inputElement.value);
}

export function CommonTab(props: Props)
{
    //debugger;
    return (
        <div className={classes.tab}>
            <h1>{props.tabName}</h1>
            <div className={classes.section}>
                <h2 className={classes.section__header}>
                    Общая информация
                </h2>
                <div className={classes.infoWrapper}>
                    <h3 className={classes.infoBox}>
                        <span className={classes.infoBox__header}>
                            Тип
                        </span>
                        {props.isDirectory ? "Директория" : "Файл"}
                    </h3>
                    <h3 className={classes.infoBox}>
                        <span className={classes.infoBox__header}>
                            Создан
                        </span>
                        {props.creationTime}
                    </h3>
                    <h3 className={classes.infoBox}>
                        <span className={classes.infoBox__header}>
                            Изменен
                        </span>
                        {props.changeTime}
                    </h3>
                    <h3 className={classes.infoBox}>
                        <span className={classes.infoBox__header}>
                            Размер
                        </span>
                        {props.size}
                    </h3>
                </div>
            </div>
            <div className={classes.section}>
                <h2 className={classes.section__header}>
                    Параметры
                </h2>
                <div className={classes.infoWrapper}>
                    <h3 className={classes.infoBox}>
                        <span className={classes.infoBox__header}>
                            Имя
                        </span>
                        <input placeholder="Введите имя..." type="text"
                               value={props.name}
                               onChange={onInputTextChanged.bind(null, props.updateName)}
                               className={`${classes.section__lineEdit} ${classes.section__input} commonInput`}/>
                    </h3>
                </div>
            </div>
        </div>
    )
}