fridgedoor
==========

Because everything we care about goes on the fridge door.

Installing
----------

Clone the repo::

  git clone git@github.com:universalcore/fridgedoor.git
  cd fridgedoor
  
Enable the virtual env::
  
  virtualenv ve
  . ve/bin/activate
  
Install requirements::

  pip install -e .
  
When complete, run the app::

  pserve development.ini --reload
