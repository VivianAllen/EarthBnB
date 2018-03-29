require 'pg'

task :first_time_setup do
  Rake::Task[:create_db].execute
  Rake::Task[:create_tables].execute
  Rake::Task[:populate_tables].execute
  Rake::Task[:set_db_url].execute
end

task :full_reset do
  Rake::Task[:drop_db].execute
  Rake::Task[:create_db].execute
  Rake::Task[:drop_tables].execute
  Rake::Task[:create_tables].execute
  Rake::Task[:populate_tables].execute
  Rake::Task[:set_db_url].execute
end

task :set_db_url do
  p "RAKE: setting database URL in process.env"
  system "bash" "-c" 'export DATABASE_URL=postgres://localhost:5432/bnb_test'
end


task :create_db do
  p "RAKE: creating bnb_test database"
  PG.connect.exec('CREATE DATABASE bnb_test;')
end

task :drop_db do
  p "RAKE: dropping bnb_test database"
  PG.connect.exec('DROP DATABASE bnb_test;')
end

task :create_tables do
  Rake::Task[:create_user_table].execute
  Rake::Task[:create_property_table].execute
end

task :populate_tables do
  Rake::Task[:populate_user_table].execute
  Rake::Task[:populate_property_table].execute
end

task :drop_tables do
  Rake::Task[:drop_user_table].execute
  Rake::Task[:drop_property_table].execute
end

task :create_user_table do
  p "RAKE: creating bnb_users table"
  con = PG.connect :dbname => 'bnb_test'
  con.exec('CREATE TABLE bnb_users (id SERIAL PRIMARY KEY, username VARCHAR(100), password VARCHAR(200));')
end

task :drop_user_table do
  p "RAKE: dropping bnb_users table"
  con = PG.connect :dbname => 'bnb_test'
  con.exec('DROP TABLE IF EXISTS bnb_users;')
end

task :populate_user_table do
  p "RAKE: popuating bnb_users table"
  con = PG.connect :dbname => 'bnb_test'
  con.exec("INSERT INTO bnb_users(username) VALUES('Normal Q. User');")
end

task :create_property_table do
  p "RAKE: creating bnb_properties table"
  con = PG.connect :dbname => 'bnb_test'
  con.exec('CREATE TABLE bnb_properties (id SERIAL PRIMARY KEY, imgsrc VARCHAR(300), title VARCHAR(100), username VARCHAR(100), description VARCHAR(600));')    
end

task :drop_property_table do
  p "RAKE: dropping bnb_properties table"
  con = PG.connect :dbname => 'bnb_test'
  con.exec('DROP TABLE IF EXISTS bnb_properties;')
end

task :populate_property_table do
  p "RAKE: populating bnb_properties table"
  con = PG.connect :dbname => 'bnb_test'
  con.exec("INSERT INTO bnb_properties(imgsrc, title, username, description)"\
  " VALUES('test.jpg', "\
  "'My Treehouse', "\
  "'Test User', "\
  "'Come and stay in our cool treehouse!');")

  con.exec("INSERT INTO bnb_properties(imgsrc, title, username, description)"\
  " VALUES('test2.jpg', "\
  "'Another House', "\
  "'Test User', "\
  "'Come and stay in another cool house!');")
end
