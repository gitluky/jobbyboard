class Review < ApplicationRecord
  belongs_to :reviewer, class_name: 'User'
  belongs_to :reviewee, class_name: 'User'

  validates :reviewer, uniqueness: { scope: [:reviewee], message: 'has already written a review for this user.'}
  validates :reviewee, :reviewer, :title, :content, :rating, presence: true

end
