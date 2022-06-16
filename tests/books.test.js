const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
    before(async () => Book.sequelize.sync());
  
    beforeEach(async () => {
      await Book.destroy({ where: {} });
    });
  
    describe('with no records in the database', () => {
      describe('POST /books', () => {
        it('creates a new book in the database', async () => {
          const response = await request(app).post('/books').send({
            title: 'The lido',
            author: 'Libby Page',
            genre: 'fiction',
            ISBN: '1409175227',
          });
          const newBookRecord = await Book.findByPk(response.body.id, {
            raw: true,
          });
  
          expect(response.status).to.equal(201);
          expect(response.body.title).to.equal('The lido');
          expect(newBookRecord.author).to.equal('Libby Page');
          expect(newBookRecord.genre).to.equal('fiction');
        });
        
        it("returns error message if data is invalid", async () => {
            const {status} = await request(app).post("/readers").send({
                title: 'The lido',
                author: 'Libby Page',
            });
            expect(status).to.equal(400);
          });
      });
    });
  
    describe('with records in the database', () => {
      let books;
  
      beforeEach(async () => {
        books = await Promise.all([
          Book.create({
            title: 'The lido',
            author: 'Libby Page',
            genre: 'fiction',
            ISBN: '1409175227',
          }),
          Book.create({  
          title: 'The hungry caterpillar',
          author: 'Eric Carle',
          genre: 'childrens',
          ISBN: '1409175228', }),

          Book.create({  
          title: 'The BFG',
          author: 'Rohl Dahl',
          genre: 'fiction',
          ISBN: '1409175229', }),
        ]);
      });
  
      describe('GET /books', () => {
        it('gets all books records', async () => {
          const response = await request(app).get('/books');
  
          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(3);
  
          response.body.forEach((book) => {
            const expected = books.find((a) => a.id === book.id);
  
            expect(book.title).to.equal(expected.title);
            expect(book.author).to.equal(expected.author);
          });
        });
      });
  
      describe('GET /books/:id', () => {
        it('gets book record by id', async () => {
          const book = books[0];
          const response = await request(app).get(`/books/${book.id}`);
  
          expect(response.status).to.equal(200);
          expect(response.body.title).to.equal(book.title);
          expect(response.body.author).to.equal(book.author);
        });
  
        it('returns a 404 if the book does not exist', async () => {
          const response = await request(app).get('/books/12345');
  
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The book could not be found.');
        });
      });
  
      describe('PATCH /books/:id', () => {
        it('updates books author by id', async () => {
          const book = books[0];
          const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ author: "Micky Mouse" });
          const updatedBookRecord = await Book.findByPk(book.id, { raw: true });
          
  
          expect(response.status).to.equal(200);
          expect(updatedBookRecord.author).to.equal('Micky Mouse');
        });
  
        it('returns a 404 if the book does not exist', async () => {
          const response = await request(app)
            .patch('/books/12345')
            .send({ author: 'Micky Mouse' });
  
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The book could not be found.');
        });
      });
  
      describe('DELETE /books/:id', () => {
        it('deletes book record by id', async () => {
          const book = books[0];
          const response = await request(app).delete(`/books/${book.id}`);
          const deletedBook = await Book.findByPk(book.id, { raw: true });
  
          expect(response.status).to.equal(204);
          expect(deletedBook).to.equal(null);
        });
  
        it('returns a 404 if the book does not exist', async () => {
          const response = await request(app).delete('/books/12345');
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The book could not be found.');
        });
      });
    });
})
