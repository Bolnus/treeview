import {faker} from '@faker-js/faker';

const SET_CURRENT_ITEM = "SET_CURRENT_ITEM";
const LOAD_CURRENT_ITEM = "LOAD-CURRENT-ITEM";
const SET_DIRECTORY_OPENED = "SET-DIRECTORY-STATE";
const UPDATE_NAME = "UPDATE-NAME";
const UPDATE_OWNER = "UPDATE-OWNER";
const UPDATE_GROUP = "UPDATE_GROUP";
const UPDATE_PERMISSIONS = "UPDATE-PERMISSIONS";
const UPDATE_SUID_BIT = "UPDATE-SUID-BIT";
const UPDATE_SGID_BIT = "UPDATE-SGID-BIT";
const UPDATE_DETAILS = "UPDATE-DETAILS";
const SAVE_CURRENT_ITEM = "SAVE-CURRENT-ITEM";
const UPDATE_STATUS = "UPDATE-STATUS";
const UPDATE_FILE_NAME = "UPDATE-FILE-NAME";
const SET_CURRENT_TAB = "SET-CURRENT-TAB";
const GENERATE_TREE = "GENERATE-TREE";

export interface CommonOptions
{
    creationTime: string
    changeTime: string
    size: string
}

export interface RulesOptions
{
    owner: string
    group: string

    // readSelf: boolean
    // writeSelf: boolean
    // executeSelf: boolean
    // readGroup: boolean
    // writeGroup: boolean
    // executeGroup: boolean
    // readOthers: boolean
    // writeOthers: boolean
    // executeOthers: boolean
    permissionsArray: number[]
    // selfPermissionDec: number
    // groupPermissionDec: number
    // othersPermissionDec: number

    suidBit: boolean
    sgidBit: boolean
}

export interface ItemInterface
{
    id: number
    name: string
    isDirectory: boolean
    childIDs: number[]

    commonOptions: CommonOptions
    rulesOptions: RulesOptions
    details: string
}

export interface StatusBar
{
    statusText: string
    isError: boolean
}

//type NestableItemsInterface = ItemInterface | { [k: string]: NestableItemsInterface }

interface ItemsState
{
    itemsTree: ItemInterface[]
    currentItem: ItemInterface
    currentPath: string
    currentTabNumber: number
    statusBar: StatusBar
    fileName: string
    usersList: string[]
    groupsList: string[]
}

function getDefaultCommonOptions(): CommonOptions
{
    let date: Date = new Date();
    return {
        creationTime: date.toLocaleString(),
        changeTime: date.toLocaleString(),
        size: `${Math.floor(Math.random() * 1024)} KB` //rand
    }
}



function getDefaultRulesOptions(): RulesOptions
{
    return {
        owner: "vladislav",
        group: "vladislav",

        // readSelf: true,
        // writeSelf: true,
        // executeSelf: false,
        // readGroup: false,
        // writeGroup: false,
        // executeGroup: false,
        // readOthers: false,
        // writeOthers: false,
        // executeOthers: false,
        permissionsArray: [7,7,7],
        // selfPermissionDec: 7,
        // groupPermissionDec: 7,
        // othersPermissionDec: 7,

        suidBit: false,
        sgidBit: false
    }
}

function generateItemsTree(totalItems: number,directoryItems: number): ItemInterface[]
{
    if(directoryItems>totalItems)
        directoryItems=totalItems;
    let tree: ItemInterface[] = [
        {
            id: 0,
            name: "disk",
            isDirectory: true,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        }
    ]
    //Boolean(Math.floor(Math.random() * 2))
    for (let i = 1; i < totalItems; i++)
    {
        let parentId: number = 1;
        if(i<=directoryItems)
            parentId = Math.floor(Math.random() * i);
        else
            parentId = Math.floor(Math.random() * directoryItems);
        tree[i] = {
            id: i,
            name: i<=directoryItems ? faker.lorem.word() : `${faker.word.noun()}.${faker.system.commonFileExt()}`,
            isDirectory: i<=directoryItems,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: faker.lorem.sentence()
        }
        tree[parentId].childIDs.push(i);
    }

    return tree
}

