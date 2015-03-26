from pyramid.view import view_config


@view_config(route_name='home', renderer='templates/index.jinja2')
@view_config(route_name='total_users', renderer='templates/total_users.jinja2')
@view_config(route_name='pageviews', renderer='templates/pageviews.jinja2')
def view(request):
    return {}
