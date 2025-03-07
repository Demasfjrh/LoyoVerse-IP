const request = require('supertest');
const { Article } = require('../models');
const app = require('../app'); // Ensure app is exported from the correct file

jest.mock('../models', () => ({
  Article: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify([
            { title: 'News 1', image: 'https://picsum.photos/200', description: 'Description 1' },
            { title: 'News 2', image: 'https://picsum.photos/200', description: 'Description 2' },
          ]),
        },
      }),
    }),
  })),
}));

describe('ArticleController', () => {
  beforeAll(async () => {
    // Setup database connection or any other setup
  });

  afterAll(async () => {
    // Teardown database connection or any other cleanup
  });

  describe('GET /articles', () => {
    it('should return a list of articles', async () => {
      const mockArticles = [{ id: 1, title: 'Test Article' }];
      Article.findAll.mockResolvedValue(mockArticles);

      const response = await request(app).get('/articles');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockArticles);
    });

    it('should handle errors', async () => {
      Article.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/articles');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Internal Server Error');
    });
  });

  describe('GET /article/:id', () => {
    it('should return an article by id', async () => {
      const mockArticle = { id: 1, title: 'Test Article' };
      Article.findByPk.mockResolvedValue(mockArticle);

      const response = await request(app).get('/article/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockArticle);
    });

    it('should return 404 if article not found', async () => {
      Article.findByPk.mockResolvedValue(null);

      const response = await request(app).get('/article/999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Resource not found');
    });
  });

  describe('GET /recomendation', () => {
    it('should return recommended articles', async () => {
      const response = await request(app).get('/recomendation');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('This is our News Recommendation');
      expect(response.body.recommendations).toHaveLength(4);
    });

    it('should handle errors in recommendation', async () => {
      // Simulate an error in the AI service
      jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error output
      const response = await request(app).get('/recomendation');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Internal Server Error');
    });
  });
});

/*
- **Mocking**: We use `jest.mock` to mock the `Article` model and `GoogleGenerativeAI` so we can control the returned results during testing.
- **Database Setup/Cleanup**: Use `beforeAll` and `afterAll` for any necessary setup and cleanup.
*/