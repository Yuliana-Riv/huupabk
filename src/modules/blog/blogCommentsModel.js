'use strict'

class blogCommentsModel {
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

    async findByIdBlog(id_blog) {
        let response;

        try {
            response = await  this.repository.findByIdBlog(id_blog);
          
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

module.exports = blogCommentsModel;