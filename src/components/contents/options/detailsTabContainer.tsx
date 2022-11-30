import {connect} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/redux-store";
import {DetailsTab, DispatchProps, StateProps} from "./detailsTab";
import {updateDetailsAC} from "../../../redux/items-reducer";

function mapStateToProps(state: RootState): StateProps
{
    return {
        name: state.items.currentItem.name,
        details: state.items.currentItem.details,
        isDirectory: state.items.currentItem.isDirectory
    }
}

function mapDispatchToProps(dispatch: AppDispatch): DispatchProps
{
    return {
        updateDetails(text: string)
        {
            dispatch(updateDetailsAC(text));
        }
    }
}

export const DetailsTabContainer = connect(mapStateToProps,mapDispatchToProps)(DetailsTab);