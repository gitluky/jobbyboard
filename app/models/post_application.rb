class PostApplication < ApplicationRecord
  belongs_to :applicant, class_name: "User"
  belongs_to :post
  has_one :assignment, optional: true

  #  APPLICATION_STATUS = {new: 1, accepted: 2, application_rejected: 3, pending_confirmation: 4, confirmation_rejected: 5, confirmed: 6 }
end
