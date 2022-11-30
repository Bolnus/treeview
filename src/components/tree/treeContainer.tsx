import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {StateProps, Tree} from "./tree";


function mapStateToProps(state: RootState): StateProps
{
    return {
        rootItem: state.items.itemsTree[0]
    }
}

export const TreeContainer = connect(mapStateToProps)(Tree);