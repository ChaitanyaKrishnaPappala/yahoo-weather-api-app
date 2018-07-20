import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class ListBox extends Component {
    state = {
        zipCode: '',
        selectedItem: '',
        search: ''
    };

    handleZipCodeChange = (e) => {
        e.preventDefault();
        this.setState({zipCode: e.target.value})
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.setState({search: e.target.value})
    };

    handleItemClick = (e) => {
        e.preventDefault();
        this.setState({selectedItem: e.target.value})
    };

    handleAddZipCode = () => {
        this.props.addZipCode(this.state.zipCode)
    };

    handleRetrieveClick = () => {
        this.props.fetchWeatherByZipCode(this.state.selectedItem)
    };

    render() {
        return (
            <div className='container Column'>
                <div className='Input'>
                    <FormGroup controlId="formControlsText" bsSize="small">
                        <ControlLabel>Search </ControlLabel>
                        <FormControl type="text" placeholder="zipcode" bsSize="sm" onChange={this.handleSearch} value={this.state.search}/>
                    </FormGroup>
                </div>

                <div className="panel-body">
                    <ul className="list-group">
                        {this.props.zipCodes.map((value, key) => {
                            const bgColor = this.state.selectedItem == value ? 'dodgerblue' : ''
                            if(value.includes(this.state.search)){
                                return (
                                    <li key={key} value={value} className="list-group-item pointer" onClick={this.handleItemClick}
                                        style={{backgroundColor: bgColor}}>
                                        {value}
                                    </li>
                                )
                            }else{
                                return ;
                            }
                        })}
                    </ul>
                    <button className='SimpleButton' onClick={this.handleRetrieveClick} disabled={this.state.selectedItem.length == 0}> Retrieve Information</button>
                </div>

                <div className='Input'>
                    <FormGroup controlId="formControlsText" bsSize="small">
                        <ControlLabel>Enter a new zipcode</ControlLabel>
                        <FormControl
                            type="number"
                            placeholder="zipcode"
                            bsSize="sm"
                            onChange={this.handleZipCodeChange}
                            value={this.state.zipCode}
                        />
                    </FormGroup>
                    <button className='SimpleButton' onClick={this.handleAddZipCode} disabled={this.state.zipCode.length !== 5}> Add New ZipCode</button>
                </div>
            </div>
        );
    }
}

export default ListBox;
