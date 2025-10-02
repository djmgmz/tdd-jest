const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('getAllPosts', () => {
    let res, getAllStub;

    beforeEach(() => {
        res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() }),
        };
        // Ensure function exists so sinon can stub it
        if (!PostModel.getAll) {
        PostModel.getAll = function () {};
        }
    });

    afterEach(() => {
        if (getAllStub && getAllStub.restore) getAllStub.restore();
    });

    it('returns a list of posts', () => {
        const expected = [{ _id: '1', title: 'A' }, { _id: '2', title: 'B' }];

        getAllStub = sinon.stub(PostModel, 'getAll').yields(null, expected);

        PostController.getAllPosts({}, res);

        sinon.assert.calledOnce(getAllStub);
        sinon.assert.calledWith(res.json, expected);
    });

    it('returns 500 on error', () => {
        getAllStub = sinon.stub(PostModel, 'getAll').yields(new Error('x'));

        PostController.getAllPosts({}, res);

        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledOnce(res.status(500).end);
    });
    });


    // --- Fill your empty "findPost" suite (RED) ---
    describe('findPost', () => {
    let res, findStub, req;

    beforeEach(() => {
        res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() }),
        };
        req = { params: { id: 'abc123' } };
        if (!PostModel.findPostById) {
        PostModel.findPostById = function () {};
        }
    });

    afterEach(() => {
        if (findStub && findStub.restore) findStub.restore();
    });

    it('returns the post when found', () => {
        const expected = { _id: 'abc123', title: 'Hello' };

        findStub = sinon.stub(PostModel, 'findPostById').yields(null, expected);

        PostController.findPost(req, res);

        sinon.assert.calledWith(PostModel.findPostById, req.params.id);
        sinon.assert.calledWith(res.json, expected);
    });

    it('returns 404 when not found', () => {
        findStub = sinon.stub(PostModel, 'findPostById').yields(null, null);

        PostController.findPost(req, res);

        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledOnce(res.status(404).end);
    });

    it('returns 500 on error', () => {
        findStub = sinon.stub(PostModel, 'findPostById').yields(new Error('boom'));

        PostController.findPost(req, res);

        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledOnce(res.status(500).end);
    });
    });


    // --- Fill your empty "update" suite (RED) ---
    describe('update', () => {
    let res, updateStub, req;

    beforeEach(() => {
        res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() }),
        };
        req = {
        params: { id: 'abc123' },
        body: { title: 'New Title', content: 'Updated' },
        };
        if (!PostModel.updatePost) {
        PostModel.updatePost = function () {};
        }
    });

    afterEach(() => {
        if (updateStub && updateStub.restore) updateStub.restore();
    });

    it('returns the updated post', () => {
        const expected = { _id: 'abc123', title: 'New Title', content: 'Updated' };

        updateStub = sinon.stub(PostModel, 'updatePost').yields(null, expected);

        PostController.update(req, res);

        sinon.assert.calledWith(PostModel.updatePost, req.params.id, req.body);
        sinon.assert.calledWith(res.json, expected);
    });

    it('returns 500 on error', () => {
        updateStub = sinon.stub(PostModel, 'updatePost').yields(new Error('nope'));

        PostController.update(req, res);

        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledOnce(res.status(500).end);
    });
    });

});