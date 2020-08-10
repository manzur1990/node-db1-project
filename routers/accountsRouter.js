const express = require('express');
const db = require('../data/dbConfig');
const { insert, where, del } = require('../data/dbConfig');
const router = express.Router();


router.get('/', (req, res) => {
    db.select('*')
    .limit(5)
    .orderBy('budget', 'desc')
    .from('accounts')
    .then(accounts => 
        res.status(200).json({data:accounts}))
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
    .where('id', id)
    .first()
    .then(accounts => {
        res.status(200).json({ data: accounts })
    })
    .catch(err => console.log('get by id failed'))
});

router.post('/', (req, res) => {
    const accountAdded = req.body;
    db('accounts')
    .insert(accountAdded)
    .then(res.status(201).json({ data:accountAdded}))
    .catch(error => res.status(500).jason({error: error.message}))
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('accounts')
    .where('id', id)
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ data:count })
        } else {
            res.status(404).json('Account not Found')
        }
    })
    .catch(error => res.status(500).jason({error: error.message}))
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
    .where('id', id)
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json({ data:count })
        } else {
            res.status(404).json('Error deleting post')
        }
    })
    .catch(error => res.status(500).jason({error: error.message}));
});

module.exports = router;