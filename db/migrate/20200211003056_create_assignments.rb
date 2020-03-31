class CreateAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :assignments do |t|
      t.belongs_to :post_applications

      t.integer :status, default: 1

      t.datetime :completion_date

      t.datetime :cancel_datetime
      t.string :cancel_reason

      t.timestamps
    end
  end
end
