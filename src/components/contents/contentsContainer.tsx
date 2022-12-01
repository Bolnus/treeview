import {connect} from "react-redux";
import {AppDispatch, RootState} from "../../redux/redux-store";
import {Contents, DispatchProps, StateProps} from "./contents";
import {saveCurrentItemAC} from "../../redux/items-reducer";

function mapStateToProps(state: RootState): StateProps
{
    return {
        currentPath: state.items.currentPath,
        currentItem: state.items.currentItem
    }
}

function mapDispatchToProps(dispatch: AppDispatch): DispatchProps
{
    return {
        saveItem()
        {
            dispatch(saveCurrentItemAC());
        }
    }
}

export const ContentsContainer = connect(mapStateToProps,mapDispatchToProps)(Contents);