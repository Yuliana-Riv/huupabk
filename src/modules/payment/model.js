'use strict'

class paymentModel {
    constructor(repository){
        this.repository = repository;
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

    async getById(id){
        let response;
        try {
            response = await  this.repository.getById(id);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async getByOrderId(id){
        let response;
        try {
            response = await  this.repository.getByOrderId(id);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async getAll(){
        let response;
        try {
            response = await  this.repository.getAll();
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async search(value){
        let response;
        try {
            response = await  this.repository.search(value);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async getByClient(id){
        let response;
        try {
            response = await  this.repository.getByClient(id);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async getPaymentBilling(id){
        let response;
        try {
            response = await  this.repository.getPaymentBilling(id);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async getPaymentCoupons(id){
        let response;
        try {
            response = await  this.repository.getPaymentCoupons(id);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async getPaymentDetail(id){
        let response;
        try {
            response = await  this.repository.getPaymentDetail(id);
        } catch(error) {
            throw error;
        }
        return  response;

    }
    


    async create(data) {
        let response;

        try {
            response = await  this.repository.create(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async create_billing(data) {
        let response;

        try {
            response = await  this.repository.create_billing(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async create_detail(data) {
        let response;

        try {
            response = await  this.repository.create_detail(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async create_payment_coupons(data) {
        let response;

        try {
            response = await  this.repository.create_payment_coupons(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async delete(id){
        let response;
        try {
            response = await  this.repository.delete(id);
        } catch(error) {
            throw error;
        }
        return  response;

    }


    async updateOrderID(id, value){
        let response;
        try {
            response = await  this.repository.updateOrderID(id, value);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async updateCustomerID(id, value){
        let response;
        try {
            response = await  this.repository.updateCustomerID(id, value);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async updateReceipt(id, value){
        let response;
        try {
            response = await  this.repository.updateReceipt(id, value);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async updateStatus(id, value){
        let response;
        try {
            response = await  this.repository.updateStatus(id, value);
        } catch(error) {
            throw error;
        }
        return  response;

    }

    async updateTrackingNumber(id, value) {
        let response;
        try {
            response = await  this.repository.updateTrackingNumber(id, value);
        } catch(error) {
            throw error;
        }
        return  response;
    }



   

};

module.exports = paymentModel;