import React from 'react'
import '../css/polynomial.css'
import { Input } from 'antd'
import { Button } from 'antd'


import axios from 'axios'
let apiUrl = "http://localhost:4040/data/interpolation/polynomial?key=45134Asd4864wadfad"

class Polynomial extends React.Component{

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
            this.setState({result : "Not Sync"})
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

    MakeMatrix = (e) => {
        let rows = this.state.rows;
        rows = parseInt(rows);
        let columns = 2;

        let wow = [];
        let i,j
        for(i= 0;i < rows;i++){
            for(j = 0; j < columns;j++){
                wow.push(<span className="MyInput"><Input name={i.toString()+','+j.toString()} onChange={this.Getvalue} className="Input_2" style={{margin: '5px'}} value={this.state.Matrix[i][j]}/></span>)
            }
            wow.push(<div></div>)
        }
        return(wow);
    }

    Getvalue = (e) => {
        let arr = [];
        let Matrix = this.state.Matrix;
        arr = e.target.name.split(',');
        Matrix[parseFloat(arr[0])][parseFloat(arr[1])] = e.target.value;
        this.setState({Matrix: Matrix})
    }

    GetX = (e) =>{
        let X = this.state.X;
        X = e.target.value;
        this.setState({X: X})
    }

    Calculate = (e) =>{

        var interpolatingPolynomial = require('interpolating-polynomial')

        let Matrix = this.state.Matrix;
        let rows = this.state.rows;
        rows = parseInt(rows);

        let X = this.state.X;
        X = parseFloat(X)

        let i,f,Answer

        for(i = 0;i < rows;i++){
            Matrix[i][0] = parseFloat(Matrix[i][0]);
            Matrix[i][1] = parseFloat(Matrix[i][1]);
        }

        f = interpolatingPolynomial(Matrix);

        Answer = f(X)

        this.setState({Answer: "f(x) : "+Answer.toString()})
    }

    render(){
        return(
            <div className='allincompro'>
                <h2>Polynomial</h2>
                <div>
                    <Button className='Button_' type="primary" onClick={this.AddMatrix}>Add Point</Button>
                    <Button className='Button_' type="primary" onClick={this.DelMatrix}>Delete Point</Button>
                    <Button className='Button_' type="primary" onClick={this.Calculate}>Calculate</Button>
                    <Button type="primary" onClick={this.getdata_} >Get example</Button>
                </div>
                <div>
                    X : <Input onChange={this.GetX}  value={this.state.X} style={{margin: '5px' ,  width: 150}} width/>
                </div>
                <div>{this.MakeMatrix()}</div>
                {this.state.Answer}
            </div>
        )
    }
}

export default Polynomial