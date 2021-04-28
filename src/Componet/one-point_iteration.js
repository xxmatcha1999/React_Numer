import React from 'react'

import { Input } from 'antd';
import { Button } from 'antd';

import '../css/one_point.css'
import axios from 'axios'
let apiUrl = "http://localhost:4040/data/root/One-point_iteration?key=45134Asd4864wadfad"
// let apiUrl = "https://my-json-server.typicode.com/pudjapu/react_wep/root"
class One_point extends React.Component{

    state = {
        Equation: '',
        X: '',
        ERROR: '',
        result: '',
      };

      async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            this.setState({Equation: data["eqtion"],X: data["x"],ERROR: data["error"]})

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
    
    getX = (e) => {
        this.setState({
            X: e.target.value,
        });
    };

    show_value = (e) =>{

        try {
            const Parser = require('expr-eval').Parser;

        let i = 1;
        let arr = [];

        let Equation = this.state.Equation;
        let X = this.state.X;
        X = parseFloat(X);
        let ERROR = this.state.ERROR;
        ERROR = parseFloat(ERROR);

        var expression = Parser.parse(Equation);

        let x1,error_1;
        let err = 99999999;

        while(err > ERROR){
            x1 = expression.evaluate({ x: X })
            error_1 = Math.abs((x1-X)/x1)

            if(err === error_1){
                break;
            }
            arr.push(<div className='result' key={i}>Iteration {i} : {x1}</div>);
            i++;

            err = error_1;
            X = x1;
        }
        if(arr.length === 0){
            this.setState({result: 'Is Diverge'})
        }
        else{
            this.setState({result: arr})
        }
        } catch(e){
            this.setState({result : "No data"})
        }

        
    }

    render(){
        return(
            <div className="allincompro">
                <h2>One-point iteration</h2>
                <div>
                    <span><Input onChange={this.getEquation} className="Input" value={this.state.Equation}/></span>
                    <span className="Calculate_Button"><Button type="primary" onClick={this.show_value} >Calculate</Button></span>
                    <span className="Calculate_Button"><Button type="primary" onClick={this.getdata_} >Get example</Button></span>
                </div>
                <div>
                <span className="Text_Input_2"> X เริ่มต้น : </span>
                    <span><Input onChange={this.getX} className="Input_2"value={this.state.X}/></span>
                    <span className="Text_Input_2"> ERROR : </span>
                    <span><Input onChange={this.getERR} className="Input_2" value={this.state.ERROR}/></span>
                </div>
                {this.state.result}
            </div>
        )
    }

}

export default One_point;