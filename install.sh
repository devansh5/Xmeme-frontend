
#!/bin/bash


# Any installation related commands

sudo apt-get install -y postgresql postgresql-contrib
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Any configuration related commands
sudo service postgresql status
check_install postgresql postgresql
sudo service postgresql start
sudo -u postgres psql -c"ALTER user postgres WITH PASSWORD '1234'"
sudo service postgresql restart
