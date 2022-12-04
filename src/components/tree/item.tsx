import React from "react"
import classes from "./tree.module.css"
import {AppDispatch, RootState} from "../../redux/redux-store";
import {ItemInterface, setCurrentItemAC} from "../../redux/items-reducer";
import {connect} from "react-redux";

interface OwnProps
{
    item: ItemInterface
    path: string
}

interface StateProps
{
    childItems: ItemInterface[]
    currentID: number
}

interface DispatchProps
{
    setCurrentItem: Function
}

type Props = OwnProps & StateProps & DispatchProps;

function mapItemsToList(path: string,element: ItemInterface)
{
    return (
        <li key={element.id} className={`${classes.listItem} `}>
            <ItemContainer item={element} path={path+'/'+element.name}/>
        </li>
    )
}

function onItemClicked(id: number,path: string,setCurrentItem: Function)
{
    setCurrentItem(id,path);
}

function Item(props: Props)
{
    //let iconStyle = React.useRef<string>('');
    let [iconStyle,setIconStyle] = React.useState<string>('');
    React.useEffect(function()
    {
        if(!props.item.id)
            setIconStyle(classes.listItem__name_root);
        else if(props.item.isDirectory)
            setIconStyle(classes.listItem__name_dir);
        else
            setIconStyle(classes.listItem__name_file);
    },[props.item.id, props.item.isDirectory]);

    return (
        <div >
            {/*<input type="checkbox"*/}
            {/*       className={`${classes.listItem__checkBox} ${props.item.childIDs.length ? classes.listItem__checkBox_content : ""}`}/>*/}
            <span onClick={onItemClicked.bind(null,props.item.id,props.path,props.setCurrentItem)}
                  className={`${props.item.id===props.currentID ? classes.listItem__name_selected : classes.listItem__name} ${iconStyle}`}>{props.item.name}</span>
            <ul>
                {props.childItems.map(mapItemsToList.bind(null,props.path))}
            </ul>
        </div>
    );
}

function mapIDToChildItem(itemsTree: ItemInterface[], id: number): ItemInterface
{
    return itemsTree[id];
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps
{
    return {
        childItems: ownProps.item.childIDs.map(mapIDToChildItem.bind(null,state.items.itemsTree)),
        currentID: state.items.currentItem.id
    }
}

function mapDispatchToProps(dispatch: AppDispatch): DispatchProps
{
    return {
        setCurrentItem(id: number,path: string)
        {
            dispatch(setCurrentItemAC(id,path));
        }
    }
}

export const ItemContainer = connect(mapStateToProps,mapDispatchToProps)(Item);

