import React from "react"
import classes from "./contents.module.css"
import {CommonTabContainer} from "./options/commonTabContainer";
import {RulesTabContainer} from "./options/rulesTabContainer";
import {DetailsTabContainer} from "./options/detailsTabContainer";

export interface DispatchProps
{
    saveItem: Function
}

export interface StateProps
{
    currentPath: string
}

type Props = StateProps & DispatchProps;

const tabNames = ["Общие","Права","Подробно",""];

function mapTabNamesToBlocks(currentTab: number,setCurrentTab: Function, element: string,index: number)
{
    if(element==="")
        return null;
    else
        return (
        <div onClick={setCurrentTab.bind(null,index)} className={currentTab===index ? classes.navTab_selected : ""} key={index}>
            {element}
        </div>
        );
}

function onSaveClicked(setCurrentTab: Function, saveItem: Function)
{
    setCurrentTab(tabNames.length-1);
    saveItem();
}

export function Contents(props: Props)
{
    let [currentTab,setCurrentTab] = React.useState<number>(0);

    return (
        <div className={classes.contentsWrapper}>
            <div className={classes.contentsHeader}>
                <input type="text" readOnly={true} className="commonInput" value={props.currentPath}/>
                <div className={classes.navBar}>
                    {tabNames.map(mapTabNamesToBlocks.bind(null,currentTab,setCurrentTab))}
                </div>
            </div>
            {currentTab===0 ? <CommonTabContainer tabName={tabNames[currentTab]}/> : null}
            {currentTab===1 ? <RulesTabContainer tabName={tabNames[currentTab]}/> : null}
            {currentTab===2 ? <DetailsTabContainer tabName={tabNames[currentTab]}/> : null}
            {currentTab===3 ? <div className={classes.contentsBlock}></div>: null}
            <div className={classes.contentsFooter}>
                <button className="pushButton">⬆ Импортировать</button>
                <button className="pushButton">⬇ Экспортировать</button>
                <button onClick={onSaveClicked.bind(null,setCurrentTab,props.saveItem)} className="pushButton">💾 Сохранить</button>
            </div>
        </div>
    )
}