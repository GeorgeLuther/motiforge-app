import React from 'react'
import './Accordion.css'
import UserContext from '../../contexts/UserContext'

export default class Accordion extends React.Component {

    static contextType = UserContext

    handleOpenTab=(e)=>{
        const newIdx = Number(e.currentTarget.id)
        if (this.context.openTab !== newIdx) {
            this.context.setOpenTab(newIdx)
        } else {
            this.context.setOpenTab(-1)
        }
    }
    render(){
        return (
            <div className={'Accordion Accordion-'+ this.props.groupName}>
                {React.Children.map(this.props.children, (child, idx) => {
                    return (
                        <Tab 
                            key={'tab_'+idx}
                            idx={idx}
                            title={this.props.headerTextArr[idx]}
                            openTab={this.context.openTab}
                            handleOpenTab={this.handleOpenTab}
                        >
                            {child}
                        </Tab>
                    )
                })}
            </div>
    )
    }
}

function Tab(props){
    const isOpen = (props.openTab === props.idx)
    return (
        <div className="tab">
            <button 
                className="tab-btn"
                id={props.idx}
                onClick={props.handleOpenTab}
            >
                <h2>{props.title}</h2>
                {/* <span>{isOpen ? "▼" : "►"}</span> */}
            </button>
            {isOpen && 
                <div className="tab-content">
                    {props.children}
                </div>
            }
        </div>
    )
}