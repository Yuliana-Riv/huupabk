'use strict'

class addressModel {
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
    async getByUser(id_user) {
        let response;

        try {
            response = await  this.repository.getByUser(id_user);
          
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


    
    async findImagesProd(id) {
        let response;

        try {
            response = await  this.repository.findImagesProd(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async findImage(id) {
        let response;

        try {
            response = await  this.repository.findImage(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    
    async addImagesProd(id_prod,  image) {
        let response;
        try {
            response = await  this.repository.addImagesProd(id_prod,  image);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

  
    async deleteImageProd(id) {
        let response;
        try {
            response = await  this.repository.deleteImageProd(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

 

};

module.exports = addressModel;