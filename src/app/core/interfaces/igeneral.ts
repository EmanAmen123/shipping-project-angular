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
  paymentType : string;
  products:[name:string,quantity:number,weight:number]
  shippingMethod :string
  shippingTypeId :number;
  totalWeight :number;
  villageStreetAddress :string|null;
  phonenumber:string;
  address:string;
  branchId:number;
  merchentId:number
}

///////////////////////////////////branches component//////////////////////////
export interface Ibranch{
  date : Date;
  id :number; 
  isDeleted :boolean;
  name : string;
}
///////////////////////////////////employee//////////////////////////

export interface IEmployee{
  name : string;
  email :string; 
  password :string;
  address : string;
  userRole: string;
  phoneNumber: string;
  branchId: number;
}
///////////////////////////////////Reports//////////////////////////

export interface Ireport{
  city : string;
  companyPersent :number; 
  customerName :string;
  customerPhone : string;
  governorate: string;
  id: number;
  merchantName: string;
  orderDate: Date;
  orderPrice: number;
  orderStatus: string;
  paidShippingPrice: number;
  shippingPrice: number;
  totalCoast: number;
}
/////////////////////////////status////////////////////////////////////////
