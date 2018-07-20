import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FormGroup, ControlLabel} from 'react-bootstrap';
import { PulseLoader as Loader} from 'react-spinners';

export class Table extends Component{

    render(){
        return(
            <div className='container Column' style={{marginRight: '20px', marginTop: '40px'}}>
                <div> <b>Weather Forecast For One Week</b></div>
                {this.props.loading && <div style={{margin: 'auto'}}><Loader
                    color={'dodgerblue'}
                    loading={this.props.loading}
                /></div>}
                {!this.props.loading &&
                (<div>
                <FormGroup
                    controlId="formControlsSelect"
                    bsSize="small">
                    {(this.props.city || this.props.state) && (
                        <div style={{marginTop: '5px'}}>
                        <ControlLabel>Location: </ControlLabel> <ControlLabel>{this.props.city}</ControlLabel> <ControlLabel>, {this.props.state}</ControlLabel>
                        </div>
                    )}
                </FormGroup>
                <BootstrapTable hover stripped data={this.props.data}>
                    <TableHeaderColumn dataField='date' isKey={true} width='150'>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='day' width='150'>Day</TableHeaderColumn>
                    <TableHeaderColumn dataField='high' width='150'>High (F)</TableHeaderColumn>
                    <TableHeaderColumn dataField='low' width='150'>Low (F)</TableHeaderColumn>
                    <TableHeaderColumn dataField='text' width='150'>Summary</TableHeaderColumn>
                </BootstrapTable>
                </div>)}
            </div>
        );
    }
};

export default Table;