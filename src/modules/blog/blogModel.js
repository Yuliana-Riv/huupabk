'use strict'

class blogModel {
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

    async getImages() {
        let response;

        try {
            response = await  this.repository.getImages();
         
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

    async getById(id) {
        let response;

        try {
            response = await  this.repository.getById(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }
    
    async getByCategory(id) {
        let response;

        try {
            response = await  this.repository.getByCategory(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getByEtiqueta(id) {
        let response;

        try {
            response = await  this.repository.getByEtiqueta(id);
          
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

    async getTags(id) {
        let response;

        try {
            response = await  this.repository.getTags(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getColab(id) {
        let response;

        try {
            response = await  this.repository.getColab(id);
          
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

    async createTag(data) {
        let response;

        try {
            response = await  this.repository.createTag(data);
          
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
    

    async updateImg(id_blog, image) {
        let response;

        try {
            response = await  this.repository.updateImg(id_blog, image);
          
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

    async deleteTag(id) {
        let response;

        try {
            response = await  this.repository.deleteTag(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

   

};

module.exports = blogModel;