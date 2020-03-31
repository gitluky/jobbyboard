class Assignment < ApplicationRecord
  belongs_to :post_application

  #ASSIGNMENT_STATUS = { assigned: 1, completed: 2, cancelled: 3}
end
