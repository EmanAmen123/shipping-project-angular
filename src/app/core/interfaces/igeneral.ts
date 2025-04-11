export interface igeneral{

}
///////////////////////////////////add order component//////////////////////////

export interface ICity {
    govId: number;
    id: number;
    isDeleted: boolean;
    name: string;
    pickUpShippingPrice: number;
    shippingPrice: number;
  }
  
export interface IGovernrate {
    id: number;
    name: string;
    isDeleted: boolean; 
  }
export interface iShippingtypes{
    id:number;
    type:string;
}
///////////////////////////////////show order component//////////////////////////
export interface IOrder{
    city: string;
    customerEmail : string;
    customerName:string;
    customerPhone:string;
    governorate:string;
    id :number;
    orderDate:Date;

    orderPrice :number ; 
     orderStatus:string;
}
///////////////////////////////////edit order //////////////////////////
export interface IOrderById{
  cityId :number;
  customerEmail :string;
  customerName :string;
  customerPhone : string;
  governorateId : number;
  id :number;
  isVillageDelivery :boolean;
  orderPrice : number;
  orderStatus : string;
  paymentMethod : number;
  products:[]
  shippingMethod :string
  shippingTypeId :number;
  totalWeight :number;
  villageStreetAddress :string|null
}

///////////////////////////////////branches component//////////////////////////
export interface Ibranch{
  date : Date;
  id :number; 
  isDeleted :boolean;
  name : string;
}
