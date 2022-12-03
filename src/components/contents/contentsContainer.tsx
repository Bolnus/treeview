import {connect} from "react-redux";
import {AppDispatch, RootState} from "../../redux/redux-store";
import {Contents, DispatchProps, StateProps} from "./contents";
import {
    ItemInterface,
    loadCurrentItemAC,
    saveCurrentItemAC, setCurrentTabAC,
    updateFileNameAC,
    updateStatusAC
} from "../../redux/items-reducer";

function mapStateToProps(state: RootState): StateProps
{
    return {
        currentPath: state.items.currentPath,
        currentItem: state.items.currentItem,
        statusText: state.items.statusBar.statusText,
        isError: state.items.statusBar.isError,
        fileName: state.items.fileName,
        currentTab: state.items.currentTabNumber
    }
}

function mapDispatchToProps(dispatch: AppDispatch): DispatchProps
{
    return {
        saveItem()
        {
            dispatch(saveCurrentItemAC());
        },
        updateStatus(text: string,isError: boolean)
        {
            dispatch(updateStatusAC(text,isError));
        },
        loadCurrentItem(loadedItem: ItemInterface)
        {
            dispatch(loadCurrentItemAC(loadedItem));
        },
        updateFileName(fileName: string)
        {
            dispatch(updateFileNameAC(fileName));
        },
        setCurrentTab(tabNumber: number)
        {
            dispatch(setCurrentTabAC(tabNumber));
        }
    }
}

export const ContentsContainer = connect(mapStateToProps,mapDispatchToProps)(Contents);