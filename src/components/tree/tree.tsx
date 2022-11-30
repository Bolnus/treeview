import React from "react"
import classes from "./tree.module.css"
import {ItemContainer} from "./item";
import {ItemInterface} from "../../redux/items-reducer";

export interface StateProps
{
    rootItem: ItemInterface
}

export function Tree(props: StateProps)
{
    return (
        <div className={classes.treeWrapper}>
            <div className={classes.treeHeader}></div>
            <div className={classes.treeBlock}>
                <ul>
                    <li className={classes.listItem}>
                        <ItemContainer item={props.rootItem} path={'/'+props.rootItem.name}/>
                    </li>
                </ul>
            </div>
            <div className={classes.treeFooter}></div>
        </div>
    )
}