class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :email, :city, :state, :avatar_url, :errors, :liked_posts, :rating

  attribute :active_posts do |user|
    user.active_posts.map do |post|
      {id: post.id, type: 'post', attributes: {user: { id: user.id , name: user.name, email: user.email }, title: post.title, description: post.description, formatted_start_date: post.formatted_start_date, formatted_exp_date: post.formatted_exp_date, location: post.location, payment: post.payment, likers: post.likers.map(&:id), active: true}}
    end
  end

  attribute :inactive_posts do |user|
    user.inactive_posts.map do |post|
      {id: post.id, type: 'post', attributes: {user: { id: user.id, name: user.name, email: user.email }, title: post.title, description: post.description, formatted_start_date: post.formatted_start_date, formatted_exp_date: post.formatted_exp_date, location: post.location, payment: post.payment, likers: post.likers.map(&:id), active: false}}
    end
  end

  attribute :liked_posts do |user|
    user.likes.map do |like|
      {id: like.post.id, type: 'post', attributes: {user: { id: like.post.user.id, name: like.post.user.name, email: like.post.user.email }, title: like.post.title, description: like.post.description, formatted_start_date: like.post.formatted_start_date, formatted_exp_date: like.post.formatted_exp_date, location: like.post.location, likers: like.post.likers.map(&:id), active: like.post.active?}}
    end
  end

  attribute :reviews do |user|
    user.received_reviews.map do |review|
      {id: review.id, rating: review.rating, title: review.title, content: review.content , created_at: review.formatted_ts(review.created_at) , reviewer: {id: review.reviewer.id, name: review.reviewer.name} }
    end
  end

end
