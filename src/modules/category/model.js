'use strict'

class categoryModel {
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
    
   async categories() {
        let response;

        try {
            response = await  this.repository.findCategories();
         
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async categoryById(id) {
        let response;

        try {
            response = await  this.repository.findCategoryById(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async findByParent(id) {
        let response;

        try {
            response = await  this.repository.findByParent(id);
         
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


    async create(name,id_parent) {
        let response;

        try {
            response = await  this.repository.create(name,id_parent);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async updateCategory(id,name,id_parent) {
        let response;

        try {
            response = await  this.repository.update(id,name,id_parent);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async deleteCategory(id) {
        let response;

        try {
            response = await  this.repository.delete(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

   

};

module.exports = categoryModel;