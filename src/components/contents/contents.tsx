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
    updateFileName: Function
    setCurrentTab: Function
}

export interface StateProps
{
    currentPath: string
    currentItem: ItemInterface
    fileName: string
    statusText: string
    isError: boolean
    currentTab: number
}

type Props = StateProps & DispatchProps;

const tabNames = ["Общие","Права","Подробно",""];

function mapTabNamesToBlocks(currentTab: number,setCurrentTab: Function, element: string,index: number)
{
    if(element==="")
        return null;
    else
        return (
            <div onClick={setCurrentTab.bind(null, index)}
                 className={currentTab === index ? classes.navTab_selected : ""} key={index}>
                {element}
            </div>
        );
}

function onSaveClicked(setCurrentTab: Function, saveItem: Function)
{
    //setCurrentTab(tabNames.length-1);
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

// function isItemInterface(obj: any,key: string): obj is ItemInterface
// {
//     return obj[key] !== undefined;
// }

function handleJSONContents(updateStatus: Function,loadCurrentItem: Function, currentItem: ItemInterface, event: ProgressEvent<FileReader>)
{
    //let fileText: string = //String(event.target.result);
    let fileReader = event.target as FileReader;
    let frResult: string = String( fileReader.result);
    if(frResult)
    {
        let objectSrc: any;
        try
        {
            objectSrc = JSON.parse(frResult);
        }
        catch(error)
        {
            console.log(error);
            updateStatus("Неверный формат файла",true);
            return;
        }

        for (const [keyCurrent] of Object.entries(currentItem))
        {
            //console.log(`${key}: ${value}`); //isItemInterface(objectSrc,key)&&
            let propertyFound: boolean = false;
            for (const [keySrc] of Object.entries(objectSrc))
            {
                if(keyCurrent===keySrc)
                {
                    propertyFound=true;
                    break;
                }
            }
            if(!propertyFound)
            {
                updateStatus("Не найдено свойство "+keyCurrent,true);
                return;
            }
        }
        try
        {
            let loadedItem: ItemInterface = {
                id: currentItem.id,
                name: objectSrc.name || "",
                isDirectory: currentItem.isDirectory,
                childIDs: [...currentItem.childIDs], //...objectSrc.childIDs //не нужно явно
                commonOptions: {
                    creationTime: objectSrc.commonOptions.creationTime || "",
                    changeTime: objectSrc.commonOptions.changeTime || "",
                    size: objectSrc.commonOptions.size || ""
                },
                rulesOptions: {
                    owner: objectSrc.rulesOptions.owner || "",
                    group: objectSrc.rulesOptions.group || "",

                    permissionsArray: [...objectSrc.rulesOptions.permissionsArray],
                    suidBit: objectSrc.rulesOptions.suidBit || false,
                    sgidBit: objectSrc.rulesOptions.sgidBit || false
                },
                details: objectSrc.details || ""
            };
            for(let i:number=0;i<3;i++)
            {
                if(objectSrc.rulesOptions.permissionsArray[i])
                    loadedItem.rulesOptions.permissionsArray[i] = objectSrc.rulesOptions.permissionsArray[i];
                else
                    loadedItem.rulesOptions.permissionsArray[i] = 0;
            }
            loadCurrentItem(loadedItem);
        }
        catch(error)
        {
            updateStatus("Ошибка парсинга файла",true);
            console.log(error);
        }
    }
    else
        updateStatus("Ошибка чтения файла",true);

}

function onFileInputChanged(updateStatus: Function,loadCurrentItem: Function, currentItem: ItemInterface, updateFileName: Function, event: React.FormEvent)
{
    if(currentItem.id<0)
    {
        updateStatus("Не выбран элемент для изменения!",true);
        return;
    }
    let inputElement = event.target as HTMLInputElement;
    updateFileName(inputElement.value);
    if(inputElement.files)
    {
        if(inputElement.files.length)
        {
            let fileName: string = inputElement.files[0].name;
            console.log(fileName);
            const reader = new FileReader();
            reader.onload = handleJSONContents.bind(null,updateStatus,loadCurrentItem,currentItem);
            reader.readAsText(inputElement.files[0]);
            updateStatus(inputElement.files[0].name,false);
        }
        else
            updateStatus("Файл не выбран",true);
    }
    else
        updateStatus("Файл не выбран",true);
}

export function Contents(props: Props)
{
    //let [currentTab,setCurrentTab] = React.useState<number>(0);
    //let navigate = useNavigate();
    if(props.statusText)
    {
        setTimeout(function() {
            props.updateStatus("",false);
        }, 3000);
    }

    return (
        <div className={classes.contentsWrapper}>
            <div className={classes.contentsHeader}>
                <input type="text" readOnly={true} className="commonInput" value={props.currentPath}/>
                <div className={classes.navBar}>
                    {tabNames.map(mapTabNamesToBlocks.bind(null,props.currentTab,props.setCurrentTab))}
                </div>
            </div>
            {props.currentTab===0 ? <CommonTabContainer tabName={tabNames[props.currentTab]}/> : null}
            {props.currentTab===1 ? <RulesTabContainer tabName={tabNames[props.currentTab]}/> : null}
            {props.currentTab===2 ? <DetailsTabContainer tabName={tabNames[props.currentTab]}/> : null}
            {props.currentTab===3 ? <div className={classes.contentsBlock}/>: null}
            <div className={classes.contentsFooter}>
                <label className={classes.contentsFooter__inputWrapper}>
                    <input type="file"
                           accept=".json"
                           value={props.fileName}
                           onChange={onFileInputChanged.bind(null,props.updateStatus,props.loadCurrentItem,props.currentItem,props.updateFileName)}/>
                    <span className={` pushButton`}>⬆ Импортировать</span>
                </label>
                <span className={`${classes.contentsFooter__status} ${props.isError ? classes.contentsFooter__status_error : ""}`}>
                    {props.statusText}
                </span>
                <button onClick={onExportClicked.bind(null,props.currentItem)} className="pushButton">⬇ Экспортировать</button>
                <button onClick={onSaveClicked.bind(null,props.setCurrentTab,props.saveItem)} className="pushButton">💾 Сохранить</button>
            </div>
        </div>
    )
}