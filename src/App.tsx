import React from "react";
import classes from "./App.module.css";
import {TreeContainer} from "./components/tree/treeContainer";
import {ContentsContainer} from "./components/contents/contentsContainer";

function App()
{
    return (
        <div className={classes.App}>
            <TreeContainer/>
            <ContentsContainer/>
        </div>
    );
}

export default App;
