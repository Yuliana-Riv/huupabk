'use strict'

class sale_pointsModel {
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

   

    async createImg(image) {
        let response;

        try {
            response = await  this.repository.createImg(image);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }
    

    async updateImg(id, image) {
        let response;

        try {
            response = await  this.repository.updateImg(id, image);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async delImg(image) {
        let response;

        try {
            response = await  this.repository.delImg(image);
         
        } catch(error) {
            throw error;
        }

        return  response;
    }
};

module.exports = sale_pointsModel;