import {connect} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/redux-store";
import {DispatchProps, RulesTab, StateProps} from "./rulesTab";
import {
    updateGroupAC,
    updateOwnerAC,
    updatePermissionsAC,
    updateSGIDAC,
    updateSUIDAC
} from "../../../redux/items-reducer";

function mapStateToProps(state: RootState): StateProps
{
    return {
        owner: state.items.currentItem.rulesOptions.owner,
        usersList: state.items.usersList,
        group: state.items.currentItem.rulesOptions.group,
        groupsList: state.items.groupsList,
        permissionsArray: state.items.currentItem.rulesOptions.permissionsArray,
        suidBit: state.items.currentItem.rulesOptions.suidBit,
        sgidBit: state.items.currentItem.rulesOptions.sgidBit
    }
}

function mapDispatchToProps(dispatch: AppDispatch): DispatchProps
{
    return {
        updateSelfDec(permissionsDec: number)
        {
            dispatch(updatePermissionsAC(permissionsDec,0));
        },
        updateGroupDec(permissionsDec: number)
        {
            dispatch(updatePermissionsAC(permissionsDec,1));
        },
        updateOthersDec(permissionsDec: number)
        {
            dispatch(updatePermissionsAC(permissionsDec,2));
        },
        updateSUID(suidBit: boolean)
        {
            dispatch(updateSUIDAC(suidBit));
        },
        updateSGID(sgidBit: boolean)
        {
            dispatch(updateSGIDAC(sgidBit));
        },
        updateOwner(text: string)
        {
            dispatch(updateOwnerAC(text));
        },
        updateGroup(text: string)
        {
            dispatch(updateGroupAC(text));
        },
    }
}

export const RulesTabContainer = connect(mapStateToProps,mapDispatchToProps)(RulesTab);