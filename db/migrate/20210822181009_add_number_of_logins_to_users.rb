class AddNumberOfLoginsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :number_of_logins, :integer, default: 0
  end
end
