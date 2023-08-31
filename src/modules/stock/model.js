'use strict'

class product_stockModel {
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

    async getByProduct(id) {
        let response;

        try {
            response = await  this.repository.getByProduct(id);
          
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


    async create(data) {
        let response;

        try {
            response = await  this.repository.create(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async update(data) {
        let response;

        try {
            response = await  this.repository.update(data);
          
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

module.exports = product_stockModel;