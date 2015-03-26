from pyramid.view import view_config


@view_config(route_name='home', renderer='templates/index.jinja2')
def home(request):
    return {}


@view_config(route_name='total_users', renderer='templates/total_users.jinja2')
def total_users_view(request):
    return {}
