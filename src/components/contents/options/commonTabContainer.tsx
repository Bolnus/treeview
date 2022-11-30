import {connect} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/redux-store";
import {CommonTab} from "./commonTab";
import {StateProps, DispatchProps} from "./commonTab";
import {updateNameAC} from "../../../redux/items-reducer";

function mapStateToProps(state: RootState): StateProps
{
    return {
        isDirectory: state.items.currentItem.isDirectory,
        creationTime: state.items.currentItem.commonOptions.creationTime,
        changeTime: state.items.currentItem.commonOptions.changeTime,
        size: state.items.currentItem.commonOptions.size,
        name: state.items.currentItem.name,
    }
}

function mapDispatchToProps(dispatch: AppDispatch): DispatchProps
{
    return {
        updateName(text: string)
        {
            dispatch(updateNameAC(text));
        }
    }
}

export const CommonTabContainer = connect(mapStateToProps,mapDispatchToProps)(CommonTab);