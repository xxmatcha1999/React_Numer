import React from 'react'
import { Input } from 'antd'

import {Matrix2Input} from './Source/Matrix'
import '../css/cubic_spline.css'
import { Button } from 'antd'

import axios from 'axios'
let apiUrl = "http://localhost:4040/data/interpolation/Cubic-spline?key=45134Asd4864wadfad"

let Spline = require('cubic-spline');
class Cubic_spline extends React.Component{

    state = {
        rows: 2,
        Matrix: [[],[]],
        X: 0,
        Answer: '',
        
    }

    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            let row = data["row"];

            if(row > parseInt(this.state.rows)){
                let r = parseInt(this.state.rows);
                for(let i = r;i < row;i++){
                    this.AddMatrix();
                }
            }
            else{
                let r = parseInt(this.state.rows);
                for(let i = r;i > row;i--){
                    this.DelMatrix();
                }
            }
                
            this.setState({Matrix: data["Matrix"],X: data["X"]})

          } catch (error) {
            this.setState({Answer : "Not Sync"})
          }

    }

    getdata_ = (e) => {
        this.gatdata();
    }

    AddMatrix = (e) =>{
        let Matrix = this.state.Matrix;
        Matrix.push([]);
        this.setState({Matrix: Matrix})
        this.setState({rows: this.state.rows+1})
    }

    DelMatrix = (e) =>{
        if(this.state.rows > 2){
            this.setState({rows: this.state.rows-1})
            let Matrix = this.state.Matrix;
            Matrix.pop();
            this.setState({Matrix: Matrix})
        }
    }

    Input = (e) =>{
        let arr = [];
        let Matrix = this.state.Matrix;
        arr = e.target.name.split(',');
        Matrix[parseInt(arr[0])][parseInt(arr[1])] = e.target.value;
        this.setState({Matrix: Matrix})
    }

    GetX = (e) =>{
        let X = this.state.X;
        X = e.target.value;
        this.setState({X: X})
    }

    Calculate = (e) =>{
        let Matrix = this.state.Matrix
        let xs = []
        let ys = [];
        for(let i = 0;i < Matrix.length;i++){
            xs.push(parseFloat(Matrix[i][0]));
            ys.push(parseFloat(Matrix[i][1]));
        }

        let spline = new Spline(xs, ys);

        this.setState({Answer : spline.at(parseFloat(this.state.X))})
    }

    render(){
        return(
            <div className='allincompro'>
                <h2>Cubic-spline</h2>
                <div>
                    <Button className='Button_' type="primary" onClick={this.AddMatrix}>Add Point</Button>
                    <Button className='Button_' type="primary" onClick={this.DelMatrix}>Delete Point</Button>
                    <Button className='Button_' type="primary" onClick={this.Calculate}>Calculate</Button>
                    <Button type="primary" onClick={this.getdata_} >Get example</Button>
                </div>
                <span className="Text_Input_2"> X value : </span>
                <span><Input onChange={this.GetX} value={this.state.X} className="Input_2"/></span>
                <Matrix2Input row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                <div>{this.state.Answer}</div>
            </div>
        )
    }
}

export default Cubic_spline;