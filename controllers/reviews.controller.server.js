const reviewsDao = require("../daos/reviews.dao.server");
module.exports = (app) => {
  const postReview = (req, res) => {
    if (req.session["currentUser"]) {
      console.log(req.session);
      const review = req.body;
      review.username = req.session["currentUser"].username;
      review.userId = req.session["currentUser"].userId;
      reviewsDao
        .createReview(review)
        .then((actualReview) => res.json(actualReview));
    } else {
      res.sendStatus(403);
    }
  };

  const getReviewsForUser = (req, res) => {
    const userId = req.params.userId;
    reviewsDao
      .findReviewsForUser(userId)
      .then((actualReviews) => res.json(actualReviews));
  };

  const getReviewsForMovie = (req, res) => {
    const movieId = req.params.movieId;
    reviewsDao
      .findReviewsForMovie(movieId)
      .then((actualReviews) => res.json(actualReviews));
  };

  app.post("/api/reviews", postReview);
  app.get("/api/users/:userId/reviews", getReviewsForUser);
  app.get("/api/movies/:movieId/reviews", getReviewsForMovie);
};
