class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :email, :city, :state, :avatar_url, :active_posts, :inactive_posts, :errors

end
