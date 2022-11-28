const SET_CURRENT_ITEM: string = "SET_CURRENT_ITEM";
const SET_DIRECTORY_OPENED: string = "SET_DIRECTORY_STATE";

interface ItemInterface
{
    id: number
    name: string
    size: string

}

type NestableItemsInterface = ItemInterface | { [k: string]: NestableItemsInterface }

interface ItemsState
{
    itemsTree: NestableItemsInterface,
    currentItem: ItemInterface
}

let initialState: ItemsState = {
    itemsTree: {
        item1: {
            id: 2,
            name: "name1",
            size: "12MB"
        },
        dir1: {
            item2: {
                id: 1,
                name: "name1",
                size: "12MB"
            }
        }
    },
    currentItem: {
        id: 1,
        name: "name1",
        size: "12MB"
    }
}

export function setCurrentItemAC(itemID: string)
{
    return {
        type: SET_CURRENT_ITEM,
        itemID: itemID
    } as const;
}

export function setDirectoryState(isOpened: boolean)
{
    return {
        type: SET_DIRECTORY_OPENED,

        isOpened: isOpened
    } as const;
}

type ActionTypes = ReturnType<typeof setCurrentItemAC> |
    // ReturnType<typeof setTaskDetailsAC> |
    // ReturnType<typeof updateTextAreaAC> |
    // ReturnType<typeof updateLineCupsAC> |
    // ReturnType<typeof updateLineCleaningsAC> |
    // ReturnType<typeof updateStatusAC> |
    // ReturnType<typeof updateLineMachineAC> |
    // ReturnType<typeof setFetchingStateAC> |
    // ReturnType<typeof updateDTEditAC> |
    // ReturnType<typeof setCoffeeMachineListAC> |
    // ReturnType<typeof updateConsumablesRowAC> |
    // ReturnType<typeof updateJobsRowAC> |
    // ReturnType<typeof addTableRowAC> |
    // ReturnType<typeof setRowToDeleteAC> |
    // ReturnType<typeof unsetRowToDeleteAC> |
    ReturnType<typeof setDirectoryState>;

export function itemsReducer(state: ItemsState = initialState, action: ActionTypes): ItemsState
{
    return state;
}