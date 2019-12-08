const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Movie = require('./models/movie_model');

router.get('/', (req, res, next) => {
  Movie.find()
        // .select('_id name price')
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                movies: docs.map(doc => {
                    return {
                        movie: doc,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/movies/" + doc._id
                        }
                    }
                })
            }
            // if (docs.length >= 0) {
                res.status(200).json(response);
            // } else {
            //     res.status(404).json({
            //         message: 'No entries found'
            //     });
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        rating: req.body.rating,
        description: req.body.description
    });
    movie
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Created movie successfully',
                createdProduct: {
                    name: result.name,
                    rating: result.rating,
                    review: result.review,
                    _id: result.id
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/movies/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:movieID', (req, res, next) => {
    const id = req.params.productID;
    Movie.findsById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'Get all movies',
                    url: 'http://localhost:3000/movies'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:movieID', (req, res, next) => {
    const id = req.params.productID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Movie.updateOne({ _id: id}, {$set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Movie updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/movies/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:movieID', (req, res, next) => {
    const id = req.params.productID;
    Movie.deleteOne({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Movie deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/movies',
                    body: { name: 'String', rating: 'Number', review: 'String'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;
