import {connect} from "react-redux";
import {AppDispatch, RootState} from "../../redux/redux-store";
import {DispatchProps, StateProps, Tree} from "./tree";
import {generateTreeAC} from "../../redux/items-reducer";


function mapStateToProps(state: RootState): StateProps
{
    return {
        rootItem: state.items.itemsTree[0]
    }
}

function mapDispatchToProps(dispatch: AppDispatch): DispatchProps
{
    return {
        generateItemsTree()
        {
            dispatch(generateTreeAC());
        }
    }
}

export const TreeContainer = connect(mapStateToProps,mapDispatchToProps)(Tree);