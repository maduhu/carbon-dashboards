/*
 *  Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

import React from 'react';

import Drawer from 'material-ui/Drawer';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {dashboardLayout} from '../../utils/WidgetLoadingComponent';
import {pubsubComponent} from '../../utils/PubSubComponent';

// import {FormattedMessage} from 'react-intl';


const styles = {
    widgetDrawer: {
        background: '#192830'
    }
};

class WidgetConfigurationPanel extends React.Component {

    constructor(props) {
        super(props);
        this.getPublishers = this.getPublishers.bind(this);
        // this.getPreferences = this.getPreferences().bind(this);
        this.handlePublisherCheckBoxEvent = this.handlePublisherCheckBoxEvent.bind(this);
        this.handlePreferenceCheckBoxEvent = this.handlePreferenceCheckBoxEvent.bind(this);
        this.handlePreferenceTextBoxEvent = this.handlePreferenceTextBoxEvent.bind(this);
        this.handlePreferenceSelectListEvent = this.handlePreferenceSelectListEvent.bind(this);
        this.state = {
            checked: false,
            options: dashboardLayout.selectedItem.config.content[0].props.configs.options
        }
    }

    handlePublisherCheckBoxEvent(event, isInputChecked) {
        let selectedWidget = dashboardLayout.selectedItem;
        if (isInputChecked) {
            pubsubComponent.wire(selectedWidget.config.content[0].props.id, event.currentTarget.id);
            this.persistPubSubWiringInDashboardJSON(dashboardLayout.toConfig().content, selectedWidget.config.content[0].props.id,
                event.currentTarget.id);
            this.setState({checked: true});
        } else {
            if (pubsubComponent.unwire(selectedWidget.config.content[0].props.id, event.currentTarget.id)) {
                this.unpersistPubSubWiringInDashboardJSON(dashboardLayout.toConfig().content,
                    selectedWidget.config.content[0].props.id, event.currentTarget.id);
                this.setState({checked: false});
            }
        }
    }

    handlePreferenceCheckBoxEvent(event, isInputChecked) {
        /**
        * helper function to get the page from a given dashboard given the pageId
         * */
        function getPage(dashboard,pageID){
            let pages = dashboard.pages;
            if(pages){
                for (let i = 0; i < pages.length; i++) {
                    let page = pages[i];
                    if(page.id === pageID ){
                        return page;
                    }
                }
            }
            return null;
        }
        /**
         * helper function to get the widget from a given page given the widgetId
         * */
        function search(page,id){
           let obj = page;
            if(obj.type && obj.type === "component" && obj.props && obj.props.id && obj.props.id === id){
                console.log(obj.props.id);
                    return obj;
            }
            else if(obj.content){
                let x = null;
                for (let i = 0; i < obj.content.length ; i++) {
                    x = x || search(obj.content[i],id);
                }
                return x;
            }
        }

        let widgetId = dashboardLayout.selectedItem.config.content[0].props.id;
        let page = getPage(this.props.getDashboard(),this.props.getPageId());
        let widget = search(page,widgetId);

        if(isInputChecked){
            this.state.options[i].defaultData = true;
            this.setState({options: this.state.options});
        }
        else{
            this.state.options[i].defaultData = false;
            this.setState({options: this.state.options});
        }
        console.log(event.target.id);

        let optionId = event.target.id;
        let options = widget.props.configs.options;

        for (let i = 0; i < options.length; i++) {
            if(options[i].id === optionId){
                options[i].defaultData = this.state.checked;
            }
        }
        console.log(options);
        console.log(widget);

        //  console.log("+++++++++++++++++++++++++++++/////////////////////+++++++++++++++++++");
        // console.log(dashboardLayout);        
        // console.log(dashboardLayout.selectedItem);        
        // console.log(dashboardLayout.selectedItem.config.content[0].props.id);
        // console.log("+++++++++++++++++++++++++++++/////////////////////+++++++++++++++++++");        
        // console.log("================================================");
        // console.log(this.props.getDashboard());
        // console.log("================================================");
        // console.log("HERE");
        // console.log(this.props.getPageId());
        // console.log("page",page);
        // let widget = search(page,dashboardLayout.selectedItem.config.content[0].props.id);
        // console.log("=================WIDGET===============================");
        // console.log(widget);
        // widget.props.configs.options[0].defaultData ="NEW";
        // console.log(widget);
        // console.log("================================================");
        // console.log("+++++++++++++++++++++++++++++ChangedWIDGET+++++++++++++++++++");
        // let widget2 = search(page,dashboardLayout.selectedItem.config.content[0].props.id);
        //  console.log(widget2);
        // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        this.props.updateDashboardByWidgetConfPanel(this.props.getDashboard());
        console.log(this.props.getDashboard());
    }



    handlePreferenceTextBoxEvent(event, newValue) {
      console.log("event",event);
      console.log(newValue);
        let optionId = event.target.id;

        /**
         * helper function to get the page from a given dashboard given the pageId
         * */
        function getPage(dashboard,pageID){
            let pages = dashboard.pages;
            if(pages){
                for (let i = 0; i < pages.length; i++) {
                    let page = pages[i];
                    if(page.id === pageID ){
                        return page;
                    }
                }
            }
            return null;
        }
        /**
         * helper function to get the widget from a given page given the widgetId
         * */
        function search(page,id){
           let obj = page;
            if(obj.type && obj.type === "component" && obj.props && obj.props.id && obj.props.id === id){
                console.log(obj.props.id);
                    return obj;
            }
            else if(obj.content){
                let x = null;
                for (let i = 0; i < obj.content.length ; i++) {
                    x = x || search(obj.content[i],id);
                }
                return x;
            }
        }

        var WidgetId = dashboardLayout.selectedItem.config.content[0].props.id;
        let page = getPage(this.props.getDashboard(),this.props.getPageId());
        let widget = search(page,WidgetId);

        let options = widget.props.configs.options;

        for (let i = 0; i < options.length; i++) {
            if(options[i].id === optionId){
                options[i].defaultData = newValue;
                this.state.options[i].defaultData = newValue;
                this.setState({options: this.state.options});
            }
        }
        console.log(options);
        console.log(widget);

        console.log(this.props.getDashboard());
        this.props.updateDashboardByWidgetConfPanel(this.props.getDashboard());
    }

    handlePreferenceSelectListEvent(event, key, payload) {
        console.log("event",event);
        console.log(payload);
        let optionId = event.target.parentElement.parentElement.parentElement.id;

        /**
         * helper function to get the page from a given dashboard given the pageId
         * */
        function getPage(dashboard,pageID){
            let pages = dashboard.pages;
            if(pages){
                for (let i = 0; i < pages.length; i++) {
                    let page = pages[i];
                    if(page.id === pageID ){
                        return page;
                    }
                }
            }
            return null;
        }
        /**
         * helper function to get the widget from a given page given the widgetId
         * */
        function search(page,id){
           let obj = page;
            if(obj.type && obj.type === "component" && obj.props && obj.props.id && obj.props.id === id){
                console.log(obj.props.id);
                    return obj;
            }
            else if(obj.content){
                let x = null;
                for (let i = 0; i < obj.content.length ; i++) {
                    x = x || search(obj.content[i],id);
                }
                return x;
            }
        }

        let WidgetId = dashboardLayout.selectedItem.config.content[0].props.id;
        let page = getPage(this.props.getDashboard(),this.props.getPageId());
        let widget = search(page,WidgetId);

        let options = widget.props.configs.options;
        for (let i = 0; i < options.length; i++) {
            if(options[i].id === optionId){
                options[i].defaultData = payload;
                this.state.options[i].defaultData = payload;
                this.setState({options: this.state.options});
            }
        }
        console.log(options);
        console.log(widget);
        console.log(this.props.getDashboard());
        this.props.updateDashboardByWidgetConfPanel(this.props.getDashboard());
    }

    persistPubSubWiringInDashboardJSON(content, subscriberId, publisherId) {
        content.forEach(contentItem => {
            if (contentItem.type !== 'component') {
                this.persistPubSubWiringInDashboardJSON(contentItem.content, subscriberId, publisherId)
            } else {
                if (subscriberId === contentItem.props.id) {
                    if (!contentItem.props.configs.pubsub.publishers) {
                        contentItem.props.configs.pubsub.publishers = [];
                    }
                    contentItem.props.configs.pubsub.publishers.push(publisherId.toString())
                }
            }
        });
    }

    unpersistPubSubWiringInDashboardJSON(content, subscriberId, publisherId) {
        content.forEach(contentItem => {
            if (contentItem.type !== 'component') {
                this.unpersistPubSubWiringInDashboardJSON(contentItem.content, subscriberId, publisherId)
            } else {
                if (subscriberId === contentItem.props.id) {
                    let position = contentItem.props.configs.pubsub.publishers.indexOf(publisherId);
                    contentItem.props.configs.pubsub.publishers.splice(position, 1);
                }
            }
        });
    }

    getPublishers() {
        let publishers = [];
        if (dashboardLayout.selectedItem &&
            dashboardLayout.selectedItem.config.content[0].props.configs.pubsub.types.indexOf("subscriber") !== -1) {
            for (let [key, val] of pubsubComponent.getPublishersMap().entries()) {
                this.state.checked = !!(dashboardLayout.selectedItem.config.content[0].props.configs.pubsub.publishers &&
                    dashboardLayout.selectedItem.config.content[0].props.configs.pubsub.publishers.indexOf(val) !== -1);
                publishers.push(<Checkbox id={val}
                                          label={key.substring(0, key.length - 4)}
                                          name={key}
                                          onCheck={this.handlePublisherCheckBoxEvent}
                                          checked={this.state.checked}
                                          className="publishers-list"/>)
            }
        }
        return publishers;
    }


    getPreferences() {
        let preferences = [];
        if (dashboardLayout.selectedItem && dashboardLayout.selectedItem.config.content[0].props.configs) {
            console.log(dashboardLayout.selectedItem.config.content[0].props.configs.options);
            let options = dashboardLayout.selectedItem.config.content[0].props.configs.options;
            // preferences = options;
            console.log(dashboardLayout.selectedItem);
            if(options != undefined){
               
                for(let i =0 ; i< options.length; i++){
                    switch (options[i].type){
                        case "TypeText":
                            preferences.push(<div>
                                {options[i].title} : <TextField id = {options[i].id}
                                                        hintText={this.state.options[i].defaultData}
                                                        onChange={this.handlePreferenceTextBoxEvent}
                                                        name={options[i].title}/>
                            </div>);
                            console.log(options[i].defaultData)
                            break;
                        case "TypeEnum":
                            let items = [];
                            if(options[i].possibleValues){
                                for (let j = 0; j < options[i].possibleValues.length ; j++) {
                                    items.push( <MenuItem key={options[i].possibleValues[j]} id = {options[i].id} value={options[i].possibleValues[j]} primaryText={options[i].possibleValues[j]} />)
                                }
                            console.log(options[i].defaultData)
                            }
                            preferences.push(<div>
                                {options[i].title} : <SelectField 
                                onChange = {this.handlePreferenceSelectListEvent}
                                value = {this.state.options[i].defaultData}
                                id ={options[i].id} >
                                    {items}
                                </SelectField>
                            </div>);
                            break;
                        case "TypeBoolean":
                            preferences.push(<div>
                                <Checkbox id={options[i].id}
                                          label={options[i].title}
                                          name={options[i].title}
                                          onCheck={this.handlePreferenceCheckBoxEvent}
                                          checked={this.state.options[i].defaultData}/>
                            </div>);
                            console.log(options[i].defaultData)
                            break;
                        default :
                            break;

                    }
                }
            }

        }
        return preferences;
    }

    render() {
        const items = [
            <MenuItem key={1} value={1} primaryText="Monaco" />,
            <MenuItem key={2} value={2} primaryText="Arial" />,
            <MenuItem key={3} value={3} primaryText="Console" />,
        ];

        return (<Drawer open={this.props.open} openSecondary={true}
                        containerStyle={styles.widgetDrawer}
                        containerClassName="widget-configuration-panel">
            {/*<div className="widget-configuration-panel-header"><FormattedMessage id="widget.configuration" defaultMessage="Widget Configuration"/></div>*/}
            {/*<div><FormattedMessage id="publisher.list.heading" defaultMessage="PublishersList"/></div>*/}
            <div>
                <h1>Widget Configuration</h1>
                <h2>Options</h2>
                {this.getPreferences()}

                {/*<div>*/}
                        {/*Widget Name :<TextField hintText="Sample Widget" /><br />*/}
                        {/*Widget Title :<TextField hintText="Sample Widget Title" /><br />*/}
                        {/*Widget Title Font :<SelectField>*/}
                        {/*{items}*/}
                    {/*</SelectField>*/}
                    {/*<Checkbox label="Title is Bold"/>*/}
                    {/*/!*<List>*!/*/}
                        {/*/!*<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />*!/*/}
                        {/*/!*<ListItem primaryText="Starred" leftIcon={<ActionGrade />} />*!/*/}
                        {/*/!*<ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />*!/*/}
                        {/*/!*<ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />*!/*/}
                        {/*/!*<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />*!/*/}
                    {/*/!*</List>*!/*/}
                        {/*/!*Title Font :  <select name="OptionDropDown">*!/*/}
                        {/*/!*<option value="Option1"><font face="Monaco">Monaco</font></option>*!/*/}
                        {/*/!*<option value="Option1"><font face="Arial">Arial</font></option>*!/*/}
                        {/*/!*<option value="Option1"><font face="Console">Console</font></option>*!/*/}
                        {/*/!*</select>*!/*/}
                        {/*/!*<br/><br/> Bold Text : <input type="checkbox" name="BarChart" value="BarChart"/>*!/*/}
                {/*</div>*/}

            </div>
        </Drawer>);
    }

}
export default WidgetConfigurationPanel;

class UserPreferences extends React.Component {

    constructor(props) {
        super(props);
        this.options = [  {
            id: "titleText",
            title: "Title Text",
            type : "text",
            defaultData : "Sample Widget Title"
        },
            {
                id: "titleFont",
                title: "Title Font",
                type : "enum",
                possibleValues : ["Monaco","Arial","Consolas"],
                defaultData : "Monaco"
            },
            {
                id: "isPieChart",
                title: "is Pie Chart",
                type : "boolean",
                defaultData : "true"
            }]

        this.state = {
            options: []
        }
    }

    createOptions(options){

        let element = [];

       options.forEach(function (item,index){
           element.push(item);
       } );

        return element;
    }

    render() {
        return (
            <div>
                <h1>this is my component</h1>
            </div>
        );
    }
}
