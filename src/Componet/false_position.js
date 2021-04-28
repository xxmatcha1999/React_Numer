import React from 'react';

import { Input } from 'antd';
import { Button } from 'antd';
import axios from 'axios'
import '../css/false_position.css';

let apiUrl = "http://localhost:4040/data/root/False_position?key=45134Asd4864wadfad"
// let apiUrl = "https://my-json-server.typicode.com/pudjapu/react_wep/root"

class False_position extends React.Component{

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
            const Parser = require('expr-eval').Parser; // ฟั่งชั้นแปลงสมการ
        let i = 1;
        let arr = [];
        let err = 1;
        let Xnew;

        let Equation = this.state.Equation;
        let XL = this.state.XL;
        XL = parseFloat(XL);
        let XR = this.state.XR;
        XR = parseFloat(XR);
        let ERROR = this.state.ERROR;
        ERROR = parseFloat(ERROR);

        var expression = Parser.parse(Equation);

        let X = ((XL*expression.evaluate({ x: XR }))-(XR*expression.evaluate({ x: XL })))/(expression.evaluate({ x: XR })-expression.evaluate({ x: XL }))

        if(expression.evaluate({ x: X }) > 0){
            XR = X;
        }
        else{
            XL = X;
        }

        //(expression.evaluate({ x: X }) > 0) ? (XR = X) : (XL = X)

        while(err > ERROR){
            Xnew = ((XL*expression.evaluate({ x: XR }))-(XR*expression.evaluate({ x: XL })))/(expression.evaluate({ x: XR })-expression.evaluate({ x: XL }))

            if(expression.evaluate({ x: Xnew })*expression.evaluate({ x: XR })){
                XR = Xnew
            }
            else{
                XL = Xnew
            }

            //((expression.evaluate({ x: Xnew })*expression.evaluate({ x: XR })) > 0) ? (XR = Xnew) : (XL = Xnew)
            arr.push(<div className='result' key={i}>Iteration {i} : {Xnew}</div>);
            err = Math.abs((Xnew-X)/Xnew);
            X = Xnew;
            i++;
        }
        this.setState({result: arr})
        } catch(e){
            this.setState({result : "No data"})
        }

        
    }

    render(){
        return(
            <div className="allincompro">
                <h2>False position</h2>
                <div>
                    <span><Input onChange={this.getEquation} className="Input" value={this.state.Equation}/></span>
                    <span className="Calculate_Button"><Button type="primary" onClick={this.show_value} >Calculate</Button></span>
                    <span className="Calculate_Button"><Button type="primary" onClick={this.getdata_} >Get example</Button></span>
                </div>
                <div>
                    <span className="Text_Input_2"> XL : </span>
                    <span><Input onChange={this.getXL} className="Input_2" value={this.state.XL}/></span>
                    <span className="Text_Input_2"> XR : </span>
                    <span><Input onChange={this.getXR} className="Input_2" value={this.state.XR}/></span>
                    <span className="Text_Input_2"> ERROR : </span>
                    <span><Input onChange={this.getERR} className="Input_2" value={this.state.ERROR}/></span>
                </div>
                {this.state.result}
            </div>
        )
    }

    
}

export default False_position;