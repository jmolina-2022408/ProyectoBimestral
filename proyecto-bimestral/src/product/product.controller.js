'use strict';

import Product from './product.model.js';
import Category from '../category/category.model.js'
import { checkUpdate } from '../utils/validator.js';

export const save = async (req, res) => {
    try {
        let data = req.body;
        let category = await Category.findOne({ _id: data.category })
        if (!category) return res.status(404).send({ message: 'Category not found' })
        let product = new Product(data);
        await product.save();
        return res.send({ message: 'Product created successfully', product });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating product', err });
    }
}

export const get = async (req, res) => {
    try {
        let products = await Product.find().populate('category', ['name']);
        return res.send({ message: 'This is the list of products', products });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting products', err });
    }
}

export const search = async (req, res) => {
    try {
        let { search } = req.body;
        let product = await Product.find({ name: search }).populate('category', ['name', 'description'])
        if (!product) return res.status(404).send({ message: 'Product not found' });
        return res.send({ message: 'This is the list of product', product });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching product', err });
    }
}

export const update = async (req, res) => {
    try {
        let data = req.body;
        let { id } = req.params;
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' });
        let updateProduct = await Product.findOneAndUpdate({ _id: id }, data, { new: true }).populate('category', ['name', 'description'])
        if (!updateProduct) return res.status(404).send({ message: 'Product not found and not updated' })
        return res.send({ message: 'Product updated successfully', updateProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating product', err });
    }
}

export const deleteP = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedProduct = await Product.deleteOne({ _id: id });
        if (deletedProduct.deleteCount === 0) return res.status(404).send({ message: 'Product not found' })
        return res.send({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting product', err });
    }
}