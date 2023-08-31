'use strict'

class blog_categoryModel {
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

    async getByBlog(id) {
        let response;

        try {
            response = await  this.repository.getByBlog(id);
          
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


    async create(id_blog,id_category) {
        let response;

        try {
            response = await  this.repository.create(id_blog,id_category);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async update(id,name) {
        let response;

        try {
            response = await  this.repository.update(id,name);
          
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

module.exports = blog_categoryModel;