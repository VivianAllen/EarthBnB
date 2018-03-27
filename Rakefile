require 'pg'

task :reset_and_setup do
  Rake::Task[:drop_table].execute
  Rake::Task[:create_table].execute
  Rake::Task[:populate_table].execute
end

task :drop_table do
  p "RAKE: dropping bnb_users table"
  PG.connect.exec('DROP TABLE IF EXISTS bnb_users;')
end

task :create_table do
  p "RAKE: creating bnb_users table"
  PG.connect.exec('CREATE TABLE bnb_users (id SERIAL PRIMARY KEY, username VARCHAR(100));')
end

task :populate_table do
  p "RAKE: popuating bnb_users table"
  PG.connect.exec("INSERT INTO bnb_users(username) VALUES('Normal Q. User');")
end
