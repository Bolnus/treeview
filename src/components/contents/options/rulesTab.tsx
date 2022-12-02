import React from "react";
import classes from "./options.module.css"

export interface StateProps
{
    owner: string
    usersList: string[]
    group: string
    groupsList: string[]
    permissionsArray: number[]
    suidBit: boolean
    sgidBit: boolean
}

export interface DispatchProps
{
    updateSelfDec: Function
    updateGroupDec: Function
    updateOthersDec: Function
    updateSUID: Function
    updateSGID: Function
    updateOwner: Function
    updateGroup: Function
}

interface OwnProps
{
    tabName: string
}

type Props = StateProps & DispatchProps & OwnProps;

const permissionNames = ["Чтение","Запись","Исполнение"];

function mapStringsToOptions(element: string,index: number)
{
    return <option value={element} key={index}/>;
}

function onPermissionsChanged(permissionDecimal: number,bitNumber: number, updatePermission: Function, event: React.FormEvent)
{
    let inputElement = event.target as HTMLInputElement;
    let permissionBinary: string = String("000"+permissionDecimal.toString(2)).slice(-3);
    switch(bitNumber)
    {
    case 0:
        permissionBinary=Number(inputElement.checked)+permissionBinary.substring(1,3);
        break;
    case 1:
        permissionBinary=permissionBinary[0]+Number(inputElement.checked)+permissionBinary[2];
        break;
    case 2:
        permissionBinary=permissionBinary.substring(0,2)+Number(inputElement.checked);
        break;
    }
    updatePermission(parseInt(permissionBinary, 2));
}

function mapPermissionToCheckbox(permissionDecimal: number, updatePermission: Function, element: string,index: number)
{
    let rightJustifiedBinary = String("000"+permissionDecimal.toString(2)).slice(-3);

    return (
        <div className={`${classes.infoBox} ${classes.infoBox__bitRow}`} key={index}>
            <span>{permissionNames[index]}</span>
            <input type="checkbox"
                   checked={Boolean(Number(rightJustifiedBinary[index]))}
                   onChange={onPermissionsChanged.bind(null,permissionDecimal,index,updatePermission)}/>
        </div>
    )
}

function onInputTextChanged(updateText: Function,event: React.FormEvent)
{
    let inputElement = event.target as HTMLInputElement;
    updateText(inputElement.value);
}

function onCheckBoxChanged(updateBit: Function, event: React.FormEvent)
{
    let inputElement = event.target as HTMLInputElement;
    updateBit(inputElement.checked);
}

export function RulesTab(props: Props)
{
    //console.log(props.permissionsArray[0]);
    //let permissionsSelf = ;
    return (
        <div className={classes.tab}>
            <h1>{props.tabName}</h1>
            <div className={classes.section}>
                <h2 className={classes.section__header}>
                    Принадлежность
                </h2>
                <div className={classes.infoWrapper}>
                    <h3 className={classes.infoBox}>
                        <span className={classes.infoBox__header}>
                            Владелец
                        </span>
                        <input placeholder="Владелец" type="text" list="ownerOptions"
                               value={props.owner}
                               onChange={onInputTextChanged.bind(null, props.updateOwner)}
                               className={`${classes.section__lineEdit} ${classes.section__input} commonInput`}/>
                        <datalist id="ownerOptions">
                            {props.usersList.map(mapStringsToOptions)}
                        </datalist>
                    </h3>
                    <h3 className={classes.infoBox}>
                        <span className={classes.infoBox__header}>
                            Группа
                        </span>
                        <input placeholder="Группа" type="text" list="groupOptions"
                               value={props.group}
                               onChange={onInputTextChanged.bind(null, props.updateGroup)}
                               className={`${classes.section__lineEdit} ${classes.section__input} commonInput`}/>
                        <datalist id="groupOptions">
                            {props.groupsList.map(mapStringsToOptions)}
                        </datalist>
                    </h3>
                </div>
            </div>
            <div className={classes.section}>
                <h2 className={classes.section__header}>
                    Пользователь
                </h2>
                <div className={classes.infoWrapper}>
                    {permissionNames.map(mapPermissionToCheckbox.bind(null,props.permissionsArray[0],props.updateSelfDec))}
                </div>
            </div>
            <div className={classes.section}>
                <h2 className={classes.section__header}>
                    Группа
                </h2>
                <div className={classes.infoWrapper}>
                    {permissionNames.map(mapPermissionToCheckbox.bind(null,props.permissionsArray[1],props.updateGroupDec))}
                </div>
            </div>
            <div className={classes.section}>
                <h2 className={classes.section__header}>
                    Остальные
                </h2>
                <div className={classes.infoWrapper}>
                    {permissionNames.map(mapPermissionToCheckbox.bind(null,props.permissionsArray[2],props.updateOthersDec))}
                </div>
            </div>
            <div className={classes.section}>
                <h2 className={classes.section__header}>
                    Привилегированный бит
                </h2>
                <div className={classes.infoWrapper}>
                    <div className={`${classes.infoBox} ${classes.infoBox__bitRow}`}>
                        <span>SUID Bit</span>
                        <input type="checkbox"
                               checked={props.suidBit}
                               onChange={onCheckBoxChanged.bind(null,props.updateSUID)}/>
                    </div>
                    <div className={`${classes.infoBox} ${classes.infoBox__bitRow}`}>
                        <span>SGID Bit</span>
                        <input type="checkbox"
                               checked={props.sgidBit}
                               onChange={onCheckBoxChanged.bind(null,props.updateSGID)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}