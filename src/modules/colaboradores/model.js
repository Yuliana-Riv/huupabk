'use strict'

class colaboradoresModel {
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

    async getByUrl(url) {
        let response;

        try {
            response = await  this.repository.getByUrl(url);
          
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

    async delete(id) {
        let response;

        try {
            response = await  this.repository.delete(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async create(item) {
        let response;
      
        try {
            response = await  this.repository.create(item);
        } catch(error) {
            throw error;
        }

        return  response;
       
    }

    async update(item) {
        let response;
      
        try {
            response = await  this.repository.update(item);
        } catch(error) {
            throw error;
        }

        return  response;
       
    }
    async updateImage(data) {
        let response;
      
        try {
            response = await  this.repository.updateImage(data);
        } catch(error) {
            throw error;
        }
        console.log(response)
        return  response;
       
    }




};

module.exports = colaboradoresModel;