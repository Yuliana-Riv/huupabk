'use strict'

class tagModel {
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
    
   async getAll() {
        let response;

        try {
            response = await  this.repository.getAll();
         
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getById(id) {
        let response;

        try {
            response = await  this.repository.getById(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    
    async getByPayment(id) {
        let response;

        try {
            response = await  this.repository.getByPayment(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }
    async updateCancelado(id) {
        let response;

        try {
            response = await  this.repository.updateCancelado(id);
          
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

    async updateLabel(data) {
        let response;

        try {
            response = await  this.repository.updateLabel(data);
          
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

module.exports = tagModel;