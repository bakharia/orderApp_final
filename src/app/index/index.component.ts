import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as Data from '../../assets/'

//import {PizzaModel} from '../model/pizza.model'; 

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  pizzas: any= [];
  //selectedLevel;
  tprice:any = [];
  amt:any = [];
  fprice: any;
  order:boolean = false;
  opizzas: any = [];

  constructor(
    private httpClient: HttpClient,
    //public pizza : PizzaModel,
    ) { 
      this.fprice = 0;
  }

  //pizza: PizzaModel;
  //size: number = 0;
  ngOnInit(): void {
    this.httpClient.get('../../assets/pizzas.json').subscribe(data => {
      //console.log(data);
      this.pizzas = data;
    })
    //console.log(this.size);
    //this.initprice(this.getsize(this.pizzas));
  }

  initprice(){
    for(let x in this.pizzas){
      this.tprice.push(0);
      this.amt.push(0);
    }
  }
  findIndex(name):number
  {
    var index = 0;
    for(let item of this.pizzas)
    {
      //console.log(item);
      if(item.name == name)
        return index;
      index ++;
    }
  }
  getsize(p:any){
    let size = 0;
    for(let i in p)
    {
      size +=1;
    }
    return size;
  }

  totalprice(event,name,price){
     // console.log(event.target.value);
      this.tprice[this.findIndex(name)] = event.target.value*price;
      this.amt[this.findIndex(name)] = event.target.value;
      //console.log(this.tprice[this.findIndex(name)]);
      this.finalprice();
      this.orderedpizzas();
  }
  
  finalprice()
  {
    this.fprice = 0;
    for(let x in this.tprice)
    {
      this.fprice += this.tprice[x];
    }
  }

  orderedpizzas()
  {
    for(let x in this.tprice){
      if(this.tprice[x] != 0 && this.opizzas[x] == undefined)
        this.opizzas.push(this.pizzas[x]);
      else if(this.tprice[x] != 0 && this.opizzas[x] != undefined)
        this.opizzas[x] = this.pizzas[x];
    }
  }
  placeorder()
  {
    this.order = !this.order;
  }
  reset()
  {
    this.order = !this.order;
    this.fprice = 0;
    for(let x in this.tprice)
    {
      this.tprice[x] = 0;
      this.amt[x] = 0;
    }
  }
}