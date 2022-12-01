import {connect} from "react-redux";
import {AppDispatch, RootState} from "../../redux/redux-store";
import {Contents, DispatchProps, StateProps} from "./contents";
import {ItemInterface, loadCurrentItemAC, saveCurrentItemAC, updateStatusAC} from "../../redux/items-reducer";

function mapStateToProps(state: RootState): StateProps
{
    return {
        currentPath: state.items.currentPath,
        currentItem: state.items.currentItem,
        status: state.items.status,

    }
}

function mapDispatchToProps(dispatch: AppDispatch): DispatchProps
{
    return {
        saveItem()
        {
            dispatch(saveCurrentItemAC());
        },
        updateStatus(text: string)
        {
            dispatch(updateStatusAC(text));
        },
        loadCurrentItem(loadedItem: ItemInterface)
        {
            dispatch(loadCurrentItemAC(loadedItem));
        }
    }
}

export const ContentsContainer = connect(mapStateToProps,mapDispatchToProps)(Contents);