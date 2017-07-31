/**
 * Tabs.tsx
 */

import * as path from "path"

import * as React from "react"
import { connect } from "react-redux"

import * as classNames from "classnames"

import * as Selectors from "./../Selectors"
import * as State from "./../State"

import { Icon } from "./../Icon"

require("./Tabs.less") // tslint:disable-line no-var-requires

export interface ITabProps {
    id: string
    name: string
    description: string
    isSelected: boolean
    isDirty: boolean
}

export interface ITabsProps {
    tabs: ITabProps[]
}

export class Tabs extends React.PureComponent<ITabsProps, void> {
    public render(): JSX.Element {

        const tabBorderStyle = {
            "borderBottom": "4px solid rgb(40, 44, 52)",
        }

        const tabs = this.props.tabs.map((t) => {
            return <Tab {...t} />
        })

        return <div className="tabs horizontal enable-mouse layer" style={tabBorderStyle}>
            {tabs}
        </div>
    }
}

export const Tab = (props: ITabProps) => {

    const cssClasses = classNames("tab", {
        "selected": props.isSelected,
        "not-selected": !props.isSelected,
        "is-dirty": props.isDirty,
        "not-dirty": !props.isDirty,
    })

    return <div className={cssClasses} title={props.description}>
        <div className="name">{props.name}</div>
        <div className="corner">
            <div className="x-icon-container">
                <Icon name="times" />
            </div>
            <div className="circle-icon-container">
                <div className="circle" />
            </div>
        </div>
    </div>
}

const getTabName = (name: string): string => {
    if (!name) {
        return "[No Name]"
    }

    return path.basename(name)
}

const mapStateToProps = (state: State.IState): ITabsProps => {
    const buffers = Selectors.getAllBuffers(state)

    const tabs = buffers.map((buf): ITabProps => ({
        id: "",
        name: getTabName(buf.file),
        isSelected: buf.id === state.buffers.activeBufferId,
        isDirty: buf.version > buf.lastSaveVersion,
        description: buf.file,
    }))

    return {
        tabs,
    }
}

export const TabsContainer = connect(mapStateToProps)(Tabs)