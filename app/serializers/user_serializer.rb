class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :email, :city, :state, :avatar_url, :errors

  attribute :active_posts do |user|
    user.active_posts.map do |post|
      {id: post.id, type: 'post', attributes: {user: post.user_id, title: post.title, description: post.description, formatted_created_at: post.formatted_created_at, location: post.location}}
    end
  end

  attribute :inactive_posts do |user|
    user.inactive_posts.map do |post|
      {id: post.id, type: 'post', attributes: {user: post.user_id, title: post.title, description: post.description, formatted_created_at: post.formatted_created_at, location: post.location}}
    end
  end


end