let initialState: ItemsState = {
    itemsTree: [
        {
            id: 0,
            name: "disk",
            isDirectory: true,
            childIDs: [1,2,6,7,11],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 1,
            name: "bin",
            isDirectory: true,
            childIDs: [3,4,5],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 2,
            name: "dev",
            isDirectory: true,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 3,
            name: "string3",
            isDirectory: false,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 4,
            name: "string4",
            isDirectory: false,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 5,
            name: "string5",
            isDirectory: false,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 6,
            name: "lib",
            isDirectory: true,
            childIDs: [8],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 7,
            name: "usr",
            isDirectory: true,
            childIDs: [9,12,13],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 8,
            name: "shpo",
            isDirectory: true,
            childIDs: [10],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 9,
            name: "stringasdasdad",
            isDirectory: false,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 10,
            name: "stringasdasdsadasdasdasdasdasd",
            isDirectory: false,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 11,
            name: "file",
            isDirectory: false,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 12,
            name: "lib",
            isDirectory: true,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 13,
            name: "share",
            isDirectory: true,
            childIDs: [14,15],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 14,
            name: "apps",
            isDirectory: true,
            childIDs: [16],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 15,
            name: "icons",
            isDirectory: true,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
        {
            id: 16,
            name: "shpo.desktop",
            isDirectory: false,
            childIDs: [],
            commonOptions: getDefaultCommonOptions(),
            rulesOptions: getDefaultRulesOptions(),
            details: ""
        },
    ],
    currentItem: {
        id: -1,
        name: "",
        isDirectory: false,
        childIDs: [],
        commonOptions: getDefaultCommonOptions(),
        rulesOptions: getDefaultRulesOptions(),
        details: ""
    },
    currentPath: "",
    statusBar: {
        statusText: "...",
        isError: false
    },
    fileName: "",
    currentTabNumber: 3,
    usersList: ["vladislav","astra","root","user"],
    groupsList: ["vladislav","astra","root","sudoers","high integrity","low integrity","user"]
}

export function setCurrentItemAC(itemID: number,path: string)
{
    return {
        type: SET_CURRENT_ITEM,
        path: path,
        itemID: itemID
    } as const;
}

export function setDirectoryStateAC(isOpened: boolean)
{
    return {
        type: SET_DIRECTORY_OPENED,
        isOpened: isOpened
    } as const;
}

export function updateNameAC(name: string)
{
    return {
        type: UPDATE_NAME,
        name: name
    } as const;
}

export function updateOwnerAC(text: string)
{
    return {
        type: UPDATE_OWNER,
        text: text
    } as const;
}

export function updateGroupAC(text: string)
{
    return {
        type: UPDATE_GROUP,
        text: text
    } as const;
}

export function updatePermissionsAC(permissionsDec: number, decNumber: number)
{
    return {
        type: UPDATE_PERMISSIONS,
        permissionsDec: permissionsDec,
        decNumber: decNumber
    } as const;
}

export function updateSUIDAC(suidBit: boolean)
{
    return {
        type: UPDATE_SUID_BIT,
        suidBit: suidBit
    } as const;
}

export function updateSGIDAC(sgidBit: boolean)
{
    return {
        type: UPDATE_SGID_BIT,
        sgidBit: sgidBit
    } as const;
}

export function updateDetailsAC(text: string)
{
    return {
        type: UPDATE_DETAILS,
        text: text
    } as const;
}

export function saveCurrentItemAC()
{
    return {
        type: SAVE_CURRENT_ITEM
    } as const;
}

export function updateStatusAC(text: string,isError: boolean)
{
    return {
        type: UPDATE_STATUS,
        text: text,
        isError: isError
    } as const;
}

export function loadCurrentItemAC(loadedItem: ItemInterface)
{
    return {
        type: LOAD_CURRENT_ITEM,
        loadedItem: loadedItem
    } as const;
}

export function updateFileNameAC(fileName: string)
{
    return {
        type: UPDATE_FILE_NAME,
        fileName: fileName
    } as const;
}

export function setCurrentTabAC(tabNumber: number)
{
    return {
        type: SET_CURRENT_TAB,
        tabNumber: tabNumber
    } as const;
}

export function generateTreeAC()
{
    return {
        type: GENERATE_TREE
    } as const;
}

type ActionTypes = ReturnType<typeof updateNameAC> |
    ReturnType<typeof setCurrentItemAC> |
    ReturnType<typeof updateOwnerAC> |
    ReturnType<typeof updateGroupAC> |
    ReturnType<typeof updatePermissionsAC> |
    ReturnType<typeof updateSGIDAC> |
    ReturnType<typeof updateSUIDAC> |
    ReturnType<typeof updateDetailsAC> |
    ReturnType<typeof saveCurrentItemAC> |
    ReturnType<typeof updateStatusAC> |
    ReturnType<typeof loadCurrentItemAC> |
    ReturnType<typeof updateFileNameAC> |
    ReturnType<typeof setCurrentTabAC> |
    ReturnType<typeof generateTreeAC> |
    ReturnType<typeof setDirectoryStateAC>;



    // ReturnType<typeof updateDTEditAC> |
    // ReturnType<typeof setCoffeeMachineListAC> |
    // ReturnType<typeof updateConsumablesRowAC> |
    // ReturnType<typeof updateJobsRowAC> |
    // ReturnType<typeof addTableRowAC> |
    // ReturnType<typeof setRowToDeleteAC> |


export function itemsReducer(state: ItemsState = initialState, action: ActionTypes): ItemsState
{
    let newState;
    switch(action.type)
    {
    case UPDATE_NAME:
        newState = {...state};
        newState.currentItem = {...state.currentItem};
        newState.currentItem.name = action.name;
        return newState;
    case UPDATE_OWNER:
        newState = {...state};
        newState.currentItem = {...state.currentItem};
        newState.currentItem.rulesOptions = {...state.currentItem.rulesOptions};
        newState.currentItem.rulesOptions.owner = action.text;
        return newState;
    case UPDATE_GROUP:
        newState = {...state};
        newState.currentItem = {...state.currentItem};
        newState.currentItem.rulesOptions = {...state.currentItem.rulesOptions};
        newState.currentItem.rulesOptions.group = action.text;
        return newState;
    case UPDATE_PERMISSIONS:
        newState = {...state};
        newState.currentItem = {...state.currentItem};
        newState.currentItem.rulesOptions = {...state.currentItem.rulesOptions};
        newState.currentItem.rulesOptions.permissionsArray = [...state.currentItem.rulesOptions.permissionsArray]
        newState.currentItem.rulesOptions.permissionsArray.splice(action.decNumber,1,action.permissionsDec);
        //console.log(newState.currentItem.rulesOptions.permissionsArray);
        return newState;
    case UPDATE_SUID_BIT:
        newState = {...state};
        newState.currentItem = {...state.currentItem};
        newState.currentItem.rulesOptions = {...state.currentItem.rulesOptions};
        newState.currentItem.rulesOptions.suidBit = action.suidBit;
        return newState;
    case UPDATE_SGID_BIT:
        newState = {...state};
        newState.currentItem = {...state.currentItem};
        newState.currentItem.rulesOptions = {...state.currentItem.rulesOptions};
        newState.currentItem.rulesOptions.sgidBit = action.sgidBit;
        return newState;
    case UPDATE_DETAILS:
        newState = {...state};
        newState.currentItem = {...state.currentItem};
        newState.currentItem.details = action.text;
        return newState;
    case SET_CURRENT_ITEM:
        newState = {...state};
        newState.currentItem = {...state.itemsTree[action.itemID]};
        newState.currentItem.rulesOptions = {...state.itemsTree[action.itemID].rulesOptions};
        newState.currentItem.commonOptions = {...state.itemsTree[action.itemID].commonOptions};
        newState.currentPath = action.path;

        newState.currentTabNumber = 0;
        return newState;
    case SAVE_CURRENT_ITEM:
        newState = {...state};
        newState.statusBar = {...state.statusBar};
        if(newState.currentItem.id<0)
        {
            newState.statusBar.statusText = "Не выбран элемент для сохранения!";
            newState.statusBar.isError = true;
        }
        else
        {
            newState.statusBar.statusText = "Сохранено";
            newState.statusBar.isError = false;

            newState.itemsTree = [...state.itemsTree];
            newState.itemsTree[newState.currentItem.id] = {...newState.currentItem};
            newState.itemsTree[newState.currentItem.id].commonOptions = {...newState.currentItem.commonOptions};
            newState.itemsTree[newState.currentItem.id].commonOptions.changeTime = (new Date()).toLocaleString();
            newState.itemsTree[newState.currentItem.id].rulesOptions = {...newState.currentItem.rulesOptions};
        }

        // newState.currentItem = {...newState.currentItem};
        // newState.currentItem.id = -1;
        // newState.currentItem.name = "";

        return newState;
    case UPDATE_STATUS:
        newState = {...state};
        newState.statusBar = {...state.statusBar};
        newState.statusBar.statusText = action.text;
        newState.statusBar.isError = action.isError;
        return newState;
    case LOAD_CURRENT_ITEM:
        newState = {...state};
        newState.currentItem = {...action.loadedItem};
        newState.currentItem.rulesOptions = {...action.loadedItem.rulesOptions};
        newState.currentItem.commonOptions = {...action.loadedItem.commonOptions};
        return newState;
    case SET_CURRENT_TAB:
        newState = {...state};
        newState.currentTabNumber = action.tabNumber;
        return newState;
    case GENERATE_TREE:
        newState = {...state};
        newState.itemsTree = generateItemsTree(100,50);
        newState.currentItem = {...state.currentItem};
        newState.currentItem.id = -1;
        newState.currentTabNumber = 3;
        return newState;
    default:
        return state;
    }
}