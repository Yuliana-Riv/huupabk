'use strict'

class atributoModel {
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

    async getAtributoValores(id_atributo) {
        let response;
        try {
            response = await  this.repository.getAtributoValores(id_atributo);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async create(name) {
        let response;

        try {
            response = await  this.repository.create(name);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async createValor(id_atributo, valor) {
        let response;

        try {
            response = await  this.repository.createValor(id_atributo, valor);
          
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

    async deleteValor(id) {
        let response;

        try {
            response = await  this.repository.deleteValor(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

   

};

module.exports = atributoModel;