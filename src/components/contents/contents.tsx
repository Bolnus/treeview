import React from "react"
import classes from "./contents.module.css"
import {CommonTabContainer} from "./options/commonTabContainer";
import {RulesTabContainer} from "./options/rulesTabContainer";
import {DetailsTabContainer} from "./options/detailsTabContainer";
import {ItemInterface} from "../../redux/items-reducer";
//import {useNavigate} from "react-router-dom"

export interface DispatchProps
{
    saveItem: Function
    updateStatus: Function
    loadCurrentItem: Function
}

export interface StateProps
{
    currentPath: string
    currentItem: ItemInterface
    status: string
    //currentTab: number
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

function onExportClicked( currentItem: ItemInterface)
{
    const file: Blob = new Blob([JSON.stringify(currentItem,null,"    ")], {type: "application/json"});
    //navigate(URL.createObjectURL(file),{ replace: true });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "currentItem.json";

    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

function handleJSONContents(updateStatus: Function,loadCurrentItem: Function, event: ProgressEvent<FileReader>)
{

}

function onFileInputChanged(updateStatus: Function,loadCurrentItem: Function, event: React.FormEvent)
{
    let inputElement = event.target as HTMLInputElement;
    if(inputElement.files)
    {
        if(inputElement.files.length)
        {
            let fileName: string = inputElement.files[0].name;
            console.log(fileName);
            const reader = new FileReader();
            reader.onload = handleJSONContents.bind(null,updateStatus,loadCurrentItem);
            //reader.readAsText(fileObj);
        }
        else
            updateStatus("Файл не выбран");
    }
    else
        updateStatus("Файл не выбран");
}

export function Contents(props: Props)
{
    let [currentTab,setCurrentTab] = React.useState<number>(0);
    //let navigate = useNavigate();

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
            {currentTab===3 ? <div className={classes.contentsBlock}/>: null}
            <div className={classes.contentsFooter}>
                <label className={classes.contentsFooter__inputWrapper}>
                    <input type="file" accept=".json" onChange={onFileInputChanged.bind(null,props.updateStatus,props.loadCurrentItem)}/>
                    <span className={` pushButton`}>⬆ Импортировать</span>
                </label>
                <span className={classes.contentsFooter__status}>{props.status}</span>
                {/*<a href="#">*/}
                <button onClick={onExportClicked.bind(null,props.currentItem)} className="pushButton">⬇ Экспортировать</button>
                {/*</a>*/}
                <button onClick={onSaveClicked.bind(null,setCurrentTab,props.saveItem)} className="pushButton">💾 Сохранить</button>
            </div>
        </div>
    )
}