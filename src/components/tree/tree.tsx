import React from "react"
import classes from "./tree.module.css"
import {ItemContainer} from "./item";
import {ItemInterface} from "../../redux/items-reducer";

export interface StateProps
{
    rootItem: ItemInterface
}

export interface DispatchProps
{
    generateItemsTree: Function
}

type Props = StateProps & DispatchProps;

function onGenerateClicked(generateItemsTree: Function)
{
    generateItemsTree();
}

export function Tree(props: Props)
{
    return (
        <div className={classes.treeWrapper}>
            <div className={classes.treeHeader}/>
            <div className={classes.treeBlock}>
                <ul>
                    <li className={classes.listItem}>
                        <ItemContainer item={props.rootItem} path={'/'+props.rootItem.name}/>
                    </li>
                </ul>
            </div>
            <div className={classes.treeFooter}>
                <button onClick={onGenerateClicked.bind(null,props.generateItemsTree)} className={`pushButton ${classes.treeFooter__pb}`}>🛠 Сгенерировать</button>
            </div>
        </div>
    )
}