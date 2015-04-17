from pyramid.view import view_config


@view_config(route_name='home', renderer='templates/index.jinja2')
@view_config(route_name='total_users', renderer='templates/total_users.jinja2')
@view_config(route_name='pageviews', renderer='templates/pageviews.jinja2')
@view_config(
    route_name='pageviews_weekly',
    renderer='templates/pageviews_weekly.jinja2')
@view_config(
    route_name='pageviews_monthly',
    renderer='templates/pageviews_monthly.jinja2')
@view_config(route_name='devices', renderer='templates/devices.jinja2')
def view(request):
    return {}


@view_config(route_name='moreinfo', renderer='templates/moreinfo.jinja2')
def moreinfo(request):
    return {'profile_id': request.matchdict['profile_id']}
