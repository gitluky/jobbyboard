class CreateAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :assignments do |t|
      t.belongs_to :user
      t.belongs_to :post
      t.string :status, default: 'Assigned'
      t.datetime :completion_date
      t.string :cancel_reason
      t.datetime :cancel_date

      t.timestamps
    end
  end
end
