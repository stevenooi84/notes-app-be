const { getAllNotes, createNote, updateNote, getNote, deleteNote, deleteAllNote } = require('./noteController');
const note = require('../models/Note');
const tag = require('../models/Tag');

jest.mock('../models/Note', () => ({
  find: jest.fn().mockReturnValue(['data']),
  distinct: jest.fn().mockReturnValue(['data']),
  deleteMany: jest.fn().mockReturnValue(['data']),
  create: jest.fn().mockReturnValue({
    content: 'content',
    tags: ['tags'],
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue(['data']),
  findById: jest.fn().mockReturnValue(['data']),
  findByIdAndDelete: jest.fn().mockReturnValue(['data']),
}));
jest.mock('../models/Tag', () => ({
  find: jest.fn().mockReturnThis(),
  create: jest.fn().mockReturnValue(['data']),
  deleteMany: jest.fn().mockReturnValue(['data']),
}));

describe('noteController', () => {
  let mRes;
  let mReq;
  beforeAll(() => {
    mReq = {};
    mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return data successfully with getAllNotes', async () => {
    await getAllNotes(mReq, mRes, jest.fn());
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      results: 1,
      data: {
        notes: [
          'data'
      ]},
    });
  });

  it('should return data successfully with createNote', async () => {
    mReq = {
      body: {
        content: 'content',
        tags: ['tags'],
      }
    };
    await createNote(mReq, mRes, jest.fn());
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      results: 1,
      data: {
        notes: ['data']
      },
    });
  });

  it('should return data successfully with updateNote', async () => {
    mReq = {
      body: {
        content: 'content',
        tags: ['tags'],
      },
      params: { id: '614c539c2efc84001483f683' }
    };
    await updateNote(mReq, mRes, jest.fn());
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      results: 1,
      data: {
        notes: ['data']
      },
    });
  });

  it('should return data successfully with getNote', async () => {
    await getNote(mReq, mRes, jest.fn());
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      results: 1,
      data: {
        notes: [
          'data'
      ]},
    });
  });

  it('should return data successfully with deleteNote', async () => {
    await deleteNote(mReq, mRes, jest.fn());
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      results: 1,
      data: {
        notes: [
          'data'
      ]},
    });
  });

  it('should return data successfully with deleteAllNote', async () => {
    await deleteAllNote(mReq, mRes, jest.fn());
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      status: 'success',
      results: 1,
      data: {
        notes: [
          'data'
      ]},
    });
  });

});