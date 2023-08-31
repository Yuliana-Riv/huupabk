'use strict'

class couponModel {
    constructor(repository){
        this.repository = repository;
    }

    async findAll(){
        let response;
        try {
            response = await  this.repository.findAll();
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async findCouponsPurchase(email, code){
        let response;
        try {
            response = await  this.repository.findCouponsPurchase(email, code);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async search(value) {
        let response;
        try {
            response = await  this.repository.search(value);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async findById(id) {
        let response;

        try {
            response = await  this.repository.findById(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async findByCode(code) {
        let response;

        try {
            response = await  this.repository.findByCode(code);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async findRProd(id){
        let response;
        try {
            response = await  this.repository.findRProd(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async findRCat(id){
        let response;
        try {
            response = await  this.repository.findRCat(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async findRCust(id){
        let response;
        try {
            response = await  this.repository.findRCust(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async last(){
        let response;
        try {
            response = await  this.repository.last();
        } catch(error) {
            throw error;
        }
        return  response;

    }


   
    
    async create(coupon) { 
        let response;
        try {
            response = await  this.repository.create(coupon);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async update(coupon) { 
        let response;
        try {
            response = await  this.repository.update(coupon);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async create_rcustomer(id_cuopon, customer_email, type) {

        let response;
        try {
            response = await  this.repository.create_rcustomer(id_cuopon, customer_email, type);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async create_rcategory(id_cuopon, category, type) {

        let response;
        try {
            response = await  this.repository.create_rcategory(id_cuopon, category, type);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async create_rproduct(id_cuopon, product, type) {

        let response;
        try {
            response = await  this.repository.create_rproduct(id_cuopon, product, type);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async delete_rcustomer(id) {
        let response;
        try {
            response = await  this.repository.delete_rcustomer(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async delete_rproduct(id) {
        let response;
        try {
            response = await  this.repository.delete_rproduct(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async delete_rcategory(id) {
        let response;
        try {
            response = await  this.repository.delete_rcategory(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async delete(id) {
        let response;
        try {
            response = await  this.repository.delete(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


  
};

module.exports = couponModel;