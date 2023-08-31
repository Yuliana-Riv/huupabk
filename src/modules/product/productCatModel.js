"use strict";

class productModel {
  constructor(repository) {
    this.repository = repository;
  }
  async findAll() {
    let response;

    try {
      response = await this.repository.findAll();
    } catch (error) {
      throw error;
    }

    return response;
  }
  async findById(id) {
    let response;

    try {
      response = await this.repository.findById(id);
    } catch (error) {
      throw error;
    }

    return response;
  }
  async findByProduct(id) {
    let response;

    try {
      response = await this.repository.findByProduct(id);
    } catch (error) {
      throw error;
    }

    return response;
  }
  async findByCategory(id) {
    let response;

    try {
      response = await this.repository.findByCategory(id);
    } catch (error) {
      throw error;
    }

    return response;
  }
  async search(value) {
    let response;
    try {
      response = await this.repository.search(value);
    } catch (error) {
      throw error;
    }

    return response;
  }
  async create(data) {
    let response;
    try {
      response = await this.repository.create(data);
    } catch (error) {
      throw error;
    }

    return response;
  }
  async update(data) {
    let response;
    try {
      response = await this.repository.update(data);
    } catch (error) {
      throw error;
    }

    return response;
  }
  async delete(id) {
    let response;
    try {
      response = await this.repository.delete(id);
    } catch (error) {
      throw error;
    }

    return response;
  }
}

module.exports = productModel;
