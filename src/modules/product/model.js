'use strict'

class productModel {
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

   async findAll() {
        let response;

        try {
            response = await  this.repository.findAll();
         
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
    async findByCategory(id) {
        let response;

        try {
            response = await  this.repository.findByCategory(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async findByCategoryName(name) {
        let response;

        try {
            response = await  this.repository.findByCategoryName(name);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }
    async createProductAttValue(data){
        let response;

        try {
            response = await  this.repository.createProductAttValue(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async deleteProdAttValor(id) {
        let response;

        try {
            response = await  this.repository.deleteProdAttValor(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async createProductVariante(data){
        let response;

        try {
            response = await  this.repository.createProductVariante(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async deleteVariante(id) {
        let response;

        try {
            response = await  this.repository.deleteVariante(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async update_skd_class(data) {
        let response;

        try {
            response = await  this.repository.update_skd_class(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }
   
    
    async getVariantes(id_product){
        let response;

        try {
            response = await  this.repository.getVariantes(id_product);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }
   


 
    
    async findByUrl(url) {
        let response;

        try {
            response = await  this.repository.findByUrl(url);
          
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
    async getAttValuesByProd(id_product){
        let response;
        try {
            response = await  this.repository.getAttValuesByProd(id_product);
          
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

module.exports = productModel;