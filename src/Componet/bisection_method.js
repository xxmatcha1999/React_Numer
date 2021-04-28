import React from 'react';
import { Input } from 'antd';
import { Button } from 'antd';

import { bisection } from './Source/bisection'
import axios from 'axios'
import '../css/bisecton.css';

let apiUrl = "http://localhost:4040/data/root/Bisection?key=45134Asd4864wadfad"
// let apiUrl = "https://my-json-server.typicode.com/pudjapu/react_wep/root"


class Bisection extends React.Component{

    state = {
        Equation: '',
        XL: '',
        XR: '',
        ERROR: '',
        result: '',
      };


    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            this.setState({Equation: data["eqtion"],XL: data["xl"],XR: data["xr"],ERROR: data["error"]})

          } catch (error) {
            this.setState({result : "Not Sync"})
          }

    }

    getdata_ = (e) => {
        this.gatdata();
    }

    getEquation = (e) => {
        this.setState({
            Equation: e.target.value,
        });
    };

    getXL = (e) => {
        this.setState({
            XL: e.target.value,
        });
    };

    getXR = (e) => {
        this.setState({
            XR: e.target.value,
        });
    };

    getERR= (e) => {
        this.setState({
            ERROR: e.target.value,
        });
    };

    show_value = (e) =>{
        try{
            let data = bisection(this.state.XL,this.state.XR,this.state.ERROR,this.state.Equation);

            let i;
            let arr = [];

            for(i = 0; i < data.length;i++){
                arr.push(<div className='result' key={i}>Iteration {i+1} : {data[i][0]}</div>);
            }

            this.setState({result: arr});
        } catch(error) {
            this.setState({result : "No data"})
        }
        
    }

    render(){

        return(
            <div className="allinbisetion" >
                <div className="in_box">
                    <h2>Bisection Method</h2>
                    <div>
                        <span><Input onChange={this.getEquation} className="Input" value={this.state.Equation} /></span>
                        <span className="Calculate_Button"><Button type="primary" onClick={this.show_value} >Calculate</Button></span>
                        <span className="Calculate_Button"><Button type="primary" onClick={this.getdata_} >Get example</Button></span>
                    </div>
                    <div>
                        <span className="Text_Input_2"> XL : </span>
                        <span><Input onChange={this.getXL} className="Input_2" value={this.state.XL}/></span>
                        <span className="Text_Input_2"> XR : </span>
                        <span><Input onChange={this.getXR} className="Input_2"  value={this.state.XR} /></span>
                        <span className="Text_Input_2"> ERROR : </span>
                        <span><Input onChange={this.getERR} className="Input_2" value={this.state.ERROR}/></span>
                    </div>
                    {this.state.result}
                </div>
            </div>

        );
    }
}
export default Bisection