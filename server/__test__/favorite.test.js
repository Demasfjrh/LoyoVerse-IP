const request = require('supertest');
const { Favorite, Article } = require('../models');
const app = require('../app'); // Ensure app is exported from the correct file

jest.mock('../models', () => ({
  Favorite: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  },
  Article: {
    findByPk: jest.fn(),
  },
}));

describe('FavoriteController', () => {
  const mockUserId = 1;

  beforeAll(async () => {
    // Setup database connection or any other setup
  });

  afterAll(async () => {
    // Teardown database connection or any other cleanup
  });

  describe('GET /favorites', () => {
    it('should return a list of favorites', async () => {
      const mockFavorites = [
        { id: 1, UserId: mockUserId, ArticleId: 1, Article: { title: 'Test Article' } },
      ];
      Favorite.findAll.mockResolvedValue(mockFavorites);

      const response = await request(app)
        .get('/favorites')
        .set('Authorization', `Bearer mockToken`); // Assuming authentication middleware

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, ArticleId: 1, Article: { title: 'Test Article' } },
      ]);
    });

    it('should handle errors', async () => {
      Favorite.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/favorites')
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Internal Server Error');
    });
  });

  describe('POST /favorites', () => {
    it('should create a new favorite', async () => {
      const mockArticle = { id: 1, title: 'Test Article' };
      Article.findByPk.mockResolvedValue(mockArticle);
      Favorite.findOne.mockResolvedValue(null);
      Favorite.create.mockResolvedValue({ id: 1, UserId: mockUserId, ArticleId: 1 });

      const response = await request(app)
        .post('/favorites')
        .send({ ArticleId: 1 })
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: 1, UserId: mockUserId, ArticleId: 1 });
    });

    it('should handle already favorited error', async () => {
      const mockArticle = { id: 1, title: 'Test Article' };
      Article.findByPk.mockResolvedValue(mockArticle);
      Favorite.findOne.mockResolvedValue({ id: 1, UserId: mockUserId, ArticleId: 1 });

      const response = await request(app)
        .post('/favorites')
        .send({ ArticleId: 1 })
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('You already favorited this article');
    });

    it('should handle article not found error', async () => {
      Article.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post('/favorites')
        .send({ ArticleId: 999 })
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Resource not found');
    });
  });

  describe('DELETE /favorites/:id', () => {
    it('should delete a favorite', async () => {
      const mockFavorite = { id: 1, UserId: mockUserId, ArticleId: 1, destroy: jest.fn() };
      Favorite.findOne.mockResolvedValue(mockFavorite);

      const response = await request(app)
        .delete('/favorites/1')
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Favorite deleted successfully');
    });

    it('should handle favorite not found error', async () => {
      Favorite.findOne.mockResolvedValue(null);

      const response = await request(app)
        .delete('/favorites/999')
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Resource not found');
    });
  });
});

/*
- **Mocking**: We use `jest.mock` to mock the `Favorite` and `Article` models to control the returned results during testing.
- **Error Handling**: The tests check that the error handler responds with the correct status and message.
- **Authentication**: Assumes an authentication middleware that sets `req.loginInfo.userId`.
*/
